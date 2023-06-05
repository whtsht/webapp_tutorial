from flask import Flask, Blueprint

web = Blueprint("web", __name__, url_prefix="/web")


@web.route("/")
def index():
    return "Web App with Flask and React!"



def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

    app.register_blueprint(web)

    return app
