from flask.views import MethodView
from flask_smorest import Blueprint
from flaskr.controllers.feedback_controller import FeedbackController
from flaskr.schemas.feedback import FeedbackSchema

blp = Blueprint("Feedback", __name__, description="User Feedback API")

@blp.route("/feedback")
class Feedback(MethodView):
    @blp.arguments(FeedbackSchema)
    @blp.response(201, FeedbackSchema)
    def post(self, feedback_data):
        return FeedbackController.create_feedback(feedback_data)