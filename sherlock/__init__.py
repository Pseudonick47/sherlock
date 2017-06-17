"""
    Init applicaiton and register blueprints

"""

from sherlock.site.views import mod as site_mod
from sherlock.api.views import mod as api_mod

from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/sherlock'

app.register_blueprint(site_mod)
app.register_blueprint(api_mod, url_prefix='/api')
