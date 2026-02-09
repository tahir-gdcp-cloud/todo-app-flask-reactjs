from flask.views import MethodView
from flask_smorest import Blueprint
from flaskr.controllers.appointment_controller import AppointmentController
from flaskr.schemas.appointment import AppointmentSchema

blp = Blueprint("Appointments", __name__, description="Scheduling API")

@blp.route("/appointments")
class Appointments(MethodView):
    @blp.response(200, AppointmentSchema(many=True))
    def get(self):
        return AppointmentController.get_all_appointments()

    @blp.arguments(AppointmentSchema)
    @blp.response(201, AppointmentSchema)
    def post(self, appointment_data):
        return AppointmentController.create_appointment(appointment_data)

@blp.route("/appointments/<int:appointment_id>/status")
class AppointmentStatus(MethodView):
    @blp.arguments(AppointmentSchema(partial=True))
    @blp.response(200, AppointmentSchema)
    def patch(self, update_data, appointment_id):
        # This will be used to mark meetings as Completed or Canceled
        from flaskr.models.appointment import AppointmentModel
        from flaskr.db import db
        appt = AppointmentModel.query.get_or_404(appointment_id)
        appt.status = update_data.get('status', appt.status)
        db.session.commit()
        return appt