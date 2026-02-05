from flaskr.db import db
from flaskr.models.product import ProductModel

class ProductController:
    @staticmethod
    def add_product(data):
        product = ProductModel(**data)
        db.session.add(product)
        db.session.commit()
        return product

    @staticmethod
    def update_stock(product_id, amount):
        product = ProductModel.query.get_or_404(product_id)
        product.quantity += amount # Can be positive (restock) or negative (sale)
        db.session.commit()
        return product