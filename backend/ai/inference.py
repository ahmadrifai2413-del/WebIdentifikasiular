import logging
import math
from threading import Lock

from fastapi import HTTPException

from app.core.config import MODEL_PATH, THRESHOLD
from ai.detector import predictions_from_result as detection_predictions
from ai.classifier import predictions_from_result as classification_predictions


def normalize_label(value):
    return str(value or "").strip().lower().replace("_", "-").replace(" ", "-")


class Inference:
    def __init__(self):
        self.model = None
        self.lock = Lock()
        self.reason = (
            "Model belum tersedia. Periksa MODEL_PATH di backend/.env "
            "lalu restart backend."
        )

    def load(self):
        with self.lock:
            self.model = None

            if not MODEL_PATH.is_file():
                self.reason = (
                    "File model tidak ditemukan. Periksa MODEL_PATH "
                    "di backend/.env."
                )
                logging.error("Model tidak ditemukan: %s", MODEL_PATH)
                return

            try:
                from ultralytics import YOLO

                self.model = YOLO(str(MODEL_PATH))
                self.reason = ""
                logging.info("Model berhasil dimuat: %s", MODEL_PATH)

            except Exception:
                logging.exception("Model gagal dimuat")
                self.reason = (
                    "Model gagal dimuat. Periksa dependency AI "
                    "dan log backend."
                )

    def predict(self, image):
        with self.lock:
            if self.model is None:
                raise HTTPException(status_code=503, detail=self.reason)

            options = {"verbose": False}

            # Samakan ukuran input klasifikasi dengan pengujian di Colab.
            if self.model.task == "classify":
                options["imgsz"] = 224
            else:
                options["conf"] = 0.05

            result = self.model.predict(source=image, **options)[0]

            if result.probs is not None:
                return classification_predictions(result)

            if result.boxes is not None:
                return detection_predictions(result)

            return []


inference = Inference()


def select_prediction(predictions, known_ids):
    valid = []

    for p in predictions:
        confidence = p.get("confidence")

        if (
            isinstance(confidence, bool)
            or not isinstance(confidence, (int, float))
            or not math.isfinite(confidence)
            or not 0 <= confidence <= 1
        ):
            continue

        item = {
            "species_id": str(p.get("species_id") or "unknown"),
            "confidence": float(confidence),
        }

        box = p.get("box")

        if box is not None:
            if not isinstance(box, (list, tuple)) or len(box) != 4:
                continue

            if not all(
                isinstance(v, (int, float))
                and not isinstance(v, bool)
                and math.isfinite(v)
                and 0 <= v <= 1
                for v in box
            ):
                continue

            if box[0] >= box[2] or box[1] >= box[3]:
                continue

            item["box"] = list(box)

        valid.append(item)

    valid.sort(key=lambda p: p["confidence"], reverse=True)
    top = valid[0] if valid else None

    result = {
        "species_id": None,
        "confidence": top["confidence"] if top else None,
        "status": "unknown",
        "predictions": valid[:20],
    }

    # Confidence rendah berarti belum pasti, bukan otomatis bukan ular.
    if top is None or top["confidence"] < THRESHOLD:
        return result

    # Periksa hasil teratas sebelum mencocokkan spesies dengan database.
    if normalize_label(top["species_id"]) == "bukan-ular":
        result["status"] = "not_snake"
        return result

       # Hasil AI dapat ditampilkan meskipun profil Snakepedia belum tersedia.
    # Confidence dan kelas bukan_ular sudah diperiksa di atas.
    result["species_id"] = top["species_id"]
    result["status"] = "identified"

    return result