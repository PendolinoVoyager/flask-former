from mongoengine import EmbeddedDocument, StringField, ListField, IntField
#abstract class to represent a component
class Component(EmbeddedDocument):
    meta = {'allow_inheritance': True}
    label = StringField(required=True, max_length=200)
    type = StringField(required=True, max_length=50)
    
    def JSON_serialize(self):
        raise NotImplementedError("Method not implemented")

class TextField(Component):
    type = "text"
    default_value = StringField(max_length=200)
    def __init__(self, label, default_value):
        super().__init__()
        self.label = label
        self.default_value = default_value
    def JSON_serialize(self):
       return {
           "type": "text",
           "label": self.label,
           "default_value": self.default_value
       }

class CheckboxField(Component):
    type = "checkbox"
    choices = ListField(StringField(max_length=50), max_length=64)
    default_value = IntField(min_value=1, max_value=choices.max_length)
    def __init__(self, label, choices, default_value):
        super().__init__()
        self.label = label
        self.default_value = default_value
        self.choices = choices

    def JSON_serialize(self):
        return {
            "type": "checkbox",
            "label": self.label,
            "default_value": self.default_value,
            "choices": self.choices
        }
class RadioField(Component):
    type = "radio"
    def __init__(self, label, choices, default_value):
        super().__init__()
        self.label = label
        self.default_value = default_value
        self.choices = choices
    choices = ListField(StringField(max_length=50), max_length=64)
    def JSON_serialize(self):
        return {
            "type": "radio",
            "label": self.label,
            "default_value": self.default_value,
            "choices": self.choices
        }
class NumberField(Component):
    type = "number"
    def __init__(self, label, default_value):
        super().__init__()
        self.label = label
        self.default_value = default_value
    def JSON_serialize(self):
        return {
            "type": "number",
            "label": self.label,
            "default_value": self.default_value
        }
class FloatField(Component):
    type = "float"
    def __init__(self, label, default_value):
        super().__init__()
        self.label = label
        self.default_value = default_value
    def JSON_serialize(self):
        return {
            "type": "float",
            "label": self.label,
            "default_value": self.default_value
        }

AVAILABLE_COMPONENTS = ["text", "checkbox", "radio", "number", "float"]