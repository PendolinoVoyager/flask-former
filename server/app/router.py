from flask import Blueprint, jsonify, request
from .formController import FormController

v1_router = Blueprint('user', __name__, url_prefix='/api/v1')
#This file contains route definitions for /api/v1. Route actions in FormController

# Retrieve all forms
@v1_router.route('/forms', methods=['GET'])
def get_all_forms():
    res, status = FormController.get_all_forms(request)
    return jsonify(res), status

# Retrieve a specific form by ID
@v1_router.route('/forms/<form_id>', methods=['GET'])
def get_form(form_id):
    res, status = FormController.get_form(request, form_id)
    return jsonify(res), status

# Create and publish a new form
@v1_router.route('/forms', methods=['POST'])
def create_form():
    res, status = FormController.create_form(request)
    return jsonify(res), status

# Delete a specific form by ID
@v1_router.route('/forms/<form_id>', methods=['DELETE'])
def delete_form(form_id):
    res, status = FormController.delete_form(request, form_id)
    return jsonify(res), status

# Search for forms by criteria (e.g., name)
@v1_router.route('/forms/search', methods=['GET'])
def search_forms():
    res, status = FormController.search_forms(request)
    return jsonify(res), status
