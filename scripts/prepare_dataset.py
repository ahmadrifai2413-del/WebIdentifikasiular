"""Split an existing, manually labelled YOLO dataset, with exact duplicate grouping.
Run from project root: python scripts/prepare_dataset.py --images ... --labels ...
This script does NOT create annotations or download wildlife photos.
"""
import argparse
import hashlib
import json
import random
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--images', type=Path, required=True)
    p.add_argument('--labels', type=Path, required=True)
    p.add_argument('--output', type=Path, default=ROOT / 'datasets/processed/yolo')
    p.add_argument('--seed', type=int, default=42)
    args = p.parse_args()
    names = json.loads((ROOT / 'training/configs/classes.json').read_text())
    images = sorted(x for x in args.images.iterdir() if x.suffix.lower() in {'.jpg','.jpeg','.png','.webp'})
    records = {}
    stems = set()
    for image in images:
        if image.stem in stems:
            raise ValueError(f'Duplicate image stem: {image.stem}')
        stems.add(image.stem)
        label = args.labels / (image.stem + '.txt')
        if not label.is_file():
            raise ValueError(f'Missing label: {label}; use an empty .txt ONLY for verified negative images')
        for line in label.read_text().splitlines():
            if not line.strip():
                continue
            parts = line.split()
            if len(parts) != 5:
                raise ValueError(f'Expected class x_center y_center width height in {label}')
            cls = int(parts[0]); x, y, w, h = map(float, parts[1:])
            if not (0 <= cls < len(names) and 0 <= x <= 1 and 0 <= y <= 1 and 0 < w <= 1 and 0 < h <= 1 and x-w/2 >= -1e-6 and x+w/2 <= 1+1e-6 and y-h/2 >= -1e-6 and y+h/2 <= 1+1e-6):
                raise ValueError(f'Invalid annotation: {label}')
        digest = hashlib.sha256(image.read_bytes()).hexdigest()
        if digest in records:
            if records[digest][1].read_text() != label.read_text():
                raise ValueError(f'Identical image with conflicting labels: {image}')
            continue  # Keep one exact duplicate only.
        records[digest] = (image, label)
    pairs = list(records.values())
    if len(pairs) < 10:
        raise ValueError('At least 10 unique labelled photos are required for a basic split. Real training needs more per class.')
    if args.output.exists() and any(args.output.iterdir()):
        raise ValueError('Output is not empty; choose a new --output to avoid overwriting a dataset.')
    random.Random(args.seed).shuffle(pairs)
    train_end = int(len(pairs)*.7); val_end = int(len(pairs)*.85)
    counts = {}
    for split, subset in [('train',pairs[:train_end]),('val',pairs[train_end:val_end]),('test',pairs[val_end:])]:
        for folder in ['images','labels']:
            (args.output / folder / split).mkdir(parents=True,exist_ok=True)
        for image, label in subset:
            shutil.copy2(image,args.output / 'images' / split / image.name)
            shutil.copy2(label,args.output / 'labels' / split / label.name)
        counts[split] = len(subset)
    config = {'path':str(args.output.resolve()),'train':'images/train','val':'images/val','test':'images/test','names':names}
    (args.output / 'data.yaml').write_text(json.dumps(config,indent=2))
    (args.output / 'split_manifest.json').write_text(json.dumps({'seed':args.seed,'counts':counts,'source_count':len(images),'unique_count':len(pairs)},indent=2))
    print(args.output / 'data.yaml')
    print(counts)
    print('Review class coverage and split by photographer/individual/sequence to avoid near-duplicate leakage before training.')

if __name__ == '__main__':
    main()
