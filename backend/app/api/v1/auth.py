import secrets
from uuid import uuid4
from datetime import datetime, timedelta, timezone
from threading import Lock
from time import monotonic
from collections import defaultdict, deque
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr, Field, field_validator
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError, InvalidHashError
from sqlalchemy import select, delete
from sqlalchemy.exc import IntegrityError
from app.db.session import get_db
from app.models.user import User, UserSession
from app.core.auth import COOKIE, SECURE, digest, current_user, require_csrf

router = APIRouter(prefix='/auth', tags=['Accounts'], dependencies=[Depends(require_csrf)])
hasher = PasswordHasher()
dummy = hasher.hash(secrets.token_urlsafe(32))
_attempts = defaultdict(deque)
_lock = Lock()

def throttle(request: Request):
    # Single-process limiter. Add a shared/edge limiter for multi-worker hosting.
    key = request.client.host if request.client else 'unknown'
    now = monotonic()
    with _lock:
        for ip in list(_attempts):
            while _attempts[ip] and now - _attempts[ip][0] > 60:
                _attempts[ip].popleft()
            if not _attempts[ip]: del _attempts[ip]
        if len(_attempts[key]) >= 10:
            raise HTTPException(429, 'Terlalu banyak percobaan. Coba lagi satu menit.', headers={'Retry-After': '60'})
        _attempts[key].append(now)

class Credentials(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)
    @field_validator('email', mode='before')
    @classmethod
    def clean_email(cls, value):
        return value.strip().lower() if isinstance(value, str) else value

class Registration(Credentials):
    name: str = Field(min_length=2, max_length=100)
    password: str = Field(min_length=12, max_length=128)
    @field_validator('name', mode='before')
    @classmethod
    def clean_name(cls, value):
        return value.strip() if isinstance(value, str) else value

def profile(user):
    return {'id': user.id, 'name': user.name, 'email': user.email}

def start_session(db, user, request, response):
    old = request.cookies.get(COOKIE)
    if old: db.execute(delete(UserSession).where(UserSession.token_hash == digest(old)))
    db.execute(delete(UserSession).where(UserSession.expires_at < datetime.now(timezone.utc)))
    token = secrets.token_urlsafe(32)
    db.add(UserSession(token_hash=digest(token), user_id=user.id, expires_at=datetime.now(timezone.utc)+timedelta(days=7)))
    db.commit()
    response.set_cookie(COOKIE, token, max_age=604800, httponly=True, secure=SECURE, samesite='lax', path='/')
    return profile(user)

@router.post('/register', status_code=201, dependencies=[Depends(throttle)])
def register(payload: Registration, request: Request, response: Response, db=Depends(get_db)):
    user = User(id=str(uuid4()), name=payload.name, email=str(payload.email), password_hash=hasher.hash(payload.password))
    db.add(user)
    try:
        db.flush()
        return start_session(db, user, request, response)
    except IntegrityError:
        db.rollback()
        raise HTTPException(409, 'Email sudah digunakan. Silakan masuk.')

@router.post('/login', dependencies=[Depends(throttle)])
def login(payload: Credentials, request: Request, response: Response, db=Depends(get_db)):
    user = db.scalar(select(User).where(User.email == str(payload.email)))
    try: hasher.verify(user.password_hash if user else dummy, payload.password)
    except (VerificationError, InvalidHashError):
        raise HTTPException(401, 'Email atau password tidak cocok.')
    if user is None: raise HTTPException(401, 'Email atau password tidak cocok.')
    return start_session(db, user, request, response)

@router.get('/me')
def me(user=Depends(current_user)):
    return profile(user)

@router.post('/logout', status_code=204)
def logout(request: Request, db=Depends(get_db)):
    db.execute(delete(UserSession).where(UserSession.token_hash == digest(request.cookies.get(COOKIE, ''))))
    db.commit()
    response = Response(status_code=204)
    response.delete_cookie(COOKIE, path='/', secure=SECURE, httponly=True, samesite='lax')
    return response
