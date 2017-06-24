"""
    Site routes

"""

from flask import Blueprint
from flask import render_template

mod = Blueprint('site', __name__)

@mod.route('/')
def homepage():
    """Homepage"""

    return render_template('index.html')
