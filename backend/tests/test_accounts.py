"""HTTP ownership tests with isolated in-memory storage; not a PostgreSQL migration test."""
import os
os.environ.setdefault('DATABASE_URL','postgresql+psycopg://test:test@localhost/test')
import io
from datetime import datetime,timedelta,timezone
from fastapi.testclient import TestClient
from sqlalchemy import create_engine,select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from PIL import Image
from app.main import app
from app.db.base import Base
from app.db.session import get_db
from app.models.user import User,UserSession
from app.models.detection import Detection
from app.api.v1.auth import _attempts
from app.api.v1 import history
from app.services import detection_service
from ai.inference import inference

def test_accounts_and_private_history(tmp_path,monkeypatch):
    engine=create_engine('sqlite://',connect_args={'check_same_thread':False},poolclass=StaticPool)
    Base.metadata.create_all(engine)
    Session=sessionmaker(engine,expire_on_commit=False)
    def database():
        with Session() as db:yield db
    app.dependency_overrides[get_db]=database
    monkeypatch.setattr(history,'UPLOAD_DIR',tmp_path)
    monkeypatch.setattr(detection_service,'UPLOAD_DIR',tmp_path)
    _attempts.clear()
    a,b=TestClient(app),TestClient(app)
    headers={'X-Serpenta-Request':'1'}
    account={'name':'Ahmad','email':'ahmad@example.com','password':'tropical forest journal'}
    try:
        assert a.post('/api/v1/auth/register',json=account).status_code==403
        assert a.post('/api/v1/auth/register',json={**account,'password':'short'},headers=headers).status_code==422
        r=a.post('/api/v1/auth/register',json=account,headers=headers)
        assert r.status_code==201,r.text
        assert 'HttpOnly' in r.headers['set-cookie']
        assert a.get('/api/v1/auth/me').json()['name']=='Ahmad'
        assert b.get('/api/v1/history').status_code==401
        assert b.post('/api/v1/auth/login',json={**account,'password':'wrong'},headers=headers).status_code==401
        assert b.post('/api/v1/auth/register',json=account,headers=headers).status_code==409
        assert b.post('/api/v1/auth/register',json={**account,'email':'friend@example.com'},headers=headers).status_code==201
        raw=io.BytesIO();Image.new('RGB',(20,20),'green').save(raw,format='JPEG')
        r=a.post('/api/v1/history',files={'image':('test.jpg',raw.getvalue(),'image/jpeg')},headers=headers)
        assert r.status_code==201,r.text
        item=r.json()['id']
        assert len(a.get('/api/v1/history').json())==1
        assert b.get('/api/v1/history').json()==[]
        assert a.get(f'/api/v1/history/{item}/image').status_code==200
        assert b.get(f'/api/v1/history/{item}/image').status_code==404
        assert b.patch(f'/api/v1/history/{item}',json={'note':'intrusion'},headers=headers).status_code==404
        assert b.delete(f'/api/v1/history/{item}',headers=headers).status_code==404
        assert a.patch(f'/api/v1/history/{item}',json={'note':'my note'},headers=headers).status_code==200
        with Session() as db:
            user=db.scalar(select(User).where(User.email==account['email']))
            assert user.password_hash.startswith('$argon2id$')
            db.add(Detection(id='legacy',user_id=None,species_id=None,confidence=None,status='manual',image_key='old.jpg',filename='old.jpg',note='',predictions=[]));db.commit()
        assert len(a.get('/api/v1/history').json())==1
        monkeypatch.setattr(inference,'predict',lambda image:[])
        r=a.post('/api/v1/detections',files={'image':('test.jpg',raw.getvalue(),'image/jpeg')},headers=headers)
        assert r.status_code==201,r.text
        assert len(a.get('/api/v1/history').json())==2
        assert b.get('/api/v1/history').json()==[]
        old_cookie=a.cookies.get('serpenta_session')
        assert a.post('/api/v1/auth/logout',json={},headers=headers).status_code==204
        assert a.get('/api/v1/history').status_code==401
        a.cookies.set('serpenta_session',old_cookie)
        assert a.get('/api/v1/auth/me').status_code==401
        a.cookies.clear()
        assert a.post('/api/v1/auth/login',json={**account,'email':' AHMAD@EXAMPLE.COM '},headers=headers).status_code==200
        assert a.delete(f'/api/v1/history/{item}',headers=headers).status_code==204
        with Session() as db:
            for session in db.scalars(select(UserSession)):session.expires_at=datetime.now(timezone.utc)-timedelta(days=1)
            db.commit()
        assert a.get('/api/v1/auth/me').status_code==401
    finally:
        app.dependency_overrides.clear();_attempts.clear();engine.dispose()
