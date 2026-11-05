import os
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy.engine import URL, make_url

ROOT = Path(__file__).resolve().parents[2]
load_dotenv(ROOT / '.env')

def absolute(value: str) -> Path:
    path = Path(value)
    return path if path.is_absolute() else ROOT / path

# PostgreSQL only. URL.create safely handles @, #, %, / in a password.
raw_url = os.getenv('DATABASE_URL', '').strip()
if raw_url:
    DATABASE_URL = make_url(raw_url)
    if DATABASE_URL.drivername in {'postgres', 'postgresql'}:
        DATABASE_URL = DATABASE_URL.set(drivername='postgresql+psycopg')
    if DATABASE_URL.drivername != 'postgresql+psycopg':
        raise ValueError('Database wajib PostgreSQL dengan driver psycopg. Perbarui backend/.env.')
else:
    password = os.getenv('DB_PASSWORD', '')
    if not password or password == 'GANTI_DENGAN_PASSWORD_POSTGRES':
        raise ValueError('Isi DB_PASSWORD di backend/.env dengan password PostgreSQL Anda.')
    DATABASE_URL = URL.create('postgresql+psycopg',
        username=os.getenv('DB_USER', 'postgres'), password=password,
        host=os.getenv('DB_HOST', 'localhost'), port=int(os.getenv('DB_PORT', '5432')),
        database=os.getenv('DB_NAME', 'snakepedia'))

UPLOAD_DIR = absolute(os.getenv('UPLOAD_DIR', 'storage/uploads')).resolve()
MODEL_PATH = absolute(os.getenv('MODEL_PATH', 'ai/weights/best.pt')).resolve()
THRESHOLD = float(os.getenv('CONFIDENCE_THRESHOLD', '0.65'))
if not 0 <= THRESHOLD <= 1:
    raise ValueError('CONFIDENCE_THRESHOLD must be between 0 and 1')
API_TOKEN = os.getenv('API_TOKEN', '')
CORS_ORIGINS = [x.strip() for x in os.getenv('CORS_ORIGINS', 'http://localhost:5174,http://127.0.0.1:5174').split(',') if x.strip()]
MAX_UPLOAD = 8 * 1024 * 1024
