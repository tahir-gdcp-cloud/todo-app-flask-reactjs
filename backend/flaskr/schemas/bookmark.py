from marshmallow import Schema, fields

class BookmarkSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    url = fields.Str(required=True)
    category = fields.Str()