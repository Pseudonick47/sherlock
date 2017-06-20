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

    Atributes:
        oid (int): Unique identifier.
        name (str): Country name.
        continent (int): Continent identifier.
        cities (list): References to cities belonging to the country.
    """

    __tablename__ = 'countries'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
#TODO(aleksandar-varga): Add Unique constraint on name
    continent = db.Column(db.Integer, nullable=False)
    cities = db.relationship('City', backref='country', lazy='dynamic')

    def __init__(self, name, continent):

        assert name

        self.name = name
        self.continent = continent



class City(db.Model):
    """SQLAlchemy table representing cities.

    Atributes:
        oid (int): Unique identifier.
        name (str): City name.
        country_id (int): Country identifier in which the city is located.
        country: Reference to a country in which the city is located.
        addresses (list): References to addresses belonging to the city.
    """

    __tablename__ = 'cities'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'),
                           nullable=False)
    addresses = db.relationship('Address', backref='city', lazy='dynamic')

    def __init__(self, name, country_id):

        assert name

        self.name = name
        self.country_id = country_id

#TODO(all): Discuss eliminating addresses.

class Address(db.Model):
    """SQLAlchemy table representing addresses.

    Atributes:
        oid (int): Unique identifier.
        street_name (str): Street name.
        number (str): Building identifier.
        city_id (int): City identifier to which the address belongs to.
        city (City): Reference to a city to which the address belongs to.
    """

    __tablename__ = 'addresses'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    street_name = db.Column(db.Unicode, nullable=False)
    number = db.Column(db.Unicode)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'))

    def __init__(self, street_name, city_id, number=''):

        assert street_name
        assert city_id is not None

        self.street_name = street_name
        self.number = number

#TODO(aleksandar-varga): Finish docs.

class Price(db.Model):
    __tablename__ = 'prices'
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'),
                            primary_key=True)
    amount = db.Column(db.Integer, nullable=False)

#TODO(all): Discuss limit_for_children.

    def __init__(self, location_id, amount):

        assert amount

        self.location_id = location_id
        self.amount = amount


class Location(db.Model):
    """SQLAlchemy table representing locations.

    Atributes:
        oid (int): Unique identifier.
        name (str): Location name.
        description (str): Location description.
        city_id (int): City identifier to which the address belongs to.
        city (City): Reference to a city to which the address belongs to.
    """

    __tablename__ = 'locations'
    oid = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    address_id = db.Column(db.ForeignKey('addresses.id'))
    city_id = db.Column(db.ForeignKey('cities.id'))
    country_id = db.Column(db.ForeignKey('countries.id'))
    price = db.relationship('Price', backref='location', lazy='dynamic')
    address = db.relationship('Address', backref='locations')
    city = db.relationship('City', backref='locations')
    country = db.relationship('Country', backref='locations')

#TODO(all): Discuss the idea to create a new class which would
#           describe what sort of activity would be done on a location.

    def __init__(self, name, description, address_id=None,
                 city_id=None, country_id=None):
        
        # at least one of these informations must be provided
        assert address_id or city_id or country_id

#TODO(aleksandar-varga): Check if provided address is in the provided city
#TODO(aleksandar-varga): Check if provided city is in the provided country

        self.name = name
        self.description = description
        self.address_id = address_id
        self.city_id = city_id
        self.country_id = country_id


tours_on_locations = db.Table(
    'tours_on_locations',
    db.Column('tour_id', db.Integer, db.ForeignKey('toures.id')),
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id'))
)


class Tour(db.Model):
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
