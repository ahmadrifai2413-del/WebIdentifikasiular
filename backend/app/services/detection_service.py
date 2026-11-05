import logging
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile
from starlette.concurrency import run_in_threadpool

from app.core.config import MAX_UPLOAD, UPLOAD_DIR
from app.repositories.history import save, serialize
from app.repositories.snakes import all_snakes
from ai.preprocessing import decode_image
from ai.inference import inference, select_prediction

logger = logging.getLogger(__name__)


def normalize(value):
    return "-".join(
        str(value or "")
        .strip()
        .lower()
        .replace("_", " ")
        .replace("-", " ")
        .split()
    )


def match_catalog(predictions, snakes):
    known_ids = {str(s["id"]) for s in snakes}
    aliases = {}

    for snake in snakes:
        species_id = str(snake["id"])

        for value in (species_id, snake.get("scientific")):
            key = normalize(value)
            if key:
                aliases.setdefault(key, set()).add(species_id)

    mapped = []

    for prediction in predictions:
        item = dict(prediction)
        original_id = str(item.get("species_id", "unknown"))

        # ID yang sudah cocok tidak perlu diubah.
        if original_id not in known_ids:
            matches = aliases.get(normalize(original_id), set())

            # Hanya cocokkan jika nama mengarah ke satu spesies.
            if len(matches) == 1:
                item["species_id"] = next(iter(matches))

        mapped.append(item)

    result = select_prediction(mapped, known_ids)

    if result["predictions"]:
        top = result["predictions"][0]
        logger.warning(
            "PREDIKSI: %s | SKOR: %.4f | ADA DI KATALOG: %s | STATUS: %s",
            top["species_id"],
            top["confidence"],
            top["species_id"] in known_ids,
            result["status"],
        )

    return result


async def create_observation(
    db,
    image: UploadFile,
    note: str,
    manual: bool,
    user_id: str,
):
    raw = await image.read(MAX_UPLOAD + 1)
    picture = await run_in_threadpool(
        decode_image,
        raw,
        image.content_type or "",
    )

    path = None

    try:
        result = {
            "species_id": None,
            "confidence": None,
            "status": "manual",
            "predictions": [],
        }

        if not manual:
            predictions = await run_in_threadpool(
                inference.predict,
                picture,
            )
            snakes = all_snakes(db)
            result = match_catalog(predictions, snakes)

        image_key = str(uuid4()) + ".jpg"
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        path = UPLOAD_DIR / image_key

        await run_in_threadpool(
            picture.save,
            path,
            "JPEG",
            quality=90,
        )

        filename = Path(
            (image.filename or "foto.jpg").replace("\\", "/")
        ).name[:255]

        row = save(
            db,
            **result,
            user_id=user_id,
            image_key=image_key,
            filename=filename,
            note=note,
        )

    except Exception:
        db.rollback()
        if path is not None:
            path.unlink(missing_ok=True)
        raise

    finally:
        picture.close()

    return serialize(row)