import unittest
import os

from flask import json, request

from app import app, db

from models.data import Location

test_app = app.test_client()

from dev_database import main as dev_main

dev_main(drop_all=True, insert=True)


class LocationTestCase(unittest.TestCase):

    def test_location(self):
        location = {
            "name": 'TestLocation',
            "description": 'TestLocationDescription',
            "city_id": 1,
            "country_id": 1,
            "price": 100
        }

        location = json.dumps(location);

        response = test_app.post('/api/locations', data=location)

        print()
        print("Test: Post new location")
        print(response)
        assert response.status == "200 OK"

        data = json.loads(response.data)

        response = test_app.get('/api/locations/' + str(data['id']))
        print()
        print("Test: Get location")
        print(response)
        assert response.status == "200 OK"
        new_location = json.loads(response.data)

        response = test_app.get('/api/locations/' + str(-1))
        print()
        print("Test: Wrong location id")
        print(response)
        assert response.status[:3] == "404"

class CityTestCase(unittest.TestCase):

    def test_city(self):
        city = {
            "name": "TestCity",
            "country_id": 1,
            "thumbnail": 2,
            "images": []
        }

        city = json.dumps(city);

        response = test_app.post('/api/cities', data=city)

        print()
        print("Test: Post new city")
        print(response)
        assert response.status == "200 OK"

        data = json.loads(response.data)

        response = test_app.get('/api/cities/' + str(data['id']))
        print()
        print("Test: Get city")
        print(response)
        assert response.status == "200 OK"
        new_city = json.loads(response.data)

        response = test_app.get('/api/cities/' + str(-1))
        print()
        print("Test: Wrong city id")
        print(response)
        assert response.status[:3] == "404"

class CountryTestCase(unittest.TestCase):

    def test_country(self):
        country = {
            "name": "TestCountry",
            "continent": 1,
            "cities": []
        }

        country = json.dumps(country);

        response = test_app.post('/api/countries', data=country)

        print()
        print("Test: Post new country")
        print(response)
        assert response.status == "200 OK"

        data = json.loads(response.data)

        response = test_app.get('/api/countries/' + str(data['id']))
        print()
        print("Test: Get country")
        print(response)
        assert response.status == "200 OK"
        new_country = json.loads(response.data)

        response = test_app.get('/api/countries/' + str(-1))
        print()
        print("Test: Wrong country id")
        print(response)
        assert response.status[:3] == "404"        


class TourTestCase(unittest.TestCase):

    def test_tour(self):
        tour = {
            "name": "TestTour",
            "description": "TestTourDescription",
            "guide_fee": 10,
            "thumbnail": 3,
            "locations": [],
            "images": [],
        }

        response = test_app.post('/api/tours', data=json.dumps(tour))

        print()
        print("Test: Post new tour")
        print(response)
        assert response.status[:3] == "200"

        data = json.loads(response.data)

        response = test_app.get('/api/tours/' + str(data['id']))
        print()
        print("Test: Get tour")
        print(response)

        assert response.status[:3] == "200"

        new_tour = json.loads(response.data)

        assert tour['name'] == new_tour['name']
        assert tour['description'] == new_tour['description']
        assert tour['guide_fee'] == new_tour['guide_fee']
        assert tour['thumbnail'] == new_tour['thumbnail']['id']
        assert tour['locations'] == new_tour['locations']
        assert tour['images'] == new_tour['images']
        assert not new_tour['rating']
        assert not new_tour['commentIds']

        response = test_app.get('/api/tours/' + str(-1))
        
        print()
        print("Test: Request tour, invalid id")
        print(response)
        assert response.status[:3] == "404"


        response = test_app.post('/api/tours', data="lasldl")

        print()
        print("Test: Post tour, request not JSON")
        print(response)
        assert response.status[:3] == "400"



class RegistrationTestCase(unittest.TestCase):

    def test_registration(self):
        user = {
            "email": "mail@mail.mail",
            "password": "hunter2",
            "first_name": "John",
            "surname": "Doe",
            "role": "guide",
        }

        user = json.dumps(user);

        response = test_app.post('/api/create_user', data=user)
        print()
        print("Test: Register new user")
        print(response)
        assert response.status == "200 OK"

        response = test_app.post('/api/create_user', data=user)
        print()
        print("Test: Register new user with existing email")
        print(response)
        assert response.status[:3] == "409"



        user = {
            "email": "mail@mail.mail",
            "password": "hunter2",
        }
        user = json.dumps(user);
        response = test_app.post('/api/get_token', data=user)
        print()
        print("Test: Login")
        print(response)
        assert response.status == "200 OK"

        t = json.loads(response.data)
        token = {"token": t}
        response = test_app.post('/api/is_token_valid', data=json.dumps(token))
        print()
        print("Test: Chech token validity")
        print(response)
        assert response.status == "200 OK"

        token = {"token": "invalid token"}
        response = test_app.post('/api/is_token_valid', data=json.dumps(token))
        print()
        print("Test: Chech token validity (invalid)")
        print(response)
        assert response.status[:3] == "403"

        user = {
            "email": "mail@mail.mail",
            "password": "wrong password",
        }
        user = json.dumps(user);
        response = test_app.post('/api/get_token', data=user)
        print()
        print("Test: Login user with wrong password")
        print(response)
        assert response.status[:3] == "403"


def main():
    unittest.main()


if __name__ == '__main__':
    main()
