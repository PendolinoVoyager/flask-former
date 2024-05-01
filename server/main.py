from http.client import HTTPException
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from app.router import v1_router
from app.db.db_init import connect as db_connect
import os
from globals import G_CONFIG

app = Flask(__name__)
app.config["SECRET"] = G_CONFIG["SECRET"]
app.config["ENV"] = G_CONFIG["ENV"]
app.static_folder = G_CONFIG["STATIC_DIR"]

cors = CORS(app, resources={r"/api/v1/*": {"origins": G_CONFIG["WEBSITE_HOST"]}})
CORS(app, resources={r"/images/*": {"origins": G_CONFIG["WEBSITE_HOST"]}})
db_connect(os.getenv('DB_URI'))
app.register_blueprint(v1_router)


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
