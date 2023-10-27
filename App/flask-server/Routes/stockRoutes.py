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