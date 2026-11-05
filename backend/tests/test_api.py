import io
import os
import tempfile
from pathlib import Path

SANDBOX = tempfile.TemporaryDirectory()
import pytest
from uuid import uuid4
from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url

TEST_URL = os.getenv('TEST_DATABASE_URL', '')
if not TEST_URL:
    pytest.skip('Set TEST_DATABASE_URL to a PostgreSQL test database. Tests never use a fallback database.', allow_module_level=True)
url = make_url(TEST_URL)
if url.get_backend_name() != 'postgresql':
    raise RuntimeError('TEST_DATABASE_URL must use PostgreSQL.')
if not (url.database or '').endswith('_test'):
    raise RuntimeError('Use a dedicated database whose name ends with _test.')
SCHEMA = 'snakepedia_test_' + uuid4().hex
control_engine = create_engine(url, isolation_level='AUTOCOMMIT')
query = dict(url.query)
query['options'] = '-csearch_path=' + SCHEMA
os.environ['DATABASE_URL'] = url.set(query=query).render_as_string(hide_password=False)
os.environ['UPLOAD_DIR'] = str(Path(SANDBOX.name) / 'uploads')
os.environ['MODEL_PATH'] = str(Path(SANDBOX.name) / 'absent.pt')
os.environ['API_TOKEN'] = ''

import pytest
from fastapi.testclient import TestClient
from PIL import Image
from alembic.config import Config
from alembic import command
from app.main import app
from app.core.config import UPLOAD_DIR
from ai.inference import inference, select_prediction

@pytest.fixture(scope='module')
def client():
    with control_engine.connect() as conn:
        conn.execute(text(f'CREATE SCHEMA "{SCHEMA}"'))
    try:
        command.upgrade(Config('alembic.ini'), 'head')
        with TestClient(app) as c:
            c.headers['X-Serpenta-Request']='1'
            assert c.post('/api/v1/auth/register',json={'name':'Test Account','email':'integration@example.com','password':'integration test password'}).status_code==201
            yield c
    finally:
        from app.db.session import engine
        engine.dispose()
        with control_engine.connect() as conn:
            conn.execute(text(f'DROP SCHEMA "{SCHEMA}" CASCADE'))
        control_engine.dispose()


def picture():
    buf = io.BytesIO()
    Image.new('RGB', (80, 40), color='green').save(buf, format='PNG')
    return ('test.png', buf.getvalue(), 'image/png')


def test_catalog(client):
    items = client.get('/api/v1/snakes').json()
    import json
    from app.core.config import ROOT
    assert len(items) == len(json.loads((ROOT/'data/snakes.json').read_text(encoding='utf-8')))
    assert client.get('/api/v1/snakes/not-a-species').status_code == 404
    assert len(client.get('/api/v1/snakes', params={'q':'bajing'}).json()) == 1
    assert client.get('/api/v1/compare', params={'a':items[0]['id'],'b':items[1]['id']}).status_code == 200
    assert client.get('/api/v1/distribution').status_code == 200
    assert client.get('/api/v1/distribution/habitats').status_code == 200
    assert client.get('/api/v1/gallery').status_code == 200
    assert client.get('/api/v1/safety').json()['source'].startswith('https://www.who.int/')


def test_no_model_no_fake_result(client):
    assert client.get('/api/v1/detections/status').json()['ready'] is False
    before = len(client.get('/api/v1/history').json())
    response = client.post('/api/v1/detections', files={'image':picture()})
    assert response.status_code == 503
    assert len(client.get('/api/v1/history').json()) == before
    assert not list(UPLOAD_DIR.glob('*.jpg'))


def test_history_lifecycle(client):
    r = client.post('/api/v1/history',files={'image':picture()},data={'note':'Kebun'})
    assert r.status_code == 201
    d = r.json()
    assert d['status']=='manual' and d['species_id'] is None
    assert client.get(d['image_url']).headers['content-type'] == 'image/jpeg'
    assert client.patch('/api/v1/history/'+d['id'],json={'note':'Catatan baru'}).json()['note']=='Catatan baru'
    assert any(x['id']==d['id'] for x in client.get('/api/v1/history').json())
    assert client.delete('/api/v1/history/'+d['id']).status_code == 204
    assert client.get(d['image_url']).status_code == 404
    assert not list(UPLOAD_DIR.glob('*.jpg'))


def test_image_validation(client):
    assert client.post('/api/v1/history', files={'image':('bad.png',b'not an image','image/png')}).status_code==400
    assert client.post('/api/v1/history', files={'image':('bad.txt',b'hello','text/plain')}).status_code==415
    assert client.post('/api/v1/history', files={'image':('large.jpg',b'x'*(8*1024*1024+1),'image/jpeg')}).status_code==413
    assert client.post('/api/v1/history',files={'image':picture()},data={'note':'x'*2001}).status_code==422


def test_predictions_unknown_does_not_fall_through():
    result=select_prediction([{'species_id':'unknown-species','confidence':.99},{'species_id':'naja-sumatrana','confidence':.8}],{'naja-sumatrana'})
    assert result['status']=='unknown' and result['species_id'] is None
    assert select_prediction([{'species_id':'naja-sumatrana','confidence':.2}],{'naja-sumatrana'})['status']=='unknown'
    assert select_prediction([{'species_id':'naja-sumatrana','confidence':float('nan')}],{'naja-sumatrana'})['predictions']==[]
    assert select_prediction([{'species_id':'naja-sumatrana','confidence':.9,'box':[.8,0,.2,1]}],{'naja-sumatrana'})['predictions']==[]


def test_real_pipeline_contract_with_stubbed_model(client, monkeypatch):
    # Tests storage and API wiring only, not model accuracy.
    monkeypatch.setattr(inference,'predict',lambda image:[{'species_id':'naja-sumatrana','confidence':.9,'box':[.1,.1,.8,.8]}])
    r=client.post('/api/v1/detections',files={'image':picture()})
    assert r.status_code==201
    assert r.json()['species_id']=='naja-sumatrana'
    assert r.json()['predictions'][0]['box']==[.1,.1,.8,.8]
    client.delete('/api/v1/history/'+r.json()['id'])


def test_cors(client):
    response=client.options('/api/v1/detections',headers={'Origin':'http://localhost:5174','Access-Control-Request-Method':'POST'})
    assert response.headers['access-control-allow-origin']=='http://localhost:5174'
    bad=client.options('/api/v1/detections',headers={'Origin':'https://untrusted.example','Access-Control-Request-Method':'POST'})
    assert bad.status_code==400


def test_postgres_persistence_and_migration(client):
    from sqlalchemy import inspect
    from app.db.session import engine, SessionLocal
    from app.models.detection import Detection
    assert engine.dialect.name == 'postgresql'
    row=client.post('/api/v1/history',files={'image':picture()},data={'note':'Persist PostgreSQL'}).json()
    engine.dispose()  # force a fresh connection pool
    with SessionLocal() as db:
        assert db.get(Detection,row['id']).note == 'Persist PostgreSQL'
    command.upgrade(Config('alembic.ini'), 'head')  # idempotent migration
    assert {'snakes','detections','alembic_version'} <= set(inspect(engine).get_table_names())
    client.delete('/api/v1/history/'+row['id'])
