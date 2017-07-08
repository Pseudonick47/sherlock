# -*- coding=utf-8 -*-
"""
    Module contains data models used by the API.

    SQLAlchemy is the ORM of choice for this project so many of the data models
    are derivatives of the flask.ext.sqlalchemy.Model class.All of those
    classes have corresponding tables in a database.

    Note:
        Field name oid stands for "object id" and is used as a replacement for
        ambiguous field name id. (id is a built-in function)

"""


import enum

from app import db
#from models.users import User


images_of_locations = db.Table(
    'images_of_locations',
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id')),
    db.Column('image_id', db.Integer, db.ForeignKey('images.id'))
)

images_of_tours = db.Table(
    'images_of_tours',
    db.Column('tour_id', db.Integer, db.ForeignKey('tours.id')),
    db.Column('image_id', db.Integer, db.ForeignKey('images.id'))
)

images_of_cities = db.Table(
    'images_of_cities',
    db.Column('city_id', db.Integer, db.ForeignKey('cities.id')),
    db.Column('image_id', db.Integer, db.ForeignKey('images.id'))
)


tours_on_locations = db.Table(
    'tours_on_locations',
    db.Column('tour_id', db.Integer, db.ForeignKey('tours.id')),
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id'))
)


class Continent(enum.Enum):
    """Enumeration of continents."""

    Africa = 1
    Antartica = 2
    Asia = 3
    AustraliaOceania = 4
    Europe = 5
    NorthAmerica = 6
    SouthAmerica = 7

#TODO(all): Discuss possibility to add continent regions.


class Country(db.Model):
    """SQLAlchemy table representing countries.

    Attributes:
        oid (int): Unique identifier.
        name (str): Country name.
        continent (int): Continent identifier.
        cities (list): References to cities belonging to the country.
    """

    __tablename__ = 'countries'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False) #, unique=True)
    continent = db.Column(db.Integer, nullable=False)
    cities = db.relationship('City', backref='country', lazy='dynamic')

    def __init__(self, name, continent):
        self.name = name
        self.continent = continent



class City(db.Model):
    """SQLAlchemy table representing cities.

    Attributes:
        oid (int): Unique identifier.
        name (str): City name.
        country_id (int): Country identifier in which the city is located.
        thumbnail_id (int): Thumbnail image identifier.
        images (list): References to images that belong to the city.
    """

    __tablename__ = 'cities'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'),
                           nullable=False)
    thumbnail_id = db.Column(db.ForeignKey('images.id'), nullable=True)
    images = db.relationship('Image', secondary=images_of_cities)

    def __init__(self, name, country_id, thumbnail_id=None):
        self.name = name
        self.country_id = country_id
        self.thumbnail_id = thumbnail_id


class Price(db.Model):

    """SQLAlchemy table representing addresses.

    Attributes:
        location_id (int): Reference to the location whice price describes. It
                           is also an unique identifier of the price.
        amount (float): Amount of money that is requested.
    """
    __tablename__ = 'prices'
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'),
                            primary_key=True)
    amount = db.Column(db.Float, nullable=False)

#TODO(all): Discuss limit_for_children.

    def __init__(self, location_id, amount):
        self.location_id = location_id
        self.amount = amount


#TODO(all): Discuss the idea to create a new class which would
#           describe what sort of activity would be done on a location.

class Location(db.Model):
    """SQLAlchemy table representing locations.

    Attributes:
        oid (int): Unique identifier.
        name (str): Location name.
        description (str): Location description.
        price (Price): Reference to the price object belonging to the location.
        city_id (int): City identifier to which the location belongs to.
        city (City): Reference to a city to which the location belongs to.
        country_id (int): Country identifier to which the location belongs to.
        country (Country): Reference to a city to which the location belongs to.
        thumbnail_id (int): Thumbnail image identifier.
        images (list): References to images that belong to the location.
    """

    __tablename__ = 'locations'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    city_id = db.Column(db.ForeignKey('cities.id'))
    country_id = db.Column(db.ForeignKey('countries.id'))
    thumbnail_id = db.Column(db.ForeignKey('images.id'))
    price = db.relationship('Price', backref='location', lazy='dynamic')
    city = db.relationship('City', backref='locations')
    country = db.relationship('Country', backref='locations')
    images = db.relationship('Image', secondary=images_of_locations)

    def __init__(self, name, description, city_id=None, country_id=None, thumbnail_id=None):
        self.name = name
        self.description = description
        self.city_id = city_id
        self.country_id = country_id
        self.thumbnail_id = thumbnail_id

comments_on_tour = db.Table(
    'comments_on_tour',
    db.Column('comment_id', db.Integer, db.ForeignKey('comments.id')),
    db.Column('tour_id', db.Integer, db.ForeignKey('tours.id')),

)

images_of_user = db.Table(
    'images_of_user',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('image_id', db.Integer, db.ForeignKey('images.id')),
)

class Comment(db.Model):
    """SQLAlchemy table representing comments.

    """
    __tablename__ = 'comments'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    text = db.Column('text', db.Unicode)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.id'))


class Tour(db.Model):
    """SQLAlchemy table representing tour.

    Attributes:
        oid (int): Unique identifier.
        name (str): Tour name.
        description (str): Tour description.
        guide_fee (float): Fee that guide demands for organizing tours.
        thumbnail_id (int): Thumbnail image identifier.
        locations (list): References to locations that will be visited by the
                          participants of the tour.
        images (list): References to images that belong to the tour.
    """

    __tablename__ = 'tours'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    guide_fee = db.Column(db.Float, nullable=False)
    thumbnail_id = db.Column(db.ForeignKey('images.id'))
    locations = db.relationship('Location', secondary=tours_on_locations,
                                backref='tours')
    images = db.relationship('Image', secondary=images_of_tours)
    comments = db.relationship('Comment', secondary=comments_on_tour, backref='tours')
    specific_tours = db.relationship('SpecificTour', backref='tour')
    ratings = db.relationship('Rating', backref='tours')

    def __init__(self, name, guide_fee, description='', thumbnail_id=None):
        self.name = name
        self.guide_fee = guide_fee
        self.description = description
        self.thumbnail_id = thumbnail_id


class Image(db.Model):
    """SQLAlchemy table representing images.

    Attributes:
        oid (int): Unique identifier.
        file_name (str): Name of the file as it is stored on the server.
    """

    __tablename__ = 'images'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    file_name = db.Column(db.Unicode, nullable=False, unique=True)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)

    def __init__(self, file_name, width, height):
        self.file_name = file_name
        self.width = width
        self.height = height


class Payment(db.Model):
    """SQLAlchemy table representing payments for specific tours.
    """

    __tablename__ = "payments"
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Float, nullable=False)
    specific_tour_id = db.Column(
        db.Integer(), db.ForeignKey('specific_tours.id'))

    def __init__(self, amount):
        self.amount = amount


class SpecificTour(db.Model):
    """SQLAlchemy table representing specific tours.

    """

    __tablename__ = 'specific_tours'
    oid = db.Column('id', db.Integer, primary_key=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    tour_id = db.Column(db.ForeignKey('tours.id'))

    def __init__(self, start_date, end_date, tour_id):
        self.start_date = start_date
        self.end_date = end_date
        self.tour_id = tour_id

class Rating(db.Model):
    __tablename__ = 'ratings'
    user = db.Column(db.ForeignKey('user.id'), primary_key=True)
    tour = db.Column(db.ForeignKey('tours.id'), primary_key=True)
    rating = db.Column('rating', db.Integer)

    def __init__(self, user_id, tour_id, rating):
        self.user = user_id
        self.tour = tour_id
        self.rating = rating

