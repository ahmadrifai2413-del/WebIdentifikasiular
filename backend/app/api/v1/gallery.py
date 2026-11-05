from fastapi import APIRouter, Depends
from app.db.session import get_db
from app.repositories.snakes import all_snakes
router = APIRouter(prefix='/gallery', tags=['Explore'])
@router.get('')
def gallery(db=Depends(get_db)):
    return [{k:s[k] for k in ['id','name','image','credit','license','source']} for s in all_snakes(db)]
