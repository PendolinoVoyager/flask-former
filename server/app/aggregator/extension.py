from flask import current_app, _app_ctx_stack as stack
from .client import AggregatorClient
from globals import G_CONFIG
class AggregatorClientExtension:
    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        app.teardown_appcontext(self.teardown)
        app.extensions['aggregator_client'] = self

    def get_client(self):
        ctx = stack.top
        if ctx is not None:
            if not hasattr(ctx, 'aggregator_client'):

                ctx.aggregator_client = AggregatorClient(G_CONFIG["AGGREGATOR_HOST"], G_CONFIG["AGGREGATOR_PORT"])
                ctx.aggregator_client.connect()
            return ctx.aggregator_client

    def teardown(self, exception):
        ctx = stack.top
        if hasattr(ctx, 'aggregator_client'):
            ctx.aggregator_client.close()
