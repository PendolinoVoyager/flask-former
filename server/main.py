from http.client import HTTPException
from flask import Flask, jsonify, send_from_directory
from dotenv import load_dotenv
from app.router import v1_router
from app.db.db_init import connect as db_connect
import os

if __name__ == '__main__':
    print("This file is not meant to be run directly. Please use ./run.xx scripts to run the application.")
    exit(1)

load_dotenv()

app = Flask(__name__)
app.config["SECRET"] = bytes(os.getenv('SECRET'), 'utf-8')
app.config["ENV"] = os.getenv('ENV')

db_connect(os.getenv('DB_URI'))

app.register_blueprint(v1_router)
app.static_folder = './public'

@app.route('/images/<path>', methods=['GET'])
def get_image(path):
    return app.send_static_file(path)

@app.errorhandler(404)
def handle404(e):
    return jsonify({"status": "fail", "message": "route not found"}), 404

@app.errorhandler(Exception)
def handleException(e):
    if os.getenv('ENV') == 'development':
        print(e)
    else:
        #todo: log error
        pass
    if isinstance(e, HTTPException):
        return jsonify({"status": "fail", "message": str(e)}), e.code
    return jsonify({"status": "fail", "message": "Internal server error"}), 500