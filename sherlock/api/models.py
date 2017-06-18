#!/usr/bin/env python3
# -*- coding=utf-8 -*-

import enum

from unittest import assertTrue

from sherlock import db


class Continent(enum.Enum):
    Europa = 1
    Asia = 2
    NorthAmerica = 3
    SouthAmerica = 4
    Africa = 5
    Australia = 6


#TODO: discuss posibility to add continent regions 


class Country(db.Model):
    __tablename__ = 'countries'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)    # TODO: unique constraint
    continent = db.Column(db.Enum(Continent), nullable=False)
    cities = db.relationship('cities', backref='country', lazy='dynamic')

    def __init__(self, name, continent):
        self.name = name
        self.continent = continent


class City(db.Model):
    __tablename__ = 'cities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'), 
                           nullable=False)
    addresses = db.relationship('addresses', backref='city', lazy='dynamic')

    def __init__(self, name, country_id):
        self.name = name
        self.country_id = country_id


class Address(db.Model):
    __tablename__ = 'addresses'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    street_name = db.Column(db.Unicode, nullable=False)
    number = db.Column(db.Unicode)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'))

    def __init__(self, street_name, number='', city_id=None, 
                 country_id=None):
        self.street_name = street_name
        self.number = number

        assertTrue(city_id or country_id)


class Location(db.Model):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    address_id = db.Column(db.ForeignKey('addresses.id'))
    city_id = db.Column(db.ForeignKey('cities.id'))
    country_id = db.Column(db.ForeignKey('countries.id'))
    price = db.relationship('prices', lazy='dynamic')

#TODO: discuss the idea to create a new class which would
# describe what sort of activity would be done on a location

    def __init__(self, name, description, address_id=None, 
                 city_id=None, country_id=None):
        self.name = name
        self.description = description
        self.address_id = address_id
        self.city_id = city_id
        self.country_id = country_id

        assertTrue(address_id or city_id or country_id)


class Price(db.Model):
    __tablename__ = 'prices'
    location_id = db.Column(db.Integer, db.ForeignKey('location.id'), 
                            primary_key=True)
    amount = db.Column(db.Integer, nullable=False)

# TODO: discuss limit_for_children

    def __init__(self, location_id, amount):
        self.location_id = location_id
        self.amount = amount


tours_on_locations = db.Table(
    db.Column('tour_id', db.Integer, db.ForeignKey('toures.id')),
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id'))
)


class Tour(db.Model):
    __tablename__ = 'toures'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    guied_fee = db.Column(db.Float, nullable=False)
    locations = db.relationship('locations', secondary=tours_on_locations, 
                                backref='tours')
    
    def __init__(self, name, guied_fee, description=''):
        self.name = name
        self.guied_fee = guied_fee
        self.description = description
