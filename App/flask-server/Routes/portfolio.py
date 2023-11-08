import Routes.db as db
from flask import request, jsonify, Blueprint
import Routes.login as users

prf_blueprint = Blueprint("portfolio", __name__)
prf_collection = db.database['portfolio'] 

class User:
    def __init__(self, email):
        self.email = email

class Stock:
    def __init__(self, symbol,email, price, volume, current_price):
        self.email = email
        self.symbol = symbol
        self.price = price
        self.volume = volume
        self.current_val = current_price

# Get all stocks of a single person
@prf_blueprint.route('/getone', methods=['POST'])
def port():
    data = request.get_json()
    email = data['email']
    symbol = data['symbol']

    user = users.user_collection.find_one({'email': email})
    # print(user)
    if not user:
        return jsonify({"message": "User not found"})
    else:
        stocks = prf_collection.find_one({'email': email, 'symbol': symbol})
        # stocks.pop("_id")
        stocks['_id'] = str(stocks['_id'])
        return jsonify({"stocks":stocks})

@prf_blueprint.route('/getall', methods=['POST'])
def get_all_stocks():
    data = request.get_json()
    email = data['email']

    user = users.user_collection.find_one({'email': email})
    print(user)
    if not user:
        return jsonify({"message": "User not found"})
    else:
        stocks_cursor = prf_collection.find({'email': email})
        stocks = list(stocks_cursor)
        
        for stock in stocks:
            print(stock["_id"])
            stock['_id'] = str(stock['_id'])

        return jsonify({"stocks": stocks})

# Add stock to portfolio Route
@prf_blueprint.route('/add', methods=['POST'])
def add():
    data = request.get_json()
    email = data['email']
    symbol = data['symbol']
    price = data['purchasePrice']
    volume = data['shares']
    current_price = data['currentPrice']

    user = users.user_collection.find_one({'email': email})
    # print(data)
    if not user:
        return jsonify({"message": "User not found"})
    else:
        # add a new stock to the portfolio
        new_stock = Stock(symbol,email, price, volume, current_price)
        print(new_stock.__dict__,"awdawd")
        # Stock exists
        exist = prf_collection.find_one({'email': email, 'stocks.symbol': symbol})
        if exist:
            print("hiii")
            prf_collection.update_one({'email': email}, {'$push': {'stocks': new_stock.__dict__}})
        else:
            print("byee")
            prf_collection.insert_one(new_stock.__dict__)
        return jsonify({"message": "Stock added successfully"})
    

# Remove stock from portfolio Route
@prf_blueprint.route('/remove', methods=['POST'])
def remove():
    data = request.get_json()
    email = data['email']
    symbol = data['symbol']

    user = users.user_collection.find_one({'email': email})

    if not user:
        return jsonify({"message": "User not found"})
    else:
        # Check if the stock exists in the user's portfolio
        stock_to_remove = prf_collection.find_one({'email': email, 'symbol': symbol})
        
        if stock_to_remove:
            # Remove the stock from the portfolio collection
            prf_collection.delete_one({'email': email, 'symbol': symbol})
            return jsonify({"message": "Stock removed successfully"})
        else:
            return jsonify({"message": "Stock not found in the portfolio"})
