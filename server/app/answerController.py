from db.Answer import AnswerValidator, FormAnswer
from helpers import error_wrapper
from db.Form import Form
from mongoengine import DoesNotExist
class AnswerController:
    @staticmethod
    @error_wrapper
    def answerForm(request, form_id):
        try:
            form = Form.objects.get(id=form_id)
        except DoesNotExist:
            return {'error': 'Form not found'}, 404
        # Parse the JSON body of the request
        answer_data = request.json.get('answers')
        if answer_data is None:
            return {'error': 'No answers provided'}, 400
        try:
            validator = AnswerValidator(form, answer_data)
            validator.validate()
            form_answer = FormAnswer(form=form_id, answers=answer_data)
            FormAnswer.save(form_answer)
            return {'status': 'success', 'message': 'Answer saved', 'data': form_answer.to_json()}, 201

        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 400