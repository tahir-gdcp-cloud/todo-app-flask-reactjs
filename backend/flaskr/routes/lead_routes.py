from flask.views import MethodView
from flask_smorest import Blueprint
from flaskr.controllers.lead_controller import LeadController
from flaskr.schemas.lead import LeadSchema

blp = Blueprint("Leads", __name__, description="CRM Operations")

@blp.route("/leads")
class Leads(MethodView):
    @blp.response(200, LeadSchema(many=True))
    def get(self):
        return LeadController.get_leads()

    @blp.arguments(LeadSchema)
    @blp.response(201, LeadSchema)
    def post(self, lead_data):
        return LeadController.add_lead(lead_data)

@blp.route("/leads/<int:lead_id>/status")
class LeadStatus(MethodView):
    @blp.arguments(LeadSchema(partial=True))
    @blp.response(200, LeadSchema)
    def patch(self, update_data, lead_id):
        return LeadController.update_lead_status(lead_id, update_data['status'])