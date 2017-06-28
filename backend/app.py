from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from random import randint
from config import BaseConfig

app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)

from models.users import User

db.create_all()
db.session.commit()

from api.auth import mod as api_auth_mod
from api.data import mod as api_data_mod

@app.route('/api/tooo')
def arst():
    ret = []
    for i in range(randint(1,6)):
        rand = randint(2, 50)
        ret.append({'id':str(rand), 'description':'Some very long desc about tour no ' + str(rand), 'name':'Name of ' + str(rand), 'guide_fee': str(rand * rand - rand), 'locations':[]})
    return jsonify(ret)

app.register_blueprint(api_auth_mod, url_prefix='/api')
app.register_blueprint(api_data_mod, url_prefix='/api')
