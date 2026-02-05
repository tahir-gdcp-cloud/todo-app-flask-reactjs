from flaskr.db import db

class MessageModel(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    sender_name = db.Column(db.String(80), nullable=False)
    content = db.Column(db.String(500), nullable=False)