"""Run from the Serpenta backend with its existing virtual environment.
Preview: python serpenta-profil-125/import_profiles.py
Apply:   python serpenta-profil-125/import_profiles.py --apply
"""
import argparse
import copy
import json
import os
import sys
from contextlib import closing
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

HERE = Path(__file__).resolve().parent
UNKNOWN = 'Belum terverifikasi dalam paket ini'
BASELINE_PATH = HERE / 'previous-profiles.json'
BASELINE = {p['id']: p for p in json.loads(BASELINE_PATH.read_text(encoding='utf-8'))} if BASELINE_PATH.exists() else {}


def meaningful(value):
    if value is None or value == '' or value == []:
        return False
    if isinstance(value, str) and value.strip().lower() in {
        UNKNOWN.lower(), 'belum tersedia', 'belum terverifikasi',
        'status bisa belum terverifikasi',
    }:
        return False
    return True


def merge_profile(old, new):
    """Upgrade supplied defaults while preserving user edits and local assets."""
    result = copy.deepcopy(new)
    defaults = old.get('_profileDefaults') or BASELINE.get(old.get('id'), {})
    managed = str(old.get('profileVersion', '')).startswith('serpenta-125-')
    metadata = {'id', 'scientific', 'profileVersion', 'profileScope', 'references',
                'unverifiedFields', 'fieldSources', 'coverageNote', '_profileDefaults'}
    inherited = copy.deepcopy(new.get('_profileDefaults') or {
        k: v for k, v in new.items() if k not in metadata
    })
    for key, value in old.items():
        if key in metadata:
            continue
        supplied_default = managed and key in defaults and value == defaults[key]
        if meaningful(value) and not supplied_default:
            result[key] = copy.deepcopy(value)
            if value != new.get(key):
                result.get('fieldSources', {}).pop(key, None)
    result['_profileDefaults'] = inherited
    result['id'] = new['id']
    result['scientific'] = new['scientific']
    result['profileVersion'] = new['profileVersion']
    result['profileScope'] = new['profileScope']
    note = new.get('taxonomyNote', '')
    if note:
        result['taxonomyNote'] = note
        if note not in result.get('description', ''):
            result['description'] = result.get('description', '').rstrip() + ' ' + note
    refs = {}
    for source in (new, old):
        for ref in source.get('references', []) or []:
            if isinstance(ref, dict) and isinstance(ref.get('url'), str):
                if ref['url'].startswith(('https://', 'http://')):
                    refs[ref['url']] = ref
        url = source.get('source')
        if isinstance(url, str) and url.startswith(('https://', 'http://')):
            refs.setdefault(url, {'label': 'Sumber profil', 'url': url})
    result['references'] = list(refs.values())
    result['unverifiedFields'] = [
        key for key in ['length', 'habitat', 'activity', 'diet', 'traits']
        if not meaningful(result.get(key))
    ]
    if not isinstance(result.get('venom'), bool):
        result['venom'] = None
        result['venomLabel'] = 'Status bisa belum terverifikasi'
        result['unverifiedFields'].append('venom')
    return result


def read_list(path):
    value = json.loads(path.read_text(encoding='utf-8-sig'))
    if not isinstance(value, list):
        raise ValueError(f'{path.name} harus berisi array JSON.')
    return value


def validate_profiles(rows, expected):
    ids = []
    for row in rows:
        if not isinstance(row, dict) or not isinstance(row.get('id'), str):
            raise ValueError('Profil harus memiliki id string.')
        ids.append(row['id'])
        for key in ['scientific', 'family', 'description', 'source']:
            if not isinstance(row.get(key), str) or not row[key].strip():
                raise ValueError(f"Field {key} kosong: {row['id']}")
        if row.get('venom') is not None and not isinstance(row['venom'], bool):
            raise ValueError('venom harus boolean atau null.')
    if len(ids) != len(set(ids)):
        raise ValueError('Ada ID ganda dalam paket.')
    if set(ids) != set(expected) or len(ids) != 125:
        raise ValueError('Daftar profil tidak cocok dengan 125 label model.')


def atomic_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name(path.name + '.' + uuid4().hex + '.tmp')
    try:
        temp.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding='utf-8')
        os.replace(temp, path)
    finally:
        temp.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description='Impor profil Serpenta ke PostgreSQL.')
    parser.add_argument('--apply', action='store_true', help='Simpan perubahan setelah backup.')
    parser.add_argument('--backend', type=Path, default=HERE.parent)
    args = parser.parse_args()
    backend = args.backend.resolve()
    if not (backend / 'app' / 'db' / 'session.py').is_file():
        raise RuntimeError('Taruh folder serpenta-profil-125 di dalam folder backend.')
    incoming = read_list(HERE / 'snakes-125.json')
    expected = read_list(HERE / 'model-labels.json')
    validate_profiles(incoming, expected)
    sys.path.insert(0, str(backend))
    from sqlalchemy import select
    from app.db.session import get_db
    from app.models.snake import Snake

    file_path = backend / 'data' / 'snakes.json'
    original_bytes = file_path.read_bytes() if file_path.exists() else None
    file_rows = read_list(file_path) if original_bytes is not None else []
    if any(not isinstance(r, dict) or not isinstance(r.get('id'), str) for r in file_rows):
        raise ValueError('Format data/snakes.json lama tidak valid; tidak ada perubahan.')
    file_map = {r['id']: r for r in file_rows}
    if len(file_map) != len(file_rows):
        raise ValueError('Ada ID duplikat di snakes.json lama; perbaiki dahulu.')

    with closing(get_db()) as generator:
        db = next(generator)
        if db.get_bind().dialect.name != 'postgresql':
            raise RuntimeError('Skrip ini hanya menerima PostgreSQL.')
        existing = {row.id: row for row in db.scalars(select(Snake)).all()}
        before = [{'id': row.id, 'data': copy.deepcopy(row.data)} for row in existing.values()]
        merged = {}
        for profile in incoming:
            sid = profile['id']
            value = merge_profile(file_map.get(sid, {}), profile)
            if sid in existing:
                value = merge_profile(existing[sid].data or {}, value)
            merged[sid] = value
        added = sum(sid not in existing for sid in merged)
        updated = sum(sid in existing and existing[sid].data != value for sid, value in merged.items())
        unchanged = 125 - added - updated
        print(f'Profil paket: 125 | Baru: {added} | Diperbarui: {updated} | Sama: {unchanged}')
        print('Tabel tujuan: profil ular. Riwayat deteksi tidak diubah.')
        if not args.apply:
            print('PRATINJAU SAJA. Jalankan kembali dengan --apply untuk menyimpan.')
            return

        backup = backend / 'backups' / ('profiles-' + datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S') + '-' + uuid4().hex[:6])
        backup.mkdir(parents=True)
        atomic_json(backup / 'snake-table-before.json', before)
        if original_bytes is not None:
            (backup / 'snakes.json.before').write_bytes(original_bytes)
        atomic_json(backup / 'manifest.json', {
            'target': str(file_path), 'file_existed': original_bytes is not None,
            'added_ids': [sid for sid in merged if sid not in existing],
            'note': 'Backup profil saja, bukan backup seluruh database.',
        })

        # Preserve unrelated records from the JSON and database.
        final_map = dict(file_map)
        for sid, row in existing.items():
            if sid not in final_map:
                final_map[sid] = {**(row.data or {}), 'id': sid}
        final_map.update(merged)
        file_written = False
        try:
            for sid, data in merged.items():
                if sid in existing:
                    existing[sid].data = data
                else:
                    db.add(Snake(id=sid, data=data))
            db.flush()
            atomic_json(file_path, [final_map[sid] for sid in sorted(final_map)])
            file_written = True
            db.commit()
        except Exception:
            db.rollback()
            if file_written:
                if original_bytes is None:
                    file_path.unlink(missing_ok=True)
                else:
                    file_path.write_bytes(original_bytes)
            raise
        print('SELESAI: 125 profil telah dimasukkan ke PostgreSQL dan data/snakes.json.')
        print('Backup profil:', backup)
        print('Restart backend, refresh web, lalu lakukan deteksi baru.')


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        # Do not print DB URLs, credentials or driver connection details.
        print(f'GAGAL ({type(exc).__name__}). Periksa lokasi folder, PostgreSQL, dan konfigurasi backend/.env.', file=sys.stderr)
        if isinstance(exc, (ValueError, RuntimeError)):
            print(str(exc), file=sys.stderr)
        sys.exit(1)
