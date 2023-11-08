from flask import Flask, request
from flask_cors import CORS
import Routes.stockRoutes as sr
import Routes.login as login
import Routes.portfolio as prf

app = Flask(__name__)

CORS(app) 

app.register_blueprint(sr.api_blueprint, url_prefix="/stock")
app.register_blueprint(login.user_blueprint, url_prefix="/user")
app.register_blueprint(prf.prf_blueprint, url_prefix="/prf")

if __name__ == "__main__":
    app.run(debug=True)
