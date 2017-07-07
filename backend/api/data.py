# -*- coding=utf-8 -*-
"""
    All entry points for API are defined here.

    Attributes:
        mod (Blueprint): Flask Blueprint object used to separate api from
                         website code.

"""

from flask import Blueprint, request, send_from_directory
from flask_restful import Api, Resource
import os
from datetime import datetime
from PIL import Image as PILImage

from app import db
from models.data import City, Country, Location, Price, Tour, Image, Comment, SpecificTour
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
                "thumbnail_id": 2,
                "locations": [2, 51, 16, 43]
            }

        Available fields are:
            name (str), description (str), guide_fee (float),
            thumbnail_id (int), locations (list of integers)

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
            JSON file containing id, name, description, guide_fee, thumbnail_id
            and location identifiers of selected tour. For example:

                {
                    "id": 17,
                    "name": "Walk Through History",
                    "description": "Visit some of the finest castles and
                                    mansions in all of Europe.",
                    "guide_fee": 10,
                    "thumbnail": 2,
                    "locations": [...]
                }

            If a requested tour is not found, then JSON file has an empty
            object.
        """

        response = {}
        tour = db.session.query(Tour).filter_by(oid=oid,).one_or_none()
        if tour:
            thumbnail = db.session.query(Image).filter_by(oid=tour.thumbnail_id).one()

            response = {
                'id':tour.oid,
                'name':tour.name,
                'description':tour.description,
                'guide_fee':tour.guide_fee,
                'thumbnail': {
                    'id': thumbnail.oid,
                    'src': 'http://localhost:5000/static/' + thumbnail.file_name,
                    'width': thumbnail.width,
                    'height': thumbnail.height,
                    'alt': 'thumbnail'
                },
                'locations': [
                    {'id': location.oid, 'name': location.name} \
                    for location in tour.locations
                ],
                'photos': [
                    {
                        'id': image.oid,
                        'src': 'http://localhost:5000/static/' + image.file_name,
                        'width': image.width,
                        'height': image.height,
                        'alt': 'image'
                    } for image in tour.images
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
                "thumbnail": 2,
                "locations": [2, 51, 16, 43],
                "images": [ 34, 5, 63]
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
        print(req)
        if req:
            tour = Tour(
                name=req['name'],
                guide_fee=req['guide_fee'],
                description=req['description'],
                thumbnail_id=req['thumbnail']
            )

            for location in req['locations']:
                loc = db.session.query(Location).filter_by(oid=location,).one()
                loc.tours.append(tour)

            for image_id in req['images']:
                image = db.session.query(Image).filter_by(oid=image_id).one()
                tour.images.append(image)

            db.session.add(tour)
            db.session.commit()

            return ({'success': True, 'id': tour.oid}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

    def get(self):
        """Fetch all tours.

        Returns:
            JSON file containing id, name, description, guide_fee, thumbnail_id
            and location identifiers of all selected tours. For example:

                [
                    {
                        "id": 17,
                        "name": "Walk Through History",
                        "description": "Visit some of the finest castles and
                                        mansions in all of Europe.",
                        "guide_fee": 10,
                        "thumbnail": 2,
                        "locations": [...]
                    },
                    {
                        "id": 17,
                        "name": "It's Time to Party",
                        "description": "Have a wonderful time with young and
                                        wicked people in Sydney's most
                                        spectacular night clubs.",
                        "guide_fee": 14,
                        "thumbnail": 403,
                        "locations": [...]
                    },
                    ...
                ]

            If database is not populated, then JSON file has an empty array.
        """

        response = []
        for tour in db.session.query(Tour).all():
            thumbnail = db.session.query(Image).filter_by(oid=tour.thumbnail_id).one()
            response.append(
                {
                    'id':tour.oid,
                    'name':tour.name,
                    'description':tour.description,
                    'guide_fee':tour.guide_fee,
                    'thumbnail': {
                        'id': thumbnail.oid,
                        'src': 'http://localhost:5000/static/' + thumbnail.file_name,
                        'width': thumbnail.width,
                        'height': thumbnail.height,
                        'alt': 'thumbnail'
                    },
                    'locations': [
                        {'id': location.oid, 'name': location.name} \
                        for location in tour.locations
                    ],
                    'photos': [
                        {
                            'id': image.oid,
                            'src': 'http://localhost:5000/static/' + image.file_name,
                            'width': image.width,
                            'height': image.height,
                            'alt': 'image'
                        } for image in tour.images
                    ],
                    'rating': 3,
                    'commentIds': [1]
                }
            )

        return (response, 200)


class SpecificTourAPI(Resource):

    def put(self, oid):
        pass

    def get(self, oid):
        response = {}
        specific_tour = db.session.query(SpecificTour).filter_by(oid=oid,).one_or_none()
        if specific_tour:
            response = {
                'startDate': specific_tour.start_date,
                'endDate': specific_tour.end_date,
                'tourId': specific_tour.tour_id,
            }

            return (response, 200)

        return (response, 404)

    def delete(self, oid):
        pass


class SpecificTourListAPI(Resource):

    def post(self):
        req = request.get_json(force=True, silent=True)
        if req:
            print(req)
            specific_tour = SpecificTour(
                start_date=req['startDate'],
                end_date=req['endDate'],
                tour_id=req['tourId']
            )
            db.session.add(specific_tour)
            db.session.commit()

            return ({'success': True, 'id': specific_tour.oid}, 200)

        return ({'success':False, 'message':'Not JSON'}, 400)

class SpecificToursByTourAPI(Resource):

    def get(self, oid):
        tour = db.session.query(Tour).filter_by(oid=oid).one_or_none()
        if tour:
            response = []
            for specific_tour in tour.specific_tours:
                response.append({
                    'startDate': str(specific_tour.start_date),
                    'endDate': str(specific_tour.end_date),
                    'tourId': specific_tour.tour_id,
                })

                db.session.add(specific_tour)

            db.session.commit()

            return (response, 200)

        return ({'success':False,
                 'message':'Specified tour not found'}, 404)


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
                    "success": true,
                    "id": 43
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
                city_id=req['city_id'] if 'city_id' in req else None,
                country_id=req['country_id'] if 'country_id' in req else None
            )


            db.session.add(location)
            db.session.commit()

            price = Price(location.oid, req['price'])

            db.session.add(price)
            db.session.commit()

            return ({'success': True, 'id': location.oid}, 200)

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
                    'price':location.price[0].amount,
                    'city_id':location.city_id,
                    'country_id':location.country_id
                }
            )

        return (response, 200)


class LocationByCityAPI(Resource):

    def post(self, oid):
        response = []
        city = db.session.query(City).filter_by(oid=oid).one_or_none()
        if city:
            for location in city.locations:
                response.append(
                    {
                        'id': location.oid,
                        'name': location.name,
                        'description': location.description,
                        'price': location.price.amount,
                    }
                )

            return (response, 200)

        return ({'success':False,
                 'message':'Specified country not found'}, 404)


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
                    "success": true,
                    "id": 21,
                }

            Addition failed

                {
                    "success": false,
                    "message": "Not JSON"
                }
        """

        req = request.get_json(force=True, silent=True)
        if req:
            thumbnail_id = req['thumbnail_id'] if 'thumbnail_id' in req else None

            city = City(
                name=req['name'],
                country_id=int(req['country_id']),
                thumbnail_id=thumbnail_id
            )

            db.session.add(city)
            db.session.commit()

            return ({'success': True, 'id': city.oid}, 200)

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


class CitiesByCountryAPI(Resource):

    def get(self, oid):
        """Fetches all cities that belong to the requested country.

        Returns:
            JSON file containing id and name all cities belonging to the
            requested country. For example:

                [
                    {
                        "id": 1,
                        "name": "Novi Sad",
                    },
                    {
                        "id": 10,
                        "name": "New York",
                    },
                    ...
                ]

            If there isn't any city found, then JSON file has an empty array.
        """

        response = []
        country = db.session.query(Country).filter_by(oid=oid).one_or_none()
        if country:
            for city in country.cities:
                response.append(
                    {
                        'id': city.oid,
                        'name': city.name,
                    }
                )

            return (response, 200)

        return ({'success':False,
                 'message':'Specified country not found'}, 404)


class LocationsByCityAPI(Resource):

    def get(self, oid):
        """Fetch all locations.

        Returns:
            JSON file containing id, name, description, price, city and
            country identifiers of all selected locations. For example:

                [
                    {
                        "id": 17,
                        "name": "Jovan Jovanovic Zmaj",
                        "description": "Gimnazija",
                        "price": 0
                    },
                    {
                        "id": 17,
                        "name": "Jovan Jovanovic Zmaj",
                        "description": "Gimnazija",
                        "price": 0
                    },
                    ...
                ]

            If database is not populated, then JSON file has an empty array.
        """

        city = db.session.query(City).filter_by(oid=oid).one_or_none()

        if city:
            response = []
            for location in city.locations:
                response.append(
                    {
                        'id':location.oid,
                        'name':location.name,
                        'description':location.description,
                        'price':location.price[0].amount
                    }
                )

            return (response, 200)

        return ({'success':False,
                 'message':'Specified city not found'}, 404)


class FilesAPI(Resource):
    def post(self):
        UPLOAD_FOLDER = '../static'
        image_ids = []
        for fi in request.files:
            extension = request.files[fi].filename.split('.')[-1]
            filename = datetime.now().strftime("%d_%m_%Y_%H_%M_%S_%f" + '.' + extension)
            path = os.path.join(UPLOAD_FOLDER, filename)
            request.files[fi].save(path)

            with PILImage.open(path) as img:
                width, height = img.size

                image = Image(filename, width, height)

                db.session.add(image)
                db.session.commit()

                image_ids.append({
                    'id': image.oid,
                    'src': 'http://localhost:5000/static/' + filename,
                    'width': width,
                    'height': height,
                    'alt': 'image',
                })

        return (image_ids)

#TODO(aleksandar=varga): Delete this.
class ImageAPI(Resource):

    def get(self, oid):
        image = db.session.query(Image).filter_by(oid=oid).one_or_none()
        if image:
            UPLOAD_FOLDER = '../static'
            return send_from_directory(UPLOAD_FOLDER, image.file_name)

        return ({'success':False,
                 'message':'Specified image not found'}, 404)


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
            image = db.session.query(Image).filter_by(oid=user.image,).one_or_none()
            response = {
                'comment': comment.text,
                'userId': user.id,
                'userName': user.email,
                'userPhoto': 'http://localhost:5000/static/' + image.file_name,
                'likes': 0,
                'dislikes': 0,
                'current': 0
            }

            return (response, 200)

        return (response, 404)


api.add_resource(TourListAPI, '/tours')
api.add_resource(SpecificTourListAPI, '/tours/specific')
api.add_resource(TourAPI, '/tours/<int:oid>')
api.add_resource(SpecificToursByTourAPI, '/tour/<int:oid>/specific')
api.add_resource(LocationListAPI, '/locations')
api.add_resource(LocationAPI, '/locations/<int:oid>')
api.add_resource(LocationsByCityAPI, '/city/<int:oid>/locations')
api.add_resource(CityListAPI, '/cities')
api.add_resource(CityAPI, '/cities/<int:oid>')
api.add_resource(CitiesByCountryAPI, '/country/<int:oid>/cities')
api.add_resource(CountryListAPI, '/countries')
api.add_resource(CountryAPI, '/countries/<int:oid>')
api.add_resource(FilesAPI, '/upload')
api.add_resource(ImageAPI, '/images/<int:oid>')
api.add_resource(CommentAPI, '/comment/<int:oid>')
