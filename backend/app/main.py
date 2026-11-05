from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from alembic import command
from alembic.config import Config
from app.core.config import CORS_ORIGINS, ROOT
from app.core.security import require_access
from app.db.session import SessionLocal
from app.repositories.snakes import seed
from app.api.v1 import auth, snakes, detections, history, compare, distribution, gallery, safety
from ai.inference import inference

@asynccontextmanager
async def lifespan(app):
    command.upgrade(Config(str(ROOT / 'alembic.ini')), 'head')
    with SessionLocal() as db:
        seed(db)
    inference.load()
    yield

app = FastAPI(title='Serpenta API', version='1.0.0', lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=CORS_ORIGINS,
    allow_credentials=True, allow_methods=['GET','POST','PATCH','DELETE'],
    allow_headers=['Content-Type','Authorization','X-Serpenta-Request'])
@app.get('/health')
def health():
    return {'status': 'ok', 'model_ready': inference.model is not None}
for module in [snakes, detections, history, compare, distribution, gallery, safety]:
    app.include_router(module.router, prefix='/api/v1', dependencies=[])

app.include_router(auth.router, prefix='/api/v1')

@app.middleware('http')
async def private_cache(request, call_next):
    response = await call_next(request)
    if request.url.path.startswith(('/api/v1/auth', '/api/v1/history', '/api/v1/detections')):
        response.headers['Cache-Control'] = 'private, no-store'
    return response
