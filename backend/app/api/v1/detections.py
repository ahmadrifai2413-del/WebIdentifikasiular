from app.core.auth import current_user
from fastapi import APIRouter, Depends, UploadFile, File, Form
from app.db.session import get_db
from app.services.detection_service import create_observation
from app.core.config import THRESHOLD
from ai.inference import inference
router = APIRouter(prefix='/detections', tags=['Detection'])
@router.get('/status')
def status():
    return {'ready': inference.model is not None, 'message': inference.reason, 'threshold': THRESHOLD}
@router.post('', status_code=201)
async def detect(image: UploadFile = File(...), note: str = Form('', max_length=2000), db=Depends(get_db), user=Depends(current_user)):
    return await create_observation(db, image, note, manual=False, user_id=user.id)
