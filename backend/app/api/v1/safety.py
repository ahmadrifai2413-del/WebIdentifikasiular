import json
from fastapi import APIRouter
from app.core.config import ROOT
router = APIRouter(prefix='/safety', tags=['Safety'])
@router.get('')
def guide():
    return json.loads((ROOT / 'data/safety.json').read_text(encoding='utf-8'))
