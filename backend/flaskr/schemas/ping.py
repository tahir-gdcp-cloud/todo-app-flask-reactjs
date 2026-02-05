from marshmallow import Schema, fields

class PingSchema(Schema):
    message = fields.Str(dump_only=True)
    status = fields.Str(dump_only=True)