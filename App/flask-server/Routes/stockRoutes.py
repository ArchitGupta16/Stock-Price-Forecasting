from flask import Blueprint, jsonify, request
import yfinance as yf

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
    symbol = request.json.get("symbol", "AAPL")
    model = request.json.get("model", "ARIMA")
    print(model,symbol)
    try:
        stock_info = yf.Ticker(symbol)
        print(stock_info)
        prediction = 200
        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)})