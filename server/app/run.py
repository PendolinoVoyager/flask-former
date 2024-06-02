import os
import globals #sets up env
from __init__ import create_app
app = create_app()

if __name__ == '__main__':
    # the app needs to init first to register blueprints dependant on it
    from router import v1_router_forms, v1_router_answers, v1_router_analysis
    app.register_blueprint(v1_router_forms)
    app.register_blueprint(v1_router_answers)
    app.register_blueprint(v1_router_analysis)
    app.run(port=os.getenv('PORT'), host=os.getenv('HOST'))
