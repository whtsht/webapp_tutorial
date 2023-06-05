from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()


class Post(db.Model):
    __tablename__ = "posts"
    id: int = db.Column(db.Integer, primary_key=True)
    title: str = db.Column(db.String(100), unique=True, nullable=False)
    content: str = db.Column(db.Text, nullable=False)
    
    def __init__(self, title: str, content: str):
        self.title = title
        self.content = content

    def serialize(self):
        return {
            "title": self.title,
            "content": self.content
        }