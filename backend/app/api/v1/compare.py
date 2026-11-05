from fastapi import APIRouter, Depends
from app.db.session import get_db
from app.api.v1.snakes import detail
router = APIRouter(prefix='/compare', tags=['Explore'])
@router.get('')
def compare(a: str, b: str, db=Depends(get_db)):
    return {'first': detail(a, db), 'second': detail(b, db)}
