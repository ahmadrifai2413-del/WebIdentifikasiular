"""Optional alternative: classify one cropped snake per image.
Dataset layout: train/<species-id>/*.jpg, val/<species-id>/*.jpg, test/<species-id>/*.jpg.
A classifier is not a detector and does not produce bounding boxes.
"""
import argparse
from pathlib import Path
from ultralytics import YOLO

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--base', type=Path, required=True)
    p.add_argument('--data', type=Path, required=True)
    p.add_argument('--epochs', type=int, default=80)
    p.add_argument('--device', default='cpu')
    args=p.parse_args()
    if not args.base.is_file() or not all((args.data/s).is_dir() for s in ['train','val','test']):
        p.error('Provide a local classifier checkpoint and train/val/test folders.')
    model=YOLO(str(args.base))
    if model.task!='classify':
        p.error('Use a classification checkpoint.')
    model.train(data=str(args.data.resolve()),epochs=args.epochs,imgsz=224,device=args.device,
        seed=42,project=str(Path(__file__).resolve().parent/'runs'),name='classifier')
if __name__=='__main__':
    main()
