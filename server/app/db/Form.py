import json
from mongoengine import Document, StringField, EmbeddedDocumentListField
from .Component import Component
class Form(Document):
    name = StringField(required=True, max_length=200)
    components = EmbeddedDocumentListField(Component, max_length=99)
    key = StringField(required=True, max_length=64)
    
    def to_json(self, *args, **kwargs):
            data = super(Form, self).to_json(*args, **kwargs)

            data_dict = json.loads(data)
            if 'key' in data_dict:
                del data_dict['key']

            return data_dict