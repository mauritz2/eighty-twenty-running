from app_setup import create_app
from models import db

app = create_app()
app.app_context().push()

db.create_all()