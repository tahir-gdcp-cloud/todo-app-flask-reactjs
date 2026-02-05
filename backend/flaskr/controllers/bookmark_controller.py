from flaskr.db import db
from flaskr.models.bookmark import BookmarkModel

class BookmarkController:
    @staticmethod
    def save_bookmark(data):
        new_bookmark = BookmarkModel(**data)
        db.session.add(new_bookmark)
        db.session.commit()
        return new_bookmark

    # FIX: This must be indented inside the class!
    @staticmethod
    def get_all_bookmarks():
        return BookmarkModel.query.all()