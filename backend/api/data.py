# -*- coding=utf-8 -*-
"""
    All entry points for API are defined here.

    Attributes:
        mod (Blueprint): Flask Blueprint object used to separate api from
                         website code.

"""

from flask import Blueprint, request
from flask_restful import Api, Resource
import os
from datetime import datetime

from app import db
from models.data import City, Country, Location, Price, Tour, Image, Comment
from models.users import User

mod = Blueprint('api/data', __name__)
api = Api(mod)


class TourAPI(Resource):
    """Services that allow user to get, update or delete tour identified
       with the given key.
    """

    def put(self, oid):
        """Update already existing tour.

        Request should be formated as JSON file. For example:

            {
                "name": "",
                "description": "",
                "guide_fee": 10.25,
                "locations": [2, 51, 16, 43]
            }

        Available fields are:
            name (str), description (str), guide_fee (float),
            locations (list of integers)

        Fields can be omitted.

        Returns:
            JSON file. For example:

            Update succeeded

                {
                    "success": true
                }

            Update failed

                {
                    "success": false,
                    "message": "Field name incorrect"
                }
        """

        req = request.get_json(force=True, silent=True)
        if req:
            tour = db.session.query(Tour).filter_by(oid=oid,).one_or_none()
            if not tour:
                return ({'success':False,
                         'message':'Specified tour not found.'}, 404)

            for key in req.keys():
                if key == 'locations':
                    for location in req['locations']:
                        loc = db.session.query(Location).filter_by(oid=location,).one()
                        loc.tours.append(tour)

                elif hasattr(tour, key):
                    setattr(tour, key, req[key])
                else:
                    return ({'success':False, 'message':'Field name incorrect'},
                            400)

            db.session.commit()
            return ({'success': True}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

    def get(self, oid):
        """Fetch tour corresponding to the given identifier.

        Returns:
            JSON file containing id, name, description, guide_fee and location
            identifiers of selected tour. For example:

                {
                    "id": 17,
                    "name": "Walk Through History",
                    "description": "Visit some of the finest castles and
                                    mansions in all of Europe.",
                    "guide_fee": 10,
                    "locations": [...]
                }

            If a requested tour is not found, then JSON file has an empty
            object.
        """

        response = {}
        tour = db.session.query(Tour).filter_by(oid=oid,).one_or_none()
        if tour:
            response = {
                'id':tour.oid,
                'name':tour.name,
                'description':tour.description,
                'guide_fee':tour.guide_fee,
                'locations':[
                    {'id': location.oid, 'name': location.name} for location in tour.locations],
                'photos': [
                    {
                        'src': 'http://tilda.center/static/images/album-tilda/01a.jpg',
                        'width': 1680,
                        'height': 1050,
                        'alt': 'image 1'
                    } 
                ],
                'rating': 3,
                'commentIds': [1]
            }

            return (response, 200)

        return (response, 404)

    def delete(self, oid):
        """Delete tour corresponding to the given identifier.

        Returns:
            JSON file. For example:

            Deletion succeeded

                {
                    "success": true
                }

            Deletion failed

                {
                    "success": false,
                    "message": "Specified tour not found"
                }
        """

        num = db.session.query(Tour).filter_by(oid=oid,).delete()
        if num:
            return ({'success': True}, 200)

        return ({'success':False,
                 'message':'Specified tour not found'}, 404)


class TourListAPI(Resource):
    """Services that allow user to get all tours or to add new tour."""

    def post(self):
        """Add new tour.

        Request should be formated as JSON file. For example:

            {
                "name": "",
                "description": "",
                "guide_fee": 10.25,
                "locations": [2, 51, 16, 43]
            }

        Returns:
            JSON file. For example:

            Addition succeeded

                {
                    "success": true
                }

            Addition failed

                {
                    "success": false,
                    "message": "Not JSON"
                }
        """

        req = request.get_json(force=True, silent=True)
        if req:
            tour = Tour(
                name=req['name'],
                guide_fee=req['guide_fee'],
                description=req['description']
            )

            for location in req['locations']:
                loc = db.session.query(Location).filter_by(oid=location,).one()
                loc.tours.append(tour)

            db.session.add(tour)
            db.session.commit()

            return ({'success': True}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

    def get(self):
        """Fetch all tours.

        Returns:
            JSON file containing id, name, description, guide_fee and location
            identifiers of all selected tours. For example:

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
                                        wicked people in Sydney's most
                                        spectacular night clubs.",
                        "guide_fee": 14,
                        "locations": [...]
                    },
                    ...
                ]

            If database is not populated, then JSON file has an empty array.
        """

        response = []
        for tour in db.session.query(Tour).all():
            response.append(
                {
                    'id':tour.oid,
                    'name':tour.name,
                    'description':tour.description,
                    'guide_fee':tour.guide_fee,
                    'locations':[location.oid for location in tour.locations]
                }
            )

        return (response, 200)


class LocationAPI(Resource):
    """Services that allow user to get, update or delete location identified
       with the given key.
    """

    def put(self, oid):
        """Update already existing location.

        Request should be formated as JSON file. For example:

            {
                "name": "",
                "description": "",
                "city_id": 2,
                "country_id: 4,
                "price": 10.25
            }

        Available fields are:
            name (str), description (str), city_id (int), country_id (int)

        Fields can be omitted.

        Returns:
            JSON file. For example:

            Update succeeded

                {
                    "success": true
                }

            Update failed

                {
                    "success": false,
                    "message": "Field name incorrect"
                }

        """

        req = request.get_json(force=True, silent=True)
        if req:
            location = db.session.query(Location).filter_by(oid=oid,).one_or_none()
            if not location:
                return ({'success':False,
                         'message':'Specified location not found.'}, 404)

            for key in req.keys():
                if key == 'price':
                    location.price.amount = req[key]
                elif hasattr(location, key):
                    setattr(location, key, req[key])
                else:
                    return ({'success':False,
                             'message':'Field name incorrect'}, 400)

            db.session.commit()

            return ({'success': True}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

    def get(self, oid):
        """Fetch location corresponding to the given identifier.

        Returns:
            JSON file containing id, name, description, price, city and
            country identifiers of the selected location. For example:

                {
                    "id": 17,
                    "name": "Jovan Jovanovic Zmaj",
                    "description": "Gimnazija",
                    "price": 0,
                    "city_id": 1,
                    "country_id": 207
                }

            If a requested location is not found, then JSON file has an empty
            object.
        """

        response = {}
        location = db.session.query(Location).filter_by(oid=oid,).one_or_none()
        if location:
            response = {
                'id':location.oid,
                'name':location.name,
                'description':location.description,
                'price':location.price.amount,
                'city_id':location.city_id,
                'country_id':location.country_id
            }

            return (response, 200)

        return (response, 404)

    def delete(self, oid):
        """Delete location corresponding to the given identifier.

        Returns:
            JSON file. For example:

            Deletion succeeded

                {
                    "success": true
                }

            Deletion failed

                {
                    "success": false,
                    "message": "Specified location not found"
                }
        """

        num = db.session.query(Location).filter_by(oid=oid,).delete()
        if num:
            return ({'success': True}, 200)

        return ({'success':False,
                 'message':'Specified location not found'}, 404)


class LocationListAPI(Resource):
    """Services that allow user to get all locations or to add new tour."""

    def post(self):
        """Add new location.

        Request should be formated as JSON file. For example:

            {
                "name": "",
                "description": "",
                "city_id": 2,
                "country_id: 4,
                "price": 10.25
            }

        Returns:
            JSON file. For example:

            Addition succeeded

                {
                    "success": true
                }

            Addition failed

                {
                    "success": false,
                    "message": "Not JSON"
                }
        """

        req = request.get_json(force=True, silent=True)
        if req:
            location = Location(
                name=req['name'],
                description=req['description'],
                city_id=req['city_id'] if req.has_key('city_id') else None,
                country_id=req['country_id']
                if req.has_key('country_id') else None
            )

            price = Price(location.oid, req['price'])

            db.session.add(location)
            db.session.add(price)
            db.session.commit()

            return ({'success': True}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

    def get(self):
        """Fetch all locations.

        Returns:
            JSON file containing id, name, description, price, city and
            country identifiers of all selected locations. For example:

                [
                    {
                        "id": 17,
                        "name": "Jovan Jovanovic Zmaj",
                        "description": "Gimnazija",
                        "price": 0,
                        "city_id": 1,
                        "country_id": 207
                    },
                    {
                        "id": 17,
                        "name": "Jovan Jovanovic Zmaj",
                        "description": "Gimnazija",
                        "price": 0,
                        "city_id": 52,
                        "country_id": 78
                    },
                    ...
                ]

            If database is not populated, then JSON file has an empty array.
        """

        response = []
        for location in db.session.query(Location).all():
            response.append(
                {
                    'id':location.oid,
                    'name':location.name,
                    'description':location.description,
                    'price':location.price.amount,
                    'city_id':location.city_id,
                    'country_id':location.country_id
                }
            )

        return (response, 200)


class CityAPI(Resource):
    """Services that allow user to get, update or delete city identified
       with the given key.
    """

    def put(self, oid):
        """Update already existing city.

        Request should be formated as JSON file. For example:

            {
                "name": "",
                "country_id: 4
            }

        Available fields are:
            name (str), country_id (int)

        Fields can be omitted.

        Returns:
            JSON file. For example:

            Update succeeded

                {
                    "success": true
                }

            Update failed

                {
                    "success": false,
                    "message": "Field name incorrect"
                }
        """

        req = request.get_json(force=True, silent=True)
        if req:
            city = db.session.query(City).filter_by(oid=oid,).one_or_none()
            if not city:
                return ({'success':False,
                         'message':'Specified city not found.'}, 404)

            for key in req.keys():
                if hasattr(city, key):
                    setattr(city, key, req[key])
                else:
                    return ({'success':False,
                             'message':'Field name incorrect'}, 400)

            db.session.commit()

            return ({'success': True}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

    def get(self, oid):
        """Fetches city corresponding to the given identifier.

        Returns:
            JSON file containing id, name, country identifier and addresses of
            the selected city. For example:

                {
                    "id": 1,
                    "name": "Novi Sad",
                    "country_id": 1
                }

            If a requested city is not found, then JSON file has empty object.
        """

        city = db.session.query(City).filter_by(oid=oid,).one_or_none()
        response = {}
        if city:
            response = {
                'id':city.id,
                'name':city.name,
                'country_id':city.country_id
            }
            return (response, 200)

        return (response, 404)

    def delete(self, oid):
        """Delete city corresponding to the given identifier.

        Returns:
            JSON file. For example:

            Deletion succeeded

                {
                    "success": true
                }

            Deletion failed

                {
                    "success": false,
                    "message": "Specified city not found"
                }
        """

        num = db.session.query(City).filter_by(oid=oid,).delete()
        if num:
            return ({'success': True}, 200)

        return ({'success':False,
                 'message':'Specified city not found'}, 404)


class CityListAPI(Resource):
    """Services that allow user to get all cities or to add new tour."""

    def post(self):
        """Adds new city.

        Request should be formated as JSON file. For example:

            {
                "name": "",
                "country_id": 10
            }

        Returns:
            JSON file. For example:

            Addition succeeded

                {
                    "success": true
                }

            Addition failed

                {
                    "success": false,
                    "message": "Not JSON"
                }
        """

        req = request.get_json(force=True, silent=True)
        if req:
            city = City(name=req['name'], country_id=int(req['country_id']),)

            db.session.add(city)
            db.commit()

            return ({'success': True}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

    def get(self):
        """Fetch all cities.

        Returns:
            JSON file containing id, name, country identifier and addresses of
            all cities. For example:

                [
                    {
                        "id": 1,
                        "name": "Novi Sad",
                        "country_id": 207
                    },
                    {
                        "id": 10,
                        "name": "New York",
                        "country_id": 249
                    },
                    ...
                ]

            If a requested city is not found, then JSON file has an empty array.
        """

        response = []
        for city in db.session.query(City).all():
            response.append(
                {
                    'id':city.id,
                    'name':city.name,
                    'country_id':city.country_id
                }
            )

        return (response, 200)


class CountryAPI(Resource):
    """Services that allow user to get, update or delete country identified
       with the given key.
    """

    def put(self, oid):
        """Update already existing country.

        Request should be formated as JSON file. For example:

            {
                "name": "",
            }

        Available fields are:
            name (str)

        Fields can be omitted.

        Returns:
            JSON file. For example:

            Update succeeded

                {
                    "success": true
                }

            Update failed

                {
                    "success": false,
                    "message": "Field name incorrect"
                }

        """

        req = request.get_json(force=True, silent=True)
        if req:
            country = db.session.query(Country).filter_by(oid=oid,).one_or_none()
            if not country:
                return ({'success':False,
                         'message':'Specified country not found.'}, 404)

            for key in req.keys():
                if hasattr(country, key):
                    setattr(country, key, req[key])
                else:
                    return ({'success':False,
                             'message':'Field name incorrect'}, 400)

            db.session.commit()

            return ({'success': True}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

    def get(self, oid):
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

            If a requested country is not found, then JSON file has an empty
            object.
        """

        country = db.session.query(Country).filter_by(oid=oid,).one_or_none()

        response = {}
        if country:
            response = {
                'id':country.oid,
                'name':country.name,
                'continent':country.continent
            }

            return (response, 200)

        return (response, 404)

    def delete(self, oid):
        """Delete country corresponding to the given identifier.

        Returns:
            JSON file. For example:

            Deletion succeeded

                {
                    "success": true
                }

            Deletion failed

                {
                    "success": false,
                    "message": "Specified country not found"
                }
        """

        num = db.session.query(Country).filter_by(oid=oid,).delete()
        if num:
            return ({'success': True}, 200)

        return ({'success':False,
                 'message':'Specified country not found'}, 404)


class CountryListAPI(Resource):
    """Services that allow user to get all countries or to add new tour."""

    def post(self):
        """Adds new country.

        This function is reserved for administrators.

        All countries recognized by the UN, by the year 2017, are added before
        webapp deployment and this function is intended to allow the addition
        of new countries that could become new UN member states in the future.

        Request should be formated as JSON file. For example:

            {
                "name": "",
                "continent": 1,
            }

        Returns:
            JSON file. For example:

            Addition succeeded

                {
                    "success": true
                }

            Addition failed

                {
                    "success": false,
                    "message": "Field name incorrect"
                }
        """

        req = request.get_json(force=True, silent=True)
        if req:
            country = Country(name=req['name'], continent=req['continent'])

            db.session.add(country)
            db.session.commit()

            return ({'success': True}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

    def get(self):
        """Fetches all countries.

        Returns:
            JSON file containing id, name and continent identifier fields of all
            countries. For example:

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

            If database is not populated, then JSON file has an empty array.
        """

        response = []
        for country in db.session.query(Country).all():
            response.append(
                {
                    'id':country.oid,
                    'name':country.name,
                    'continent':country.continent
                }
            )

        return (response, 200)

class FilesAPI(Resource):
    def post(self):
        UPLOAD_FOLDER = '../static'
        image_ids = []
        for fi in request.files:
            extension = request.files[fi].filename.split('.')[-1]
            filename = datetime.now().strftime("%d_%m_%Y_%H_%M_%S_%f" + '.' + extension)
            request.files[fi].save(os.path.join(UPLOAD_FOLDER, filename))
            image = Image(filename)
            db.session.add(image)
            db.session.commit()
            image_ids.append(image.oid)
        return (image_ids)


class CommentAPI(Resource):
    """Services that allow user to get, post or delete comment
       with the given key.
    """

    def get(self, oid):
        """Fetch comment corresponding to the given identifier.

        Returns:
            JSON file containing id, name, description, guide_fee and location
            identifiers of selected tour. For example:

                {
                    "id": 17,
                    "name": "Walk Through History",
                    "description": "Visit some of the finest castles and
                                    mansions in all of Europe.",
                    "guide_fee": 10,
                    "locations": [...]
                }

            If a requested tour is not found, then JSON file has an empty
            object.
        """

        response = {}
        comment = db.session.query(Comment).filter_by(oid=oid,).one_or_none()
        if comment:
            user = db.session.query(User).filter_by(id=comment.user_id).one()
            response = {
                'comment': comment.text,
                'userId': user.id,
                'userName': user.email,
                'userPhoto': " ",
                'likes': 0,
                'dislikes': 0,
                'current': 0
            }

            return (response, 200)

        return (response, 404)


api.add_resource(TourListAPI, '/tours')
api.add_resource(TourAPI, '/tours/<int:oid>')
api.add_resource(LocationListAPI, '/locations')
api.add_resource(LocationAPI, '/locations/<int:oid>')
api.add_resource(CityListAPI, '/cities')
api.add_resource(CityAPI, '/cities/<int:oid>')
api.add_resource(CountryListAPI, '/countries')
api.add_resource(CountryAPI, '/countries/<int:oid>')
api.add_resource(FilesAPI, '/upload')
api.add_resource(CommentAPI, '/comment/<int:oid>')
