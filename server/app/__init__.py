from flask import Flask, jsonify
from flask_cors import CORS
from .router import v1_router_forms, v1_router_answers
from .db.db_init import connect as db_connect
from http.client import HTTPException
import os

def create_app():
    app = Flask(__name__)
    app.config["SECRET"] = os.getenv("SECRET")
    app.config["ENV"] = os.getenv("ENV")
    app.static_folder = os.getenv("STATIC_DIR")

    # Set up CORS
    CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
    CORS(app, resources={r"/images/*": {"origins": os.getenv("WEBSITE_HOST")}})

    # Database connection
    db_connect(os.getenv('DB_URI'))

    # Register blueprints
    app.register_blueprint(v1_router_forms)
    app.register_blueprint(v1_router_answers)

    @app.route('/images/<path>', methods=['GET'])
    def get_image(path):
        return app.send_static_file(path)

    @app.errorhandler(404)
    def handle404(e):
        return jsonify({"status": "fail", "message": "route not found"}), 404

    @app.errorhandler(Exception)
    def handleException(e):
        if app.config['ENV'] == 'development':
            print(e)
        else:
            #TODO: log error
            pass
        if isinstance(e, HTTPException):
            return jsonify({"status": "fail", "message": str(e)}), e.code
        return jsonify({"status": "fail", "message": "Internal server error"}), 500

    return app
