from flask import Blueprint, jsonify, request
import yfinance as yf
import joblib
import os
import gzip

api_blueprint = Blueprint("stock", __name__)

# API Route to fetch stock data
@api_blueprint.route("/monthly", methods=["POST"])
def get_stock_data():
    try:
        data = yf.download(request.json.get("symbol", "AAPL"), period="1mo")
        data_json = data.to_json(orient="split")

        return jsonify({"data": data_json})
    except Exception as e:
        return jsonify({"error": str(e)})

@api_blueprint.route("/news", methods=["POST"])
def get_news_for_symbol():
    symbol = request.json.get("symbol", "AAPL")

    try:
        stock_info = yf.Ticker(symbol)
        news = stock_info.news

        return jsonify({"news": news})
    except Exception as e:
        return jsonify({"error": str(e)})
    

@api_blueprint.route("/predict", methods=["POST"])
def get_prediction():
    symbol = request.json.get("symbol", "HDFC")
    model_type = request.json.get("model", "ARIMA")
    model_directory = f"C:/ProgramData/Jenkins/.jenkins/workspace/Stock Price Forecasting/App/flask-server/Models/pickle/{model_type}/"

    model_file_path = os.path.join(model_directory, f"{symbol}.pkl")
    if os.path.exists(model_file_path):
        try:
            with open(model_file_path, 'rb') as file:
                model = joblib.load(file)
                prediction = model.predict(start=2456, end=2456, dynamic=True)
                return jsonify({"prediction": prediction.tolist()})  
        except Exception as e:
            return jsonify({"error": f"Error loading or using the model: {str(e)}"})
    else:
        return jsonify({"error": f"Model file for symbol '{symbol}' not found for the chosen model type '{model_type}'"})