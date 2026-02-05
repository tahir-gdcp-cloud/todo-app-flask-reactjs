from flaskr.db import db
from flaskr.models.habit import HabitModel

class HabitController:
    @staticmethod
    def save_habit(data):
        new_habit = HabitModel(name=data['name'])
        db.session.add(new_habit)
        db.session.commit()
        return new_habit

    @staticmethod
    def get_all_habits():
        return HabitModel.query.all()

    @staticmethod
    def toggle_habit(habit_id):
        habit = HabitModel.query.get_or_404(habit_id)
        habit.is_completed = not habit.is_completed # Toggles True/False
        db.session.commit()
        return habit