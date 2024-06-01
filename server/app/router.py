from flask import Blueprint, jsonify, request


from formController import FormController
from answerController import AnswerController
from aggregatorController import AggregatorController
v1_router_forms = Blueprint('user', __name__, url_prefix='/api/v1/forms')
#This file contains route definitions for /api/v1. Route actions in FormController

# Retrieve all forms
@v1_router_forms.route('/', methods=['GET'])
def get_all_forms():
    res, status = FormController.get_all_forms(request)
    return jsonify(res), status

# Retrieve a specific form by ID
@v1_router_forms.route('/<form_id>', methods=['GET'])
def get_form(form_id):
    res, status = FormController.get_form(request, form_id)

    return jsonify(res), status

# Create and publish a new form
@v1_router_forms.route('/', methods=['POST'])
def create_form():
    res, status = FormController.create_form(request)
    return jsonify(res), status

# Delete a specific form by ID
@v1_router_forms.route('/<form_id>', methods=['DELETE'])
def delete_form(form_id):
    res, status = FormController.delete_form(request, form_id)
    return jsonify(res), status

# Search for forms by criteria (e.g., name)
@v1_router_forms.route('/search', methods=['GET'])
def search_forms():
    res, status = FormController.search_forms(request)
    return jsonify(res), status



v1_router_answers = Blueprint('/api/v1/answers', __name__, url_prefix='/api/v1/answers')

@v1_router_answers.route('/<form_id>/answer', methods=['POST'])
def submit_answer(form_id):
    res, status = AnswerController.answerForm(request, form_id)
    return jsonify(res), status


v1_router_analysis = Blueprint('/api/v1/analysis', __name__, url_prefix='/api/v1/analysis')
@v1_router_analysis.route('/<form_id>/by_criteria', methods=["GET", "POST"])
def aggregate_by_criteria(form_id):
    res, status = AggregatorController.byCriteria(request, form_id)
    return jsonify(res), status