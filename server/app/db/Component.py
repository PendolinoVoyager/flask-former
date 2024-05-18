from mongoengine import EmbeddedDocument, StringField, ListField, IntField, FloatField, BooleanField, DateField, DateTimeField
import datetime
#abstract class to represent a component
class Component(EmbeddedDocument):
    meta = {'allow_inheritance': True}
    label = StringField(required=True, max_length=200)
    type = StringField(required=True, max_length=50)
    required = BooleanField(required=False, default=False)
    type = "abstract"
    def JSON_serialize(self):
        raise NotImplementedError("Method not implemented")

class TextComponent(Component):
    type = "text"
    default_value = StringField(max_length=200)
    def __init__(self, **kwargs):
        super().__init__()
        self.label = kwargs.get('label')
        self.default_value = kwargs.get('default_value', None)
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
    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self.label = kwargs.get('label')
        self.default_value = kwargs.get('default_value', 1)
        self.choices = kwargs.get('choices')

    def JSON_serialize(self):
        return {
            "type": "checkbox",
            "label": self.label,
            "default_value": self.default_value,
            "choices": self.choices
        }
class RadioComponent(Component):
    type = "radio"
    choices = ListField(StringField(max_length=50), max_length=64)
    default_value = IntField(min_value=1, max_value=choices.max_length)

    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self.label = kwargs.get('label')
        self.default_value = kwargs.get('default_value', None)
        self.choices = kwargs.get('choices')
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
    min = FloatField()
    max = FloatField()
    is_integer = BooleanField()
    default_value = FloatField()
    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self.label = kwargs.get('label')
        self.min = kwargs.get('min', None)
        self.max = kwargs.get('max', None)
        self.is_integer = kwargs.get('is_integer', False)
        self.default_value = kwargs.get('default_value', None)
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
    default_value = DateField()
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.label = kwargs.get('label')
        self.default_value = self.validate_date(kwargs.get('default_value'))

    @staticmethod
    def validate_date(value):
        if isinstance(value, int):
            # Assume the integer is a timestamp
            return datetime.datetime.fromtimestamp(value).date()
        elif isinstance(value, str):
            try:
                # Attempt to parse the date string
                return datetime.datetime.strptime(value, '%Y-%m-%d').date()
            except ValueError:
                raise ValueError("Invalid date string format, expected YYYY-MM-DD")
        else:
            return None

    def JSON_serialize(self):
        return {
            "type": "date",
            "label": self.label,
            "default_value": self.default_value.isoformat() if self.default_value else None
        }
class TimeComponent(Component):
    type = "time"
    default_value = IntField(0, 1439)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.label = kwargs.get('label')
        self.default_value = self.validate_time(kwargs.get('default_value'))

    @staticmethod
    def validate_time(value):
        if isinstance(value, int) and 0 <= value < 1440:
            return value
        else:
            raise ValueError("Invalid time value, must be an integer representing minutes from 0 to 1439")

    def JSON_serialize(self):
        return {
            "type": "time",
            "label": self.label,
            "default_value": self.default_value
        }

class DateTimeComponent(Component):
    type = "datetime"
    default_value = DateTimeField()
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.label = kwargs.get('label')
        self.default_value = self.validate_datetime(kwargs.get('default_value'))

    @staticmethod
    def validate_datetime(value):
        if isinstance(value, int):
            # Assume the integer is a timestamp
            return datetime.datetime.fromtimestamp(value)
        elif isinstance(value, str):
            try:
                # Attempt to parse the datetime string
                return datetime.datetime.strptime(value, '%Y-%m-%dT%H:%M:%S')
            except ValueError:
                raise ValueError("Invalid datetime string format, expected YYYY-MM-DDTHH:MM:SS")
        else:
            return None

    def JSON_serialize(self):
        return {
            "type": "datetime",
            "label": self.label,
            "default_value": self.default_value.isoformat() if self.default_value else None
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
                return TextComponent(**kwargs)
            case "checkbox":
                if 'choices' not in kwargs:
                    raise ValueError("Field choices is required")
                return CheckboxComponent(**kwargs)
            case "radio":
                if 'choices' not in kwargs:
                    raise ValueError("Field choices is required")
                return RadioComponent(**kwargs)
            case "number":
                return NumberComponent(**kwargs)
            case "date":
                return DateComponent(**kwargs)
            case "time":
                return TimeComponent(**kwargs)
            case "datetime":
                return DateTimeComponent(**kwargs)
            case _:
                raise ValueError("Invalid component type")
