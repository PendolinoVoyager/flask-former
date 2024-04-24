from mongoengine import Document, StringField, EmbeddedDocumentListField, IntField
from .Component import Component
from time import time


class Form(Document):
    name = StringField(required=True, max_length=200)
    description = StringField(max_length=500)
    image = StringField(max_length=200)
    created = IntField(default=time())
    components = EmbeddedDocumentListField(Component, 
                                            max_length=99,
                                            min_length=1,
                                            required=True,
                                            polymorphic=True)
    key = StringField(max_length=64)
    
    def to_json(self, *args, **kwargs):
            retval = {
                "id": self.id.__str__(),
                "name": self.name,
                "description": self.description,
                "image": self.image,
                "created": self.created,
                "components": [component.JSON_serialize() for component in self.components]
            }
            return retval
