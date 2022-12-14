"""init_table

Revision ID: d84b505c63e5
Revises: 
Create Date: 2022-11-01 09:45:48.800525

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = 'd84b505c63e5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('person',
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('sex', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('birth_date', sa.Date(), nullable=False),
    sa.Column('birth_place', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('country', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('create_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('person')
    # ### end Alembic commands ###
