from flask import Flask, jsonify
from flask_cors import CORS
from db.db_init import connect as db_connect
from http.client import HTTPException
from aggregator.extension import AggregatorClientExtension
import os
import logging

def create_app():
    app = Flask(__name__)
    app.config["SECRET"] = os.getenv("SECRET")
    app.config["ENV"] = os.getenv("ENV")
    app.static_folder = f'../{os.getenv("STATIC_DIR")}'
    logging.basicConfig(filename=os.getenv("LOG_FILE"))

    # Set up CORS
    CORS(app, resources={r"/api/v1/*": {"origins": os.getenv("WEBSITE_HOST")}})
    CORS(app, resources={r"/images/*": {"origins": os.getenv("WEBSITE_HOST")}})

    # Database connection
    if db_connect(os.getenv('DB_URI')) is None:
        print("Cannot connect to database, exiting...")
        exit(1)
    #Init extensions
    aggregator_extension = AggregatorClientExtension(app)
    

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
           logging.critical(e)
        if isinstance(e, HTTPException):
            return jsonify({"status": "fail", "message": str(e)}), e.code
        return jsonify({"status": "fail", "message": "Internal server error"}), 500

    return app
