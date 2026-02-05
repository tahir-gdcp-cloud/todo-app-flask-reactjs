from marshmallow import Schema, fields

class HabitSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    is_completed = fields.Boolean()