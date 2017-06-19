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
    Australia = 4
    Europe = 5
    NorthAmerica = 6
    SouthAmerica = 7

#TODO(all): Discuss posibility to add continent regions.


class Country(db.Model):
    """Database table representing countries.

    Atributes:
        oid (int): Unique identifier.
        name (str): Country name.
        continent (int): Continent identifier.
        cities (list): References to cities belonging to the country.

    """

    __tablename__ = 'countries'
    oid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
#TODO(aleksandar): Add Unique constraint on name
    continent = db.Column(db.Enum(Continent), nullable=False)
    cities = db.relationship('City', backref='country', lazy='dynamic')

    def __init__(self, name, continent):
        self.name = name
        self.continent = continent


class City(db.Model):
    __tablename__ = 'cities'
    oid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'),
                           nullable=False)
    addresses = db.relationship('Address', backref='city', lazy='dynamic')

    def __init__(self, name, country_id):
        self.name = name
        self.country_id = country_id


class Address(db.Model):
    __tablename__ = 'addresses'
    oid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    street_name = db.Column(db.Unicode, nullable=False)
    number = db.Column(db.Unicode)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'))

    def __init__(self, street_name, number='', city_id=None,
                 country_id=None):
        self.street_name = street_name
        self.number = number

        assert city_id is not None or country_id is not None


class Price(db.Model):
    __tablename__ = 'prices'
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'),
                            primary_key=True)
    amount = db.Column(db.Integer, nullable=False)

#TODO(all): Discuss limit_for_children.

    def __init__(self, location_id, amount):
        self.location_id = location_id
        self.amount = amount


class Location(db.Model):
    __tablename__ = 'locations'
    oid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    address_id = db.Column(db.ForeignKey('addresses.id'))
    city_id = db.Column(db.ForeignKey('cities.id'))
    country_id = db.Column(db.ForeignKey('countries.id'))
    price = db.relationship('Price', backref='location', lazy='dynamic')

#TODO(all): Discuss the idea to create a new class which would
#           describe what sort of activity would be done on a location.

    def __init__(self, name, description, address_id=None,
                 city_id=None, country_id=None):
        self.name = name
        self.description = description
        self.address_id = address_id
        self.city_id = city_id
        self.country_id = country_id

        assert address_id is not None or city_id is not None or \
               country_id is not None


tours_on_locations = db.Table(
    'tours_on_locations',
    db.Column('tour_id', db.Integer, db.ForeignKey('toures.id')),
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id'))
)


class Tour(db.Model):
    __tablename__ = 'toures'
    oid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    guide_fee = db.Column(db.Float, nullable=False)
    locations = db.relationship('Location', secondary=tours_on_locations,
                                backref='tours')

    def __init__(self, name, guide_fee, description=''):
        self.name = name
        self.guide_fee = guide_fee
        self.description = description
