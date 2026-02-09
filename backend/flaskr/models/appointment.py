from flaskr.db import db
from datetime import datetime

class AppointmentModel(db.Model):
    __tablename__ = "appointments"
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(100), nullable=False)
    appointment_time = db.Column(db.DateTime, nullable=False) # New: DateTime type
    status = db.Column(db.String(20), default="Scheduled") # Scheduled, Completed, Canceled