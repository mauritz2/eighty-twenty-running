from api import db, ma
from datetime import datetime

class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime(), default=datetime.utcnow)

    def __init__(self, title, body):
        self.title = title
        self.body = body

    def __repr__(self):
        return f"<Articles {self.title}>"
    
class ArticlesSchema(ma.Schema):
    class Meta:
        # The fields to expose
        fields = ("id", "title", "body", "date")

# Serializes a single article
article_schema = ArticlesSchema()
# Serializes a queryset
articles_schema = ArticlesSchema(many=True)
