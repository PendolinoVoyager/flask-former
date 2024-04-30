from .db.Form import Form
from .db.Component import AVAILABLE_COMPONENTS, ComponentFactory
from .Hasher import Hasher
from globals import G_CONFIG
import os


def error_wrapper(action):
    def wrapper(*args, **kwargs):
        try:
            return action(*args, **kwargs)
        except Exception as e:
            if os.getenv('ENV') == 'development':  
                print(e)
            return {'status': "fail", "message": str(e)}, 400
    return wrapper

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

        return {"status": "success", "data": form.to_mongo()}, 200
    
    @staticmethod
    @error_wrapper
    def search_forms(request):
        name = request.args.get('name')
   
        page =  request.args.get('page')
        
        if not page: 
            page = 1
        
        if not name:
            return {"status": "fail", "message": "query parameter 'name' is required"}, 400
        
        forms = Form.objects(name__icontains=name).skip((int(page) - 1) * RESULTS_PER_PAGE).limit(RESULTS_PER_PAGE)
        data = [form.to_json() for form in forms]
        return {"status": "success", "length": len(data), "data": data}, 200
    
    @staticmethod
    @error_wrapper
    def create_form(request):
        body = request.json.get('form')
        if body is None:
            return {"status": "fail", "message": "form is required"}, 400
        if body.get('name') is  None:
            return {"status": "fail", "message": "name is required"}, 400
        
        if body.get('components') is None or len(body.get('components')) == 0:
            return {"status": "fail", "message": "components are required"}, 400

        components = []
        
        for component in body['components']:
            if component['type'] not in AVAILABLE_COMPONENTS:
                return {"status": "fail", "message": f"invalid component type: {component['type']}"}, 400
            components.append(ComponentFactory.from_type(component['type'], **component))

        if not body['image']:
            body['image'] = 'placeholder.png'
        else:
            try:
                # image is a JSON blob so we need to extract it from the request
                imagefile = flask.request.files.get('image', '')
                if imagefile:
                    #slugify the filename
                    imagefile.filename = slugify(imagefile.filename)
                    #add timestamp to the filename
                    imagefile.filename = f"{imagefile.filename.split('.')[0]}-{int(time.time())}.{imagefile.filename.split('.')[1]}"
                    imagefile.save(os.path.join(G_CONFIG['STATIC_DIR'], imagefile.filename))
                    body['image'] = imagefile.filename
                else:
                    body['image'] = 'placeholder.png'
    
            except Exception as e:
                body['image'] = 'placeholder.png'

        if body.get('key') is not None:
            body['key'] = Hasher.hash(body['key'])

        body['components'] = components
        form = Form(**body)
        Form.save(form)
        return {"status": "success", "data": form.to_json()}, 201
    
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
