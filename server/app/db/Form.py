import json
from mongoengine import Document, StringField, EmbeddedDocumentListField, DateTimeField
from .Component import Component
import datetime
class Form(Document):
    name = StringField(required=True, max_length=200)
    description = StringField(max_length=500)
    image = StringField(max_length=200)
    created = DateTimeField(required=True, default=datetime.datetime.utcnow)
    components = EmbeddedDocumentListField(Component, max_length=99, min_length=1, required=True)
    key = StringField(required=True, max_length=64)
    
    def to_json(self, *args, **kwargs):
            data = super(Form, self).to_json(*args, **kwargs)

            data_dict = json.loads(data)
            if 'key' in data_dict:
                del data_dict['key']

            return data_dict