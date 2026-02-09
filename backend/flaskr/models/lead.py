from flaskr.db import db

class LeadModel(db.Model):
    __tablename__ = "leads"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    status = db.Column(db.String(50), default="New") # New, Discovery, Proposal, Closed
    source = db.Column(db.String(50), default="Website")