from marshmallow import Schema, fields

class AppointmentSchema(Schema):
    id = fields.Int(dump_only=True)
    client_name = fields.Str(required=True)
    appointment_time = fields.Str(required=True)
    # Remove 'dump_only=True' so the API can actually receive this field
    status = fields.Str()