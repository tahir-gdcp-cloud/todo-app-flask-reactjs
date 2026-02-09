from flaskr.db import db
from flaskr.models.lead import LeadModel

class LeadController:
    @staticmethod
    def add_lead(data):
        lead = LeadModel(**data)
        db.session.add(lead)
        db.session.commit()
        return lead

    @staticmethod
    def get_leads():
        return LeadModel.query.order_by(LeadModel.id.desc()).all()