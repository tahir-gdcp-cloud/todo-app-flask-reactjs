from flaskr.db import db

class HabitModel(db.Model):
    __tablename__ = "habits"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    is_completed = db.Column(db.Boolean, default=False) # New: Boolean logic