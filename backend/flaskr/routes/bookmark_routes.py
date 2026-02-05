from flask.views import MethodView
from flask_smorest import Blueprint
from flaskr.controllers.bookmark_controller import BookmarkController
from flaskr.schemas.bookmark import BookmarkSchema

blp = Blueprint("Bookmarks", __name__, description="Bookmark Manager API")

@blp.route("/bookmarks")
class Bookmarks(MethodView):
    # GET: Fetches the list
    @blp.response(200, BookmarkSchema(many=True))
    def get(self):
        return BookmarkController.get_all_bookmarks()

    # POST: Saves a new entry
    @blp.arguments(BookmarkSchema)
    @blp.response(201, BookmarkSchema)
    def post(self, bookmark_data):
        return BookmarkController.save_bookmark(bookmark_data)