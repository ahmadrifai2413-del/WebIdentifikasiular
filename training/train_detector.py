"""Train a species detector with an existing labelled dataset."""
import argparse
from pathlib import Path
from ultralytics import YOLO

def main():
    p=argparse.ArgumentParser()
    p.add_argument('--base', type=Path, required=True, help='Trusted local detection checkpoint, e.g. yolo11n.pt')
    p.add_argument('--data', type=Path, required=True)
    p.add_argument('--epochs', type=int, default=80)
    p.add_argument('--imgsz', type=int, default=640)
    p.add_argument('--device', default='cpu')
    args=p.parse_args()
    if not args.base.is_file() or not args.data.is_file():
        p.error('Both checkpoint and data.yaml must exist locally.')
    model=YOLO(str(args.base))
    if model.task != 'detect':
        p.error('Use a detection checkpoint.')
    model.train(data=str(args.data.resolve()),epochs=args.epochs,imgsz=args.imgsz,device=args.device,
        seed=42,project=str(Path(__file__).resolve().parent/'runs'),name='detector')
    print('Evaluate best.pt before copying it into backend/ai/weights/best.pt.')
if __name__=='__main__':
    main()
