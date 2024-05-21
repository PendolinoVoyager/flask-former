from .helpers import error_wrapper
class AnswerController:
    @staticmethod
    @error_wrapper
    def answerForm(request, form_id):
        try:
            form = Form.objects.get(id=form_id)
        except DoesNotExist:
            return jsonify({'error': 'Form not found'}), 404

        # Parse the JSON body of the request
        answer_data = request.json.get('answers', [])
        if not answer_data:
            return jsonify({'error': 'No answers provided'}), 400
        try:
            validator = AnswerValidator(form, answer_data)
            if validator.is_valid():
                form_answer = FormAnswer(form=form_id, answers=answer_data)
                FormAnswer.save(form_answer)
            return jsonify(form_answer.to_json()), 201
        except Exception as e:
            print(e)
            return jsonify({'status': 'fail', 'message': str(e)}), 400