"""
    Site routes

"""

from flask import Blueprint

mod = Blueprint('site', __name__)

@mod.route('/')
def homepage():
    """
        Homepage
        
    """

    return "Let's travel!"
