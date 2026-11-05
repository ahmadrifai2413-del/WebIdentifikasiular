"""Read-only connection check. Never print the connection URL or password."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'backend'))

def main():
    try:
        from sqlalchemy import text
        from app.db.session import engine
        with engine.connect() as conn:
            database = conn.scalar(text('select current_database()'))
            version = conn.scalar(text('show server_version'))
        engine.dispose()
        print(f'PostgreSQL {version} terhubung. Database: {database}')
        return 0
    except (ValueError, TypeError):
        print('Konfigurasi belum benar. Isi DB_PASSWORD di backend/.env dan gunakan PostgreSQL.')
    except Exception:
        print('Koneksi PostgreSQL gagal. Pastikan service aktif, database snakepedia sudah dibuat, dan DB_HOST/PORT/USER/PASSWORD benar.')
    return 1

if __name__ == '__main__':
    raise SystemExit(main())
