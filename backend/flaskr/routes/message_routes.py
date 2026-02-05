from flask.views import MethodView
from flask_smorest import Blueprint
from flaskr.controllers.message_controller import MessageController
from flaskr.schemas.message import MessageSchema

blp = Blueprint("Messages", __name__, description="New Message API")

@blp.route("/messages")
class Messages(MethodView):
    @blp.arguments(MessageSchema)
    @blp.response(201, MessageSchema)
    def post(self, message_data):
        return MessageController.save_new_message(message_data)