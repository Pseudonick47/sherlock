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

from sherlock import db


class Continent(enum.Enum):
    """Enumeration of continents."""

    Africa = 1
    Antartica = 2
    Asia = 3
    AustraliaOceania = 4
    Europe = 5
    NorthAmerica = 6
    SouthAmerica = 7

#TODO(all): Discuss posibility to add continent regions.


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
        country: Reference to a country in which the city is located.
    """

    __tablename__ = 'cities'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'),
                           nullable=False)

    def __init__(self, name, country_id):
        self.name = name
        self.country_id = country_id


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
    """

    __tablename__ = 'locations'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    city_id = db.Column(db.ForeignKey('cities.id'))
    country_id = db.Column(db.ForeignKey('countries.id'))
    price = db.relationship('Price', backref='location', lazy='dynamic')
    city = db.relationship('City', backref='locations')
    country = db.relationship('Country', backref='locations')

    def __init__(self, name, description, city_id=None, country_id=None):
        self.name = name
        self.description = description
        self.city_id = city_id
        self.country_id = country_id


tours_on_locations = db.Table(
    'tours_on_locations',
    db.Column('tour_id', db.Integer, db.ForeignKey('toures.id')),
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id'))
)


class Tour(db.Model):
    """SQLAlchemy table representing tour.

    Attributes:
        oid (int): Unique identifier.
        name (str): Tour name.
        description (str): Tour description.
        guide_fee (float): Fee that guide demands for organizing tours.
        locations (list): References to locations that will be visited by the
                          participants of the tour.
    """

    __tablename__ = 'toures'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    guide_fee = db.Column(db.Float, nullable=False)
    locations = db.relationship('Location', secondary=tours_on_locations,
                                backref='tours')

    def __init__(self, name, guide_fee, description=''):
        self.name = name
        self.guide_fee = guide_fee
        self.description = description
