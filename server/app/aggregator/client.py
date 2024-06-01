import socket
import json

class AggregatorClient:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self):
        try:
            self.sock.connect((self.host, self.port))
        except ConnectionRefusedError:
            raise Exception("Aggregator service down")

    def close(self):
        self.sock.close()

    def send_analysis_request(self, form_uuid, analysis_requests):
        request_data = {
            'form': str(form_uuid),
            'analysis': analysis_requests
        }
        request_json = json.dumps(request_data).encode('utf-8')
        self.sock.sendall(request_json)
        response = self._receive_response()
        return response

    def _receive_response(self):
        response = self.sock.recv(1024).decode('utf-8')
        return response


