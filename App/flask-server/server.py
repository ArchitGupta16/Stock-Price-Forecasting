from flask import Flask, request
from flask_cors import CORS
import Routes.stockRoutes as sr
import Routes.db as db

app = Flask(__name__)

CORS(app) 

app.register_blueprint(sr.api_blueprint, url_prefix="/stock")
app.register_blueprint(db.user_blueprint, url_prefix="/user")

if __name__ == "__main__":
    app.run(debug=True)
