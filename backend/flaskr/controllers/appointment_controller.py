from flaskr.db import db
from flaskr.models.appointment import AppointmentModel
from datetime import datetime  # <--- ADD THIS LINE

class AppointmentController:
    @staticmethod
    def create_appointment(data):
        # Now Python will know what 'datetime' means here
        data['appointment_time'] = datetime.fromisoformat(data['appointment_time'])
        appointment = AppointmentModel(**data)
        db.session.add(appointment)
        db.session.commit()
        return appointment

    @staticmethod
    def get_all_appointments():
        return AppointmentModel.query.order_by(AppointmentModel.appointment_time).all()