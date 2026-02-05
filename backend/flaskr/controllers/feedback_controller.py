from flaskr.db import db
from flaskr.models.feedback import FeedbackModel

class FeedbackController:
    @staticmethod
    def create_feedback(data):
        entry = FeedbackModel(**data)
        db.session.add(entry)
        db.session.commit()
        return entry