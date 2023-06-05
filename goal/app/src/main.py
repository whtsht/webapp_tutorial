from flask import Flask, Blueprint, request, jsonify
from db_models import db, Post
import control

web = Blueprint("web", __name__, url_prefix="/web")


@web.route("/")
def index():
    return "Web App with Flask and React!"


@web.route("/add/", methods=["POST"])
def add_post():
    data = request.json
    title = data["title"]
    content = data["content"]

    control.add_post(title, content)
    return "OK"


@web.route("/delete/", methods=["POST"])
def delete_post():
    title = request.json["title"]
    control.delete_post(title)
    return "OK"


@web.route("/get/", methods=["GET"])
def get_posts():
    posts = db.session.query(Post).all()
    return jsonify([post.serialize() for post in posts])


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

    with app.app_context():
        db.init_app(app)
        db.create_all()

    app.register_blueprint(web)

    return app
