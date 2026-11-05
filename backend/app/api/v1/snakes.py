from fastapi import APIRouter, Depends, HTTPException
from app.db.session import get_db
from app.repositories.snakes import all_snakes
from app.models.snake import Snake
router = APIRouter(prefix='/snakes', tags=['Snakepedia'])
@router.get('')
def listing(q: str = '', region: str = '', db=Depends(get_db)):
    return [s for s in all_snakes(db) if q.lower() in (s['name']+' '+s['scientific']).lower() and (not region or region in s['regions'])]
@router.get('/{snake_id}')
def detail(snake_id: str, db=Depends(get_db)):
    row = db.get(Snake, snake_id)
    if not row:
        raise HTTPException(404, 'Spesies tidak ditemukan.')
    return row.data
@router.get('/{snake_id}/similar')
def similar(snake_id: str, db=Depends(get_db)):
    snake = detail(snake_id, db)
    return [s for s in all_snakes(db) if s['id'] in snake['similar']]
