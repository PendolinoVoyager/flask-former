from mongoengine import Document, StringField

class Form(Document):
    name = StringField(required=True, max_length=200)
    key = StringField(required=True, max_length=64)