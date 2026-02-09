import flaskr.models

from flask import Flask
from config import DevelopmentConfig
from flaskr.extensions import migrate, api, cors, jwt
from flaskr.db import db
from flask_cors import CORS

from flaskr.routes.auth_route import bp as auth_route
from flaskr.routes.user_route import bp as user_route
from flaskr.routes.tag_route import bp as tag_route
from flaskr.routes.task_route import bp as task_route
from flaskr.routes.ping_routes import blp as ping_route
from flaskr.routes.message_routes import blp as message_route
from flaskr.routes.feedback_routes import blp as feedback_routes
from flaskr.routes.bookmark_routes import blp as bookmark_routes
from flaskr.routes.habit_routes import blp as habit_routes
from flaskr.routes.product_routes import blp as product_routes
from flaskr.routes.appointment_routes import blp as appointment_routes
from flaskr.routes.lead_routes import blp as lead_routes

def create_app(test_config=None):
    app = Flask(__name__)

    if test_config is None:
        app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(test_config)

    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    api.register_blueprint(auth_route, url_prefix="/api/v1")
    api.register_blueprint(user_route, url_prefix="/api/v1")
    api.register_blueprint(tag_route, url_prefix="/api/v1")
    api.register_blueprint(task_route, url_prefix="/api/v1")
    api.register_blueprint(ping_route, url_prefix="/api/v1")
    api.register_blueprint(message_route, url_prefix="/api/v1")
    api.register_blueprint(feedback_routes, url_prefix="/api/v1")
    api.register_blueprint(bookmark_routes, url_prefix="/api/v1")
    api.register_blueprint(habit_routes, url_prefix="/api/v1")
    api.register_blueprint(product_routes, url_prefix="/api/v1")
    api.register_blueprint(appointment_routes, url_prefix="/api/v1")
    api.register_blueprint(lead_routes, url_prefix="/api/v1")

    return app
