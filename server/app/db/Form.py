
from mongoengine import Document, StringField, EmbeddedDocumentListField, IntField
from helpers import save_file
from Hasher import Hasher
from globals import G_CONFIG
from .Component import AVAILABLE_COMPONENTS, Component, ComponentFactory
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
    #constructs a form object from request body (JSON)
    @staticmethod
    def from_json(body):
        if not body:
            raise ValueError("form is required")
        if not body.get('name'):
            raise ValueError("name is required")
        if not body.get('components') or not len(body.get('components')):
            raise ValueError("components are required")

        components = []
        for component in body['components']:
            if component['type'] not in AVAILABLE_COMPONENTS:
                raise ValueError(f"invalid component type: {component['type']}")
            components.append(ComponentFactory.from_type(component['type'], **component))
        # Prepare response dictionary without mutating the original body
        formDict = {
            "name": body['name'],
            "image": 'placeholder.png',  # Default value for image
            "components": components
        }
        if "description" in body:
            formDict["description"] = body["description"]
        # Slugify and validate filename if image is present
        if 'image' in body:
            formDict["image"] = save_file(body['image'])

        # Hash key if present
        if "key" in body:
            formDict['key'] = Hasher.hash(body['key'])
        form = Form(**formDict)
        return form

