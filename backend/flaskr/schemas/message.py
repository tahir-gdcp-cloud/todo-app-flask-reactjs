from marshmallow import Schema, fields

class MessageSchema(Schema):
    id = fields.Int(dump_only=True)
    sender_name = fields.Str(required=True)
    content = fields.Str(required=True)