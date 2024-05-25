from mongoengine import Document, ReferenceField, ListField, DateTimeField


from mongoengine import Document, ReferenceField, ListField, DateTimeField
import datetime

class FormAnswer(Document):
    form = ReferenceField('Form', required=True)
    answers = ListField()  # Flexible storage for any answer type
    submitted_at = DateTimeField(default=datetime.datetime.now(datetime.UTC))

    def to_json(self, *args, **kwargs):

        return {
            "form_id": str(self.form.id),
            "answers": self.answers,
            "submitted_at": str(self.submitted_at.isoformat())
        }

class AnswerValidator:
    def __init__(self, form, answers):
        self.form = form
        self.answers = answers

    def validate(self):
        if len(self.answers) != len(self.form.components):
            raise ValueError("The number of answers must match the number of components.")
        for answer, component in zip(self.answers, self.form.components):
            self.validate_answer(answer, component)

    def validate_answer(self, answer, component):
        if component.required == False and answer is None:
            raise ValueError(f"Answer for {component.label} ({component.type}) is required.")
        
        if component.type == 'number':
                if isinstance(answer, (int, float)):
                    if 'min' in component and answer < component['min']:
                        raise ValueError(f"Number is below the minimum allowed value of {component['min']}.")
                    if 'max' in component and answer > component['max']:
                        raise ValueError(f"Number exceeds the maximum allowed value of {component['max']}.")
                else:
                  raise ValueError(f"Invalid number format for {component.label}.")
        elif component.type == 'checkbox' or component.type == 'radio':
            if not all(opt in component['choices'] for opt in answer):
                raise ValueError(f"Invalid checkbox option selected for {component.label}.")
        
        

    def is_valid(self):
        try:
            self.validate()
            return True
        except ValueError:
            return False
