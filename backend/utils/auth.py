from functools import wraps
from flask import Flask,request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from app import app, db
from models.data import Image

TWO_WEEKS = 1209600


def generate_token(user, expiration=TWO_WEEKS):
    s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)

    image = db.session.query(Image).filter_by(oid=user.image).one()

    token = s.dumps({
        'biography': user.biography,
        'dateOfBirth': user.dateOfBirth,
        'email': user.email,
        'id': user.id,
        'image': {
            'id': image.oid,
            'src': 'http://localhost:5000/static/' + image.file_name,
            'width': image.width,
            'height': image.height,
            'alt': 'image'
        },
        'name': user.first_name,
        'role': user.role,
        'surname': user.surname,
    }).decode('utf-8')
    return token


def verify_token(token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    return data


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify_token(string_token)
            if user:
                g.current_user = user
                return f(*args, **kwargs)

        return jsonify(message="Authentication is required to access this resource"), 401

    return decorated
