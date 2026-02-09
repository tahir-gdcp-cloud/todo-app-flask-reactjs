from marshmallow import Schema, fields

class LeadSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    status = fields.Str()
    source = fields.Str()