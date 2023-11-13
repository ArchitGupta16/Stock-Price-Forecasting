import Routes.db as db
from flask import request, jsonify, Blueprint
from flask_bcrypt import Bcrypt

user_blueprint = Blueprint("user", __name__)
bcrypt = Bcrypt()
user_collection = db.database['users'] 

class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

# login Route
@user_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = user_collection.find_one({'email': email})
    if not user:
        return jsonify({"message": "User not found"})

    if bcrypt.check_password_hash(user['password'], password):
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Incorrect password"})

@user_blueprint.route('/glogin', methods=['POST'])
def glogin():
    data = request.get_json()
    email = data['email']

    user = user_collection.find_one({'email': email})
    if not user:
        return jsonify({"message": "User not found"})
    else:
        return jsonify({"message": "Login successful"})
    
# Get all users Route
@user_blueprint.route('/getusers', methods=['GET'])
def get_users():
    users = list(user_collection.find({}))
    return jsonify({"users": users})

# Register Route
@user_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    # Check if the user already exists
    existing_user = user_collection.find_one({'email': email})

    if existing_user:
        return jsonify({"message": "User with this email already exists"})

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a User object and insert it into the database
    new_user = User(name, email, hashed_password)
    user_collection.insert_one(new_user.__dict__)

    return jsonify({"message": "User registered successfully"})