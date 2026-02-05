from flaskr.db import db

class FeedbackModel(db.Model):
    __tablename__ = "feedback"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    detail = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, default=5)