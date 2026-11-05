import hashlib
import os
from datetime import datetime, timezone
from fastapi import Depends, HTTPException, Request
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User, UserSession

COOKIE = 'serpenta_session'
SECURE = os.getenv('AUTH_COOKIE_SECURE', 'false').lower() == 'true'

def digest(token):
    return hashlib.sha256(token.encode()).hexdigest()

def require_csrf(request: Request):
    # Cross-origin HTML forms cannot supply this header. Keep CORS origins explicit.
    if request.method not in ('GET', 'HEAD', 'OPTIONS') and request.headers.get('X-Serpenta-Request') != '1':
        raise HTTPException(403, 'Permintaan tidak valid. Muat ulang halaman.')

def current_user(request: Request, db=Depends(get_db)):
    require_csrf(request)
    token = request.cookies.get(COOKIE, '')
    session = db.scalar(select(UserSession).where(UserSession.token_hash == digest(token), UserSession.expires_at > datetime.now(timezone.utc))) if token else None
    user = db.get(User, session.user_id) if session else None
    if user is None:
        raise HTTPException(401, 'Silakan masuk untuk membuka jurnal pribadi.')
    return user
