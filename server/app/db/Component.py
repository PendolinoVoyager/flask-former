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
        self.required = kwargs.get('required')
        self.default_value = kwargs.get('default_value')
    def JSON_serialize(self):
        print(self.required)
        return {
           "type": "text",
           "label": self.label,
           "default_value": self.default_value,
           "required": self.required
       }

class CheckboxComponent(Component):
    type = "checkbox"
    choices = ListField(StringField(max_length=50), max_length=64)
    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self.label = kwargs.get('label')
        self.choices = kwargs.get('choices')
        self.required = kwargs.get('required', False)

    def JSON_serialize(self):
        return {
            "type": "checkbox",
            "label": self.label,
            "choices": self.choices,
            "required": self.required
        }
class RadioComponent(Component):
    type = "radio"
    choices = ListField(StringField(max_length=50), max_length=64)

    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self.label = kwargs.get('label')
        self.choices = kwargs.get('choices')
        self.required = kwargs.get('required', False)

    choices = ListField(StringField(max_length=50), max_length=64)
    def JSON_serialize(self):
        return {
            "type": "radio",
            "label": self.label,
            "choices": self.choices,
            
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
        self.min = kwargs.get('min')
        self.max = kwargs.get('max')
        self.required = kwargs.get('required', False)

        self.is_integer = kwargs.get('is_integer', False)
        self.default_value = kwargs.get('default_value')
    def JSON_serialize(self):
        return {
            "type": "number",
            "label": self.label,
            "default_value": self.default_value,
            "required": self.required,
            "min": self.min,
            "max": self.max,
            "is_integer": self.is_integer
        }

class DateComponent(Component):
    type = "date"
    default_value = DateField()
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.required = kwargs.get('required', False)

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
                return None
        else:
            return None

    def JSON_serialize(self):
        return {
            "type": "date",
            "label": self.label,
            "default_value": self.default_value.isoformat() if self.default_value else None,
            "required": self.required,
        }
class TimeComponent(Component):
    type = "time"
    default_value = StringField()  # Default value in HH:MM format

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.label = kwargs.get('label')
        self.default_value = self.validate_time(kwargs.get('default_value'))
        self.required = kwargs.get('required', False)

    @staticmethod
    def validate_time(value):
        if value is None: return None
        if isinstance(value, str):
            try:
                # Validate the time format
                datetime.datetime.strptime(value, '%H:%M')
                return value
            except ValueError:
                raise ValueError("Invalid time format, must be in HH:MM format")
        else:
            raise ValueError("Invalid time value, must be a string in HH:MM format")
    def JSON_serialize(self):
        return {
            "type": "time",
            "label": self.label,
            "default_value": self.default_value,
            "required": self.required,
        }

class DateTimeComponent(Component):
    type = "datetime"
    default_value = DateTimeField()

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.required = kwargs.get('required', False)

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
                return datetime.datetime.strptime(value, '%Y-%m-%dT%H:%M')
            except ValueError:
                raise ValueError("Invalid datetime string format, expected YYYY-MM-DDTHH:MM:SS")
        else:
            return None

    def JSON_serialize(self):
        return {
            "type": "datetime",
            "label": self.label,
            "default_value": self.default_value.isoformat() if self.default_value else None,
            "required": self.required,
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
                print(kwargs)
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
