"""
    Api routes

"""


from flask import Blueprint


mod = Blueprint('api', __name__)

@mod.route("/hi")
def say_hi():
    """
        Say hi
    """

    return "<h1>Hi!</h1>"
