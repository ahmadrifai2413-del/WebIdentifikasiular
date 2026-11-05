import json
from sqlalchemy import select
from app.core.config import ROOT
from app.models.snake import Snake

def seed(db):
    for data in json.loads((ROOT / 'data/snakes.json').read_text(encoding='utf-8')):
        if db.get(Snake, data['id']) is None:
            db.add(Snake(id=data['id'], data=data))
    db.commit()

def all_snakes(db):
    return [s.data for s in db.scalars(select(Snake).order_by(Snake.id)).all()]
