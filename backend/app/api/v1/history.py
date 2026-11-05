from app.core.auth import current_user
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Response
from fastapi.responses import FileResponse
from app.core.config import UPLOAD_DIR
from app.db.session import get_db
from app.models.detection import Detection
from app.schemas.detection import NoteUpdate
from app.repositories.history import list_history, serialize
from app.services.detection_service import create_observation
router = APIRouter(prefix='/history', tags=['History'])
def get_row(db, item_id, user_id):
    row = db.get(Detection, item_id)
    if row is None or row.user_id != user_id:
        raise HTTPException(404, 'Riwayat tidak ditemukan.')
    return row
@router.get('')
def listing(db=Depends(get_db), user=Depends(current_user)):
    return [serialize(row) for row in list_history(db, user.id)]
@router.post('', status_code=201)
async def manual(image: UploadFile = File(...), note: str = Form('', max_length=2000), db=Depends(get_db), user=Depends(current_user)):
    return await create_observation(db, image, note, manual=True, user_id=user.id)
@router.get('/{item_id}/image')
def image(item_id: str, db=Depends(get_db), user=Depends(current_user)):
    row = get_row(db, item_id, user.id)
    path = UPLOAD_DIR / row.image_key
    if not path.is_file():
        raise HTTPException(404, 'Foto tidak ditemukan.')
    return FileResponse(path, media_type='image/jpeg', headers={'Cache-Control': 'private, no-store'})
@router.patch('/{item_id}')
def edit(item_id: str, payload: NoteUpdate, db=Depends(get_db), user=Depends(current_user)):
    row = get_row(db, item_id, user.id)
    row.note = payload.note
    db.commit()
    return serialize(row)
@router.delete('/{item_id}', status_code=204)
def delete(item_id: str, db=Depends(get_db), user=Depends(current_user)):
    row = get_row(db, item_id, user.id)
    path = UPLOAD_DIR / row.image_key
    db.delete(row)
    db.commit()
    path.unlink(missing_ok=True)
    return Response(status_code=204)
