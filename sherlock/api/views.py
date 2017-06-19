# -*- coding=utf-8 -*-
"""
    All entry points for API are defined here.

    Attributes:
        mod (Blueprint): Flask Blueprint object used to separate api from
                         website code.

"""


from flask import Blueprint
from flask import jsonify
from flask import request

from sherlock import db
from sherlock.api.models import Country
from sherlock.api.models import Continent


mod = Blueprint('api', __name__)


@mod.route("/tours", methods=['GET'])
#TODO(pseudonick47): Authentification required decorator.
def get_tours():
    """Fetches all tours from database.

    Returns:
        JSON file - all tours

    """

    response = []
    for tour in db.session.query(Tour).all():
        response.append(
            {
                'id': tour.id,
                'name': tour.name,
                'description': tour.description,
                'guide_fee': tour.guide_fee,
                'locations': [
                    {'name': location.name, 'id': location.id}
                    for location in tour.locations
                ]
            }
        )

    return jsonify(response)


@mod.route("/tours/<int:oid>", methods=['GET'])
#TODO(pseudonick47): Authentification required decorator.
def get_tour(oid):
    """
        Grabs requested tour and returns it in JSON format

        Returns:
            JSON file - tour

    """

    tour = db.session.query(Tour).filter_by(oid=oid).one()
    response = {
        'id': tour.id,
        'name': tour.name,
        'description': tour.description,
        'guide_fee': tour.guide_fee,
        'locations': [
            {'name': location.name, 'id': location.id}
            for location in tour.locations
        ]
    }

    return jsonify(response)


@mod.route('/locations', methods=['POST'])
#TODO(pseudonick47): Authentification required decorator.
def add_location():
    """Add new location.

    """
    pass

@mod.route('/locations', methods=['POST'])
#TODO(pseudonick47): Authentification required decorator.
def add_location():
    """Add new location.

    """
    pass

@mod.route('/cities', methods=['POST'])
def add_city():
    """Add new city.

    """

    pass


@mod.route('/countries', methods=['POST'])
#TODO(pseudonick47): Authentification required decorator.
def add_country():
    """Add new country.

    This function is reserved for administrators.

    All countries recognized by the UN, by the year 2017, are added before
    webapp deployement and this function is intended to allow the addition of
    new countries that could become new UN member states in the future.


    """

    country = Country(
        name=request['name'],
        continent=Continent(int(request['continent']))
    )

    db.session.add(country)
    db.session.commit()


@mod.route('/countries', methods=['GET'])
def get_countries():
    """Fetches all countries from database.

    Returns:
        JSON file containing name and continent identifier fields of all
        countries. For example:

        {
            [
                {
                    id: 1,
                    name: "Serbia",
                    continent: 5
                },
                {
                    id: 24,
                    name: "India",
                    continent: 3
                },
                ...
            ]
        }
    """

    response = []
    for country in db.session.query(Country).all():
        response.append(
            {
                'id': country.oid,
                'name': country.name,
                'continent': country.continent
            }
        )

    return jsonify(response)


@mod.route('/countries/<int:oid>', methods=['GET'])
def get_country(oid):
    """Fetches country identified by the given identifier from database.

    Args:
        oid: An int that is the unique identifier of a object to fetch.

    Returns:
        JSON file containing name and continent identifier fields of a
        country corresponding to given id. For example:

        {
            id: 1,
            name: "Serbia",
            continent: 5
        }

        If a requested country is not found, then return JSON file is empty.
#TODO(aleksandar): Test this claim.
    """

    response = {}
    country = db.session.query(Country).filter_by(oid=oid).one_or_none()
    if country:
        response = {
            'id': country.oid,
            'name': country.name,
            'continent': country.continent
        }

    return jsonify(response)
