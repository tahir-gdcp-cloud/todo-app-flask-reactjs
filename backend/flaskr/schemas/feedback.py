from marshmallow import Schema, fields

class FeedbackSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    detail = fields.Str(required=True)
    rating = fields.Int()