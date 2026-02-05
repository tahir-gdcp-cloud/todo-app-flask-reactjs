from flask.views import MethodView
from flask_smorest import Blueprint
from flaskr.controllers.habit_controller import HabitController
from flaskr.schemas.habit import HabitSchema

blp = Blueprint("Habits", __name__, description="Daily Habit Tracker API")

@blp.route("/habits")
class Habits(MethodView):
    @blp.response(200, HabitSchema(many=True))
    def get(self):
        return HabitController.get_all_habits()

    @blp.arguments(HabitSchema)
    @blp.response(201, HabitSchema)
    def post(self, habit_data):
        return HabitController.save_habit(habit_data)

@blp.route("/habits/<int:habit_id>/toggle")
class HabitToggle(MethodView):
    @blp.response(200, HabitSchema)
    def patch(self, habit_id):
        return HabitController.toggle_habit(habit_id)