from datetime import datetime, timezone
from sqlalchemy import ForeignKey, String, Text, Float, JSON, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base
class Detection(Base):
    __tablename__ = 'detections'
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str | None] = mapped_column(ForeignKey('users.id'), nullable=True, index=True)
    species_id: Mapped[str | None] = mapped_column(String(120), nullable=True)
    confidence: Mapped[float | None] = mapped_column(Float, nullable=True)
    status: Mapped[str] = mapped_column(String(30))
    image_key: Mapped[str] = mapped_column(String(60))
    filename: Mapped[str] = mapped_column(String(255))
    note: Mapped[str] = mapped_column(Text, default='')
    predictions: Mapped[list] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
