from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from random import randint
from config import BaseConfig

app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)

from models.users import User
from models.data import City, Continent, Country, Location, Tour, Price, Comment, SpecificTour, Payment, Image

db.create_all()
db.session.commit()

from api.auth import mod as api_auth_mod
from api.data import mod as api_data_mod

app.register_blueprint(api_auth_mod, url_prefix='/api')
app.register_blueprint(api_data_mod, url_prefix='/api')

@app.route('/static/<file_name>', methods=['GET'])
def get_static_file(file_name):
    return send_from_directory('../static', file_name)
