from alembic import op
import sqlalchemy as sa
revision = '0001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table('snakes', sa.Column('id',sa.String(120),primary_key=True), sa.Column('data',sa.JSON(),nullable=False))
    op.create_table('detections',
        sa.Column('id',sa.String(36),primary_key=True),
        sa.Column('species_id',sa.String(120),nullable=True),
        sa.Column('confidence',sa.Float(),nullable=True),
        sa.Column('status',sa.String(30),nullable=False),
        sa.Column('image_key',sa.String(60),nullable=False),
        sa.Column('filename',sa.String(255),nullable=False),
        sa.Column('note',sa.Text(),nullable=False),
        sa.Column('predictions',sa.JSON(),nullable=False),
        sa.Column('created_at',sa.DateTime(timezone=True),nullable=False))
def downgrade():
    op.drop_table('detections')
    op.drop_table('snakes')
