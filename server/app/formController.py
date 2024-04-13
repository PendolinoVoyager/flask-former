from .db.Form import Form
RESULTS_PER_PAGE = 10

def error_wrapper(action):
    def wrapper(*args, **kwargs):
        try:
            return action(*args, **kwargs)
        except Exception as e:
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
        return {"status": "success", "length": len(forms), "data": forms.to_json()}, 200

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
        
        if not page: 
            page = 1
        
        if not name:
            return {"status": "fail", "message": "query parameter 'name' is required"}, 400
        
        data = Form.objects(name__icontains=name).skip((int(page) - 1) * RESULTS_PER_PAGE).limit(RESULTS_PER_PAGE)
        return {"status": "success", "length": len(data), "data": data.to_json()}, 200
    
    @staticmethod
    @error_wrapper
    def create_form(request):
        return {"status": "fail", "message": "not implemented"}, 501
    
    @staticmethod
    @error_wrapper
    def delete_form(request, form_id):
        key = request.json['key']
        if not key:
            return {"status": "fail", "message": "key is required"}, 401
        form = Form.objects(id=form_id).first()
        if not form:
            return {"status": "fail", "message": "not found"}, 404
        if form.key != key:
            return {"status": "fail", "message": "unauthorized - wrong key"}, 401
        form.delete()
        return {"status": "success", "message": "deleted"}, 200
