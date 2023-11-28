from flask import Flask, request
from flask_cors import CORS
import src.main.stockRoutes as sr
import src.main.login as login
import src.main.portfolio as prf

app = Flask(__name__)

CORS(app) 

app.register_blueprint(sr.api_blueprint, url_prefix="/stock")
app.register_blueprint(login.user_blueprint, url_prefix="/user")
app.register_blueprint(prf.prf_blueprint, url_prefix="/prf")

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
