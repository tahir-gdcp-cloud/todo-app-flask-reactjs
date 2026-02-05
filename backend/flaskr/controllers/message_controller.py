from flaskr.db import db
from flaskr.models.message import MessageModel

class MessageController:
    @staticmethod
    def save_new_message(data):
        new_msg = MessageModel(
            sender_name=data['sender_name'], 
            content=data['content']
        )
        db.session.add(new_msg)
        db.session.commit()
        return new_msg