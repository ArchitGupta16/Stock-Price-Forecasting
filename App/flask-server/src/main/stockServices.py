from flask import jsonify, request
import yfinance as yf

def get_stock_data():
    try:
        data = yf.download("AAPL", period="1mo")
        data_json = data.to_json(orient="split")

        return jsonify({"data": data_json})
    except Exception as e:
        return jsonify({"error": str(e)})