import hmac
from fastapi import Header, HTTPException
from app.core.config import API_TOKEN

def require_access(authorization: str = Header(default='')):
    # Optional local-development token. No multi-user isolation is claimed.
    if API_TOKEN and not hmac.compare_digest(authorization, 'Bearer ' + API_TOKEN):
        raise HTTPException(401, 'Token API tidak valid.')
