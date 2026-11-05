from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'backend'))
from app.db.session import SessionLocal
from app.repositories.snakes import seed
if __name__ == '__main__':
    with SessionLocal() as db:
        seed(db)
    print('Katalog awal tersimpan. Data yang sudah ada tidak ditimpa.')
