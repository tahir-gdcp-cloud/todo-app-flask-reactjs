from flaskr.db import db

class BookmarkModel(db.Model):
    __tablename__ = "bookmarks"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), default="General")