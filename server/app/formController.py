import logging
from .db.Form import Form
from .db.Component import AVAILABLE_COMPONENTS, ComponentFactory
from .Hasher import Hasher
from globals import G_CONFIG
from .helpers import error_wrapper
RESULTS_PER_PAGE = G_CONFIG['RESULTS_PER_PAGE']
import os

class FormController:
    
    @staticmethod 
    @error_wrapper
    def get_all_forms(request):
        page = request.args.get('page')
        if not page:
            page = 1
        forms = Form.objects().skip((int(page) - 1) * RESULTS_PER_PAGE).limit(RESULTS_PER_PAGE)
        data = [form.to_json() for form in forms]
        return {"status": "success", "length": len(forms), "data": data}, 200

    @staticmethod
    @error_wrapper
    def get_form(request, form_id):
        form = Form.objects(id=form_id).first()
        if not form:
            return {"status": "fail", "message": "Not found"}, 404

        return {"status": "success", "data": form.to_json()}, 200
    
    @staticmethod
    @error_wrapper
    def search_forms(request):
        name = request.args.get('name')
   
        page =  request.args.get('page')

        if not page or not int.is_integer(page) or page > 0: 
            page = 1
        if not name:
            return {"status": "fail", "message": "query parameter 'name' is required"}, 400
        
        forms = Form.objects(name__icontains=name).skip((int(page) - 1) * RESULTS_PER_PAGE).limit(RESULTS_PER_PAGE)
        data = [form.to_json() for form in forms]
        return {"status": "success", "length": len(data), "page": page, "data": data}, 200
    
    @staticmethod
    @error_wrapper
    def create_form(request):
        try:
            body = request.json.get('form')
            if not body:
                raise ValueError("form is required")
            if not body.get('name'):
                raise ValueError("name is required")
            if not body.get('components') or not len(body.get('components')):
                raise ValueError("components are required")

            components = []
            for component in body['components']:
                if component['type'] not in AVAILABLE_COMPONENTS:
                    raise ValueError(f"invalid component type: {component['type']}")
                components.append(ComponentFactory.from_type(component['type'], **component))
        

            if 'image' in request.files:
                image = request.files['image']
                image_filename = "test.jpg"
                image_path = os.path.join(G_CONFIG["STATIC_DIR"], image_filename)
                image.save(image_path)
                body["image"] = image_filename
            else:
                body["image"] = 'placeholder.png'

            if body.get('key'):
                body['key'] = Hasher.hash(body['key'])

            body['components'] = components
            form = Form(**body)
            Form.save(form)
            return {"status": "success", "data": form.to_json()}, 201
        except ValueError as e:
            return {"status": "fail", "message": str(e)}, 400
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            return {"status": "error", "message": "Internal server error"}, 500

    
    @staticmethod
    @error_wrapper
    def delete_form(request, form_id):
        key = request.json['key']
        if not key:
            return {"status": "fail", "message": "key is required"}, 401
        form = Form.objects(id=form_id).first()
        if not form:
            return {"status": "fail", "message": "not found"}, 404
        if not Hasher.verify(form.key, key):
            return {"status": "fail", "message": "unauthorized - wrong key"}, 401
        form.delete()
        return {"status": "success", "message": "deleted"}, 200
