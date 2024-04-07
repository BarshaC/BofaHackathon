import logging
from flask import Flask, request
from app.controller import routes

def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

    # Register blueprints
    app.register_blueprint(routes.blueprint)

    # Set up logging
    app.logger.setLevel(logging.NOTSET)

    @app.after_request
    def log_response(resp):
        app.logger.info("{} {} {}\n{}".format(
            request.method, request.url, request.data, resp)
        )
        return resp

    return app
