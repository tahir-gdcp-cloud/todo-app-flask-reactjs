from flask.views import MethodView
from flask_smorest import Blueprint
from flaskr.controllers.ping_controller import PingController
from flaskr.schemas.ping import PingSchema

blp = Blueprint("Ping", __name__)

@blp.route("/api/v1/ping")
class Ping(MethodView):
    @blp.response(200, PingSchema)
    def get(self):
        return PingController.get_ping_status()