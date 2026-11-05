from app.models.user import User, UserSession
from alembic import context
from sqlalchemy import create_engine
from app.core.config import DATABASE_URL
from app.db.base import Base
from app.models.snake import Snake  # noqa: F401
from app.models.detection import Detection  # noqa: F401

def offline():
    context.configure(url=DATABASE_URL, target_metadata=Base.metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()
def online():
    engine = create_engine(DATABASE_URL, connect_args={'connect_timeout': 10})
    with engine.connect() as connection:
        context.configure(connection=connection, target_metadata=Base.metadata)
        with context.begin_transaction():
            context.run_migrations()
if context.is_offline_mode():
    offline()
else:
    online()
