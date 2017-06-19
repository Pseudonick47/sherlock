"""
    Init applicaiton and register blueprints.

    Attributes:
        app (Flask): Flash application.
        db (SQLAlchemy): SQLAlchemy database connection.

"""


from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://aleksandar:ftn@localhost/sherlock'
db = SQLAlchemy(app)

from sherlock.site.views import mod as site_mod
from sherlock.api.views import mod as api_mod

app.register_blueprint(site_mod)
app.register_blueprint(api_mod, url_prefix='/api')
