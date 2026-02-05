from flask.views import MethodView
from flask_smorest import Blueprint
from flaskr.controllers.product_controller import ProductController
from flaskr.schemas.product import ProductSchema
from flaskr.models.product import ProductModel

blp = Blueprint("Products", __name__, description="Inventory Management API")

@blp.route("/products")
class Products(MethodView):
    @blp.response(200, ProductSchema(many=True))
    def get(self):
        return ProductModel.query.all()

    @blp.arguments(ProductSchema)
    @blp.response(201, ProductSchema)
    def post(self, product_data):
        return ProductController.add_product(product_data)

@blp.route("/products/<int:product_id>/stock")
class ProductStock(MethodView):
    @blp.arguments(ProductSchema(partial=("name", "price"))) # We only need quantity
    @blp.response(200, ProductSchema)
    def patch(self, update_data, product_id):
        # We pass the amount to add or subtract
        return ProductController.update_stock(product_id, update_data['quantity'])