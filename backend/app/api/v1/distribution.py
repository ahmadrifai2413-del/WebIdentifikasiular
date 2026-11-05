from fastapi import APIRouter, Depends
from app.db.session import get_db
from app.repositories.snakes import all_snakes
router = APIRouter(prefix='/distribution', tags=['Explore'])
@router.get('')
def distribution(db=Depends(get_db)):
    snakes = all_snakes(db)
    regions = sorted({r for s in snakes for r in s['regions']})
    return [{'region': r, 'species_ids': [s['id'] for s in snakes if r in s['regions']]} for r in regions]
@router.get('/habitats')
def habitats(db=Depends(get_db)):
    snakes = all_snakes(db)
    return [{'habitat': h, 'species_ids': [s['id'] for s in snakes if h.lower() in s['habitat'].lower()]} for h in ['Hutan', 'pepohonan', 'sungai', 'pertanian', 'bakau']]
