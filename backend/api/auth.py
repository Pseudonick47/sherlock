from flask import Blueprint, jsonify, render_template, request, g
from sqlalchemy.exc import IntegrityError

from app import db
from models.users import User
from models.data import Image
from utils.auth import generate_token, requires_auth, verify_token

mod = Blueprint('api/auth', __name__)


@mod.route("/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@mod.route("/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    print(incoming["role"])
    user = User(
        email=incoming["email"],
        password=incoming["password"],
		first_name=incoming["first_name"],
		surname=incoming["surname"],
		role=incoming["role"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@mod.route("/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        image = db.session.query(Image).filter_by(oid=user.image,).one_or_none()
        user.image = "http://localhost:5000/static/" + image.file_name
        return jsonify({'token': generate_token(user)})

    return jsonify(error=True), 403


@mod.route("/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
