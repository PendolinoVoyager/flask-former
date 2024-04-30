from mongoengine import EmbeddedDocument, StringField, ListField, IntField
#abstract class to represent a component
class Component(EmbeddedDocument):
    meta = {'allow_inheritance': True}
    label = StringField(required=True, max_length=200)
    type = StringField(required=True, max_length=50)
    type = "abstract"
    def JSON_serialize(self):
        raise NotImplementedError("Method not implemented")

class TextComponent(Component):
    type = "text"
    default_value = StringField(max_length=200)
    def __init__(self, label, default_value, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label = label
        if default_value is None:
            default_value = ""
        self.default_value = default_value
    def JSON_serialize(self):
       return {
           "type": "text",
           "label": self.label,
           "default_value": self.default_value
       }

class CheckboxComponent(Component):
    type = "checkbox"
    choices = ListField(StringField(max_length=50), max_length=64)
    default_value = IntField(min_value=1, max_value=choices.max_length)
    def __init__(self, label, choices, default_value, *args, **kwargs):
        super().__init__(*args, **kwargs)
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
class RadioComponent(Component):
    type = "radio"
    def __init__(self, label, choices, default_value, *args, **kwargs):
        super().__init__(*args, **kwargs)
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
class NumberComponent(Component):
    type = "number"
    def __init__(self, label, default_value, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label = label
        self.min = kwargs.get('min', None)
        self.max = kwargs.get('max', None)
        self.is_integer = kwargs.get('is_integer', False)
        self.default_value = default_value
    def JSON_serialize(self):
        return {
            "type": "number",
            "label": self.label,
            "default_value": self.default_value,
            "min": self.min,
            "max": self.max,
            "is_integer": self.is_integer
        }

class DateComponent(Component):
    type = "date"
    def __init__(self, label, default_value, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label = label
        self.default_value = default_value
    def JSON_serialize(self):
        return {
            "type": "date",
            "label": self.label,
            "default_value": self.default_value
        }
class TimeComponent(Component):
    type = "time"
    def __init__(self, label, default_value, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label = label
        self.default_value = default_value
    def JSON_serialize(self):
        return {
            "type": "time",
            "label": self.label,
            "default_value": self.default_value
        }

class DateTimeComponent(Component):
    type = "datetime"
    def __init__(self, label, default_value, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label = label
        self.default_value = default_value
    def JSON_serialize(self):
        return {
            "type": "datetime",
            "label": self.label,
            "default_value": self.default_value
        }

AVAILABLE_COMPONENTS = ["text", "checkbox", "radio",
                        "number", "date", "time",
                         "datetime"]
class ComponentFactory:
    REQUIRED_FIELDS = ["label"]
    @staticmethod
    def from_type(self, type, **kwargs):
        for field in ComponentFactory.REQUIRED_FIELDS:
            if field not in kwargs:
                raise ValueError(f"Field {field} is required")
        match type:
            case "text":
                return TextComponent(kwargs.get('label'), kwargs.get('default_value'))
            case "checkbox":
                if 'choices' not in kwargs:
                    raise ValueError("Field choices is required")
                return CheckboxComponent(kwargs.get('label'), kwargs.get('choices'), kwargs.get('default_value'))
            case "radio":
                if 'choices' not in kwargs:
                    raise ValueError("Field choices is required")
                return RadioComponent(kwargs.get('label'), kwargs.get('choices'), kwargs.get('default_value'))
            case "number":
                return NumberComponent(kwargs.get('label'), kwargs.get('default_value'))
            case "float":
                return FloatComponent(kwargs.get('label'), kwargs.get('default_value'))
            case "date":
                return DateComponent(kwargs.get('label'), kwargs.get('default_value'))
            case "time":
                return TimeComponent(kwargs.get('label'), kwargs.get('default_value'))
            case "datetime":
                return DateTimeComponent(kwargs.get('label'), kwargs.get('default_value'))
            case _:
                raise ValueError("Invalid component type")
