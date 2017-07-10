import os

dir = os.path.dirname(os.path.realpath(__file__))

class BaseConfig(object):
    SECRET_KEY = "SO_SECURE"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = True

class TestConfig(object):
    SECRET_KEY = "SO_SECURE"
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + dir + '/test.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = True