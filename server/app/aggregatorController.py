from run import app
from helpers import error_wrapper
import json
class AggregatorController:
    @staticmethod
    @error_wrapper
    def byCriteria(request, form_id):
        try:
            data = request.get_json()
        except Exception:
            return {"status": "fail", "message": "Invalid data format: expected JSON"}, 400
        
        client = app.extensions['aggregator_client'].get_client()
        response = client.send_analysis_request(form_id, \
                                          data['analysis_requests'])
        res_json = json.loads(response)
        if res_json['status'] == 'Fail':
            return {'status': 'fail', 'message': res_json['message']}, 400
        return {'status': 'success', 'message': res_json['message']}, 400
