"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Faltan datos"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "El usuario ya existe"}), 409

    new_user = User(
        email=email,
        password=generate_password_hash(password),
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario creado exitosamente"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Credenciales invalidas"}), 401

    token = create_access_token(identity=user.id)
    return jsonify({"token": token}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private_area():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"message": f"Hola {user.email}, Bienvenido a la zona privada"}), 200
