from datetime import timezone
from uuid import uuid4
from sqlalchemy import select
from app.models.detection import Detection

def serialize(row):
    date = row.created_at
    if date.tzinfo is None:
        date = date.replace(tzinfo=timezone.utc)
    return dict(id=row.id, species_id=row.species_id, confidence=row.confidence,
        status=row.status, filename=row.filename, note=row.note,
        created_at=date.isoformat(), predictions=row.predictions,
        image_url=f'/api/v1/history/{row.id}/image')

def save(db, *, user_id, species_id, confidence, status, image_key, filename, note='', predictions=None):
    row = Detection(id=str(uuid4()), user_id=user_id, species_id=species_id, confidence=confidence,
        status=status, image_key=image_key, filename=filename, note=note, predictions=predictions or [])
    db.add(row)
    db.commit()
    db.refresh(row)
    return row

def list_history(db, user_id):
    return db.scalars(select(Detection).where(Detection.user_id == user_id).order_by(Detection.created_at.desc()).limit(500)).all()
