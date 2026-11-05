import argparse
import json
from pathlib import Path
from ultralytics import YOLO

def main():
    p=argparse.ArgumentParser()
    p.add_argument('--weights',type=Path,required=True)
    p.add_argument('--data',type=Path,required=True)
    p.add_argument('--device',default='cpu')
    args=p.parse_args()
    if not args.weights.is_file() or not args.data.exists():
        p.error('Weights and dataset must exist.')
    result=YOLO(str(args.weights)).val(data=str(args.data.resolve()),split='test',device=args.device)
    output=Path(__file__).resolve().parent/'evaluation.json'
    output.write_text(json.dumps({k:float(v) for k,v in result.results_dict.items()},indent=2))
    print(output)
if __name__=='__main__':
    main()
