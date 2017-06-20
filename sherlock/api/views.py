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

from sherlock.api.models import Address
from sherlock.api.models import City
from sherlock.api.models import Country
from sherlock.api.models import Location
from sherlock.api.models import Price
from sherlock.api.models import Tour


mod = Blueprint('api', __name__)


#TODO(aleksandar-varga): More verbose add documentation and function response.

@mod.route('/tours', methods=['POST'])
#TODO(pseudonick47): Authentification required decorator.
def add_tour():
    """Add new tour."""

    req = request.get_json(force=True, silent=True)
    if req:

        tour = Tour(
            name=req['name'],
            guide_fee=req['guide_fee'],
            description=req['description']
        )

        for location in req['locations']:
            loc = db.session.query(Locaiton).filter_by(location['id']).one()
            loc.tours.append(tour)

        db.session.add(tour)
        db.session.commit()

        return jsonify('Succeeded')

    return jsonify('Failed')

@mod.route("/tours", methods=['GET'])
def get_tours():
    """Fetch all tours.

    Returns:
        JSON file containing id, name, description, guide_fee and location
        identifiers of all selected tours. For example:

        {
            [
                {
                    "id": 17,
                    "name": "Walk Through History",
                    "description": "Visit some of the finest castles and
                                    mansions in all of Europe.",
                    "guide_fee": 10,
                    "locations": [...]
                },
                {
                    "id": 17,
                    "name": "It's Time to Party",
                    "description": "Have a wonderful time with young and
                                    wicked people in Sydney's most spectacular
                                    night clubs.",
                    "guide_fee": 14,
                    "locations": [...]
                },
                ...
            ]
        }
    """
    response = []
    for tour in db.session.query(Tour).all():
        response.append(
            {
                'id': tour.oid,
                'name': tour.name,
                'description': tour.description,
                'guide_fee': tour.guide_fee,
                'locations': [location.oid for location in tour.locations]
            }
        )

    return jsonify(response)

@mod.route("/tours/<int:oid>", methods=['GET'])
def get_tour(oid):
    """Fetch tour corresponding to the given identifier.

    Returns:
        JSON file containing id, name, description, guide_fee and locaiton
        identifiers of selected tour. For example:

        {
            "id": 17,
            "name": "Walk Through History",
            "description": "Visit some of the finest castles and
                            mansions in all of Europe.",
            "guide_fee": 10,
            "locations": [...]
        }
    """
    response = {}
    tour = db.session.query(Tour).filter_by(oid=oid).one_or_none()
    if tour:
        response = {
            'id': tour.oid,
            'name': tour.name,
            'description': tour.description,
            'guide_fee': tour.guide_fee,
            'locations': [location.oid for location in tour.locations]
        }

    return jsonify(response)


@mod.route('/locations', methods=['POST'])
def add_location():
    """Add new location."""

    req = request.get_json(force=True, silent=True)
    if req:
        location = Location(
            name=req['name'],
            description=req['description'],
            address_id=req['address_id'] if req.has_key('address_id') else None,
            city_id=req['city_id'] if req.has_key('city_id') else None,
            country_id=req['country_id'] if req.has_key('country_id') else None
        )

        price = Price(location.oid, req['price'])

        db.session.add(location)
        db.session.add(price)
        db.session.commit()

        return jsonify("Succeeded")

    return jsonify("Failed")

@mod.route('/locations', methods=['GET'])
def get_locations():
    """Fetch all locations.

    Returns:
        JSON file containing id, name, description, price, address, city and
        country identifiers of all selected locations. For example:

        {
            [
                {
                    "id": 17,
                    "name": "Jovan Jovanovic Zmaj",
                    "description": "Gimnazija",
                    "price": 0,
                    "address_id": 17
                    "city_id": 1,
                    "country_id": 207
                },
                {
                    "id": 17,
                    "name": "Jovan Jovanovic Zmaj",
                    "description": "Gimnazija",
                    "price": 0,
                    "address_id": 522
                    "city_id": 52,
                    "country_id": 78
                },
                ...
            ]
        }
    """
    response = []
    for location in db.session.query(Location).all():
        response.append(
            {
                'id': location.oid,
                'name': location.name,
                'description': location.description,
                'price': location.price.amount,
                'address_id': location.address_id,
                'city_id': location.city_id,
                'country_id': location.counrty_id
            }
        )

    return jsonify(response)

@mod.route('/locations/<int:oid>', methods=['GET'])
def get_location(oid):
    """Fetch location corresponding to the given identifier.

    Returns:
        JSON file containing id, name, description, price, address, city and
        country identifiers of the selected location. For example:

        {
            "id": 17,
            "name": "Jovan Jovanovic Zmaj",
            "description": "Gimnazija",
            "price": 0,
            "address_id": 17
            "city_id": 1,
            "country_id": 207
        }
    """

    response = {}
    location = db.session.query(Location).filter_by(oid=oid).one_or_none()
    if location:
        response = {
            'id': location.oid,
            'name': location.name,
            'description': location.description,
            'price': location.price.amount,
            'address_id': location.address_id,
            'city_id': location.city_id,
            'country_id': location.counrty_id
        }

    return jsonify(response)

@mod.route('/addresses', methods=['POST'])
def add_address():
    """Add new location."""
    req = request.get_json(force=True, silent=True)
    if req:
        address = Address(
            street_name=req['street_name'],
            city_id=int(req['city_id']),
            number=req['number'] if req['number'] else ''
        )

        db.session.add(address)
        db.session.commit()

        return jsonify("Succeeded")

    return jsonify("Failed")


@mod.route('/addresses', methods=['GET'])
def get_addresses():
    """Fetch all addresses.

    Returns:
        JSON file containing id, street_name, city identifier and number of all
        addresses. For example:

        {
            [
                {
                    "id": 17,
                    "street_name": "Zlatne grede",
                    "city_id": 1,
                    "number": 4
                },
                {
                    "id": 522,
                    "street_name": "Champs Elysées",
                    "city_id": 52,
                    "number": 15
                },
                ...
            ]
        }
    """
    response = []
    for address in db.session.query(Address).all():
        response.append(
            {
                'id': address.oid,
                'street_name': address.street_name,
                'number': address.number,
                'city_id': address.city_id
            }
        )

    return jsonify(response)


@mod.route('/addresses/<int:oid>', methods=['GET'])
def get_address(oid):
    """Fetch one address.

    Returns:
        JSON file containing id, street_name, city identifier and number of the
        selected address. For example:

        {
            "id": 17,
            "street_name": "Zlatne grede",
            "number": 4,
            "city_id": 1
        }
    """
    address = db.session.query(Address).filter_by(oid=oid).one_or_none()

    response = {}
    if address:
        response = {
            'id': address.oid,
            'street_name': address.street_name,
            'number': address.number,
            'city_id': address.city_id
        }

    return jsonify(response)


@mod.route('/cities', methods=['POST'])
def add_city():
    """Adds new city."""

    req = request.get_json(force=True, silent=True)
    if req:
        city = City(
            name=req['name'],
            country_id=int(req['counrty_id'])
        )

        db.session.add(city)
        db.commit()

        return jsonify("Succeeded")

    return jsonify("Failed")

@mod.route('/cities', methods=['GET'])
def get_cities():
    """Fetch all cities.

    Returns:
        JSON file containing id, name, country identifier and addresses of all
        cities. For example:

        {
            [
                {
                    "id": 1,
                    "name": "Novi Sad",
                    "country_id": 207,
                    "addresses": [
                        {
                            "id": 17,
                            "street_name": "Zlatne grede",
                            "number": "4"
                        },
                        ...
                    ]
                },
                {
                    "id": 10,
                    "name": "New York",
                    "country_id": 249,
                    "addresses": [...]
                },
                ...
            ]
        }
    """

    response = []

    for city in db.session.guery(City).all():
        response.append(
            {
                'id': city.id,
                'name': city.name,
                'country_id': city.country_id,
                'addresses': [
                    {
                        'id': address.oid,
                        'street_name': address.street_name,
                        'number': address.number,
                    }
                    for address in city.addresses
                ]
            }
        )

    return jsonify(response)


@mod.route('/cities/<int:oid>', methods=['GET'])
def get_city(oid):
    """Fetches city corresponding to the given identifier.

    Returns:
        JSON file containing id, name, country identifier and addresses of the
        selected city. For example:

        {
            "id": 1,
            "name": "Novi Sad",
            "country_id": 1,
            "addresses": [
                {
                    "id": 17,
                    "street_name": "Zlatne grede",
                    "number": "4"
                },
                ...
            ]
        }
    """

    city = db.session.query(City).filter_by(oid=oid).one_or_none()

    response = {}
    if city:
        response = {
            'id': city.id,
            'name': city.name,
            'country_id': city.country_id,
            'addresses': [
                {
                    'id': address.oid,
                    'street_name': address.street_name,
                    'number': address.number,
                }
                for address in city.addresses
            ]
        }

        return jsonify(response)


@mod.route('/countries', methods=['POST'])
#TODO(pseudonick47): Authentification required decorator.
def add_country():
    """Adds new country.

    This function is reserved for administrators.

    All countries recognized by the UN, by the year 2017, are added before
    webapp deployement and this function is intended to allow the addition of
    new countries that could become new UN member states in the future.


    """
    req = request.get_json(force=True, silent=True)
    if req:
        country = Country(
            name=req['name'],
            continent=req['continent']
        )

        db.session.add(country)
        db.session.commit()

        return jsonify("Succeeded")

    return jsonify("Failed")

@mod.route('/countries', methods=['GET'])
def get_countries():
    """Fetches all countries.

    Returns:
        JSON file containing id, name and continent identifier fields of all
        countries. For example:

        {
            [
                {
                    "id": 207,
                    "name": "Serbia",
                    "continent": 5
                },
                {
                    "id": 107,
                    "name": "India",
                    "continent": 3
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
    """Fetches country corresponding to the given identifier.

    Args:
        oid: An int that is the unique identifier of a object to fetch.

    Returns:
        JSON file containing id, name and continent identifier fields of the
        selected country. For example:

        {
            "id": 207,
            "name": "Serbia",
            "continent": 5
        }

        If a requested country is not found, then return JSON file is empty.
#TODO(aleksandar): Test this claim.
    """

    country = db.session.query(Country).filter_by(oid=oid).one_or_none()

    response = {}
    if country:
        response = {
            'id': country.oid,
            'name': country.name,
            'continent': country.continent
        }

    return jsonify(response)
