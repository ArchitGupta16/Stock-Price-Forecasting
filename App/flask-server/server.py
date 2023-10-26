from flask import Flask, jsonify
from flask_cors import CORS
from data import api_blueprint

app = Flask(__name__)
CORS(app) 

app.register_blueprint(api_blueprint, url_prefix="/api")
# API Route
# @app.route("/api/members")
# def members():
#     data = {"members": ["Member1", "Member2", "Member3"]}
#     return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
