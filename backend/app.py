from flask import Flask, jsonify
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

from config import BaseConfig


app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app.config.from_object(BaseConfig)

db = SQLAlchemy(app)

bcrypt = Bcrypt(app)


from api.auth import mod as api_auth_mod
from api.data import mod as api_data_mod

@app.route('/api/tooo')
def arst():
    return jsonify([{'id':'artsa', 'description':'rstatras', 'name':'nameamrse', 'guide_fee':'tsra', 'locations':[]},{'id':'artsa', 'description':'rstatras', 'name':'nameamrse', 'guide_fee':'tsra', 'locations':[]}])

app.register_blueprint(api_auth_mod, url_prefix='/api')
app.register_blueprint(api_data_mod, url_prefix='/api')
