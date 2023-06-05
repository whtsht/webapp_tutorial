from flask import Flask

app = Flask(__name__)


@app.route("/web")
def index():
    return "Web App with Flask and React!"
