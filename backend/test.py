import unittest

from flask import jsonify, json, request

from app import app, db
from config import TestConfig
from models.data import Location

class LocationTestCase(unittest.TestCase):

    def setUp(self):
        app.config.from_object(TestConfig)
        self.app = app.test_client()

    def test_location(self):
        location = {
            "name": 'TestLocation',
            "description": 'TestLocationDescription',
            "city_id": 1,
            "country_id": 1,
            "price": 100
        }

        location = json.dumps(location);

        response = self.app.post('/api/locations', data=location)

        print()
        print("Test: Post new location")
        print(response)
        assert response.status == "200 OK"

        data = json.loads(response.data)

        response = self.app.get('/api/locations/' + str(data['id']))
        print()
        print("Test: Get location")
        print(response)
        assert response.status == "200 OK"
        new_location = json.loads(response.data)

        response = self.app.get('/api/locations/' + str(-1))
        print()
        print("Test: Wrong location id")
        print(response)
        assert response.status[:3] == "403"

class CityTestCase(unittest.TestCase):

    def setUp(self):
        app.config.from_object(TestConfig)
        self.app = app.test_client()

    def test_city(self):
        city = {
            "name": "TestCity",
            "country_id": 1,
            "thumbnail": 2,
            "images": [],
        }

        city = json.dumps(city);

        response = self.app.post('/api/cities', data=city)

        print()
        print("Test: Post new city")
        print(response)
        assert response.status == "200 OK"

        data = json.loads(response.data)

        response = self.app.get('/api/cities/' + str(data['id']))
        print()
        print("Test: Get city")
        print(response)
        assert response.status == "200 OK"
        new_city = json.loads(response.data)

        response = self.app.get('/api/cities/' + str(-1))
        print()
        print("Test: Wrong city id")
        print(response)
        assert response.status[:3] == "403"

class CountryTestCase(unittest.TestCase):

    def setUp(self):
        app.config.from_object(TestConfig)
        self.app = app.test_client()

    def test_country(self):
        country = {
            "name": "TestCountry",
            "continent": 1,
            "cities": []
        }

        country = json.dumps(country);

        response = self.app.post('/api/countries', data=country)

        print()
        print("Test: Post new country")
        print(response)
        assert response.status == "200 OK"

        data = json.loads(response.data)

        response = self.app.get('/api/countries/' + str(data['id']))
        print()
        print("Test: Get country")
        print(response)
        assert response.status == "200 OK"
        new_country = json.loads(response.data)

        response = self.app.get('/api/countries/' + str(-1))
        print()
        print("Test: Wrong country id")
        print(response)
        assert response.status[:3] == "403"        

class TourTestCase(unittest.TestCase):

    def setUp(self):
        app.config.from_object(TestConfig)
        self.app = app.test_client()


    def test_tour(self):
        tour = {
            "name": "TestTour",
            "description": "TestTourDescription",
            "guide_fee": 10,
            "thumbnail": 3,
            "locations": [],
            "images": [],
        }

        response = self.app.post('/api/tours', data=json.dumps(tour))

        print()
        print("Test: Post new tour")
        print(response)
        assert response.status == "200 OK"

        data = json.loads(response.data)

        response = self.app.get('/api/tours/' + str(data['id']))
        print()
        print("Test: Get tour")
        print(response)
        assert response.status == "200 OK"

        new_tour = json.loads(response.data)

        assert tour['name'] == new_tour['name']
        assert tour['description'] == new_tour['description']
        assert tour['guide_fee'] == new_tour['guide_fee']
        assert tour['thumbnail'] == new_tour['thumbnail']['id']
        assert tour['locations'] == new_tour['locations']
        assert tour['images'] == new_tour['images']

class RegistrationTestCase(unittest.TestCase):

    def setUp(self):
        app.config.from_object(TestConfig)
        self.app = app.test_client()


    def test_registration(self):
        user = {
            "email": "mail@mail.mail",
            "password": "hunter2",
            "first_name": "John",
            "surname": "Doe",
            "role": "guide",
        }

        user = json.dumps(user);

        response = self.app.post('/api/create_user', data=user)
        print()
        print("Test: Register new user")
        print(response)
        assert response.status == "200 OK"

        response = self.app.post('/api/create_user', data=user)
        print()
        print("Test: Register new user with existing email")
        print(response)
        assert response.status[:3] == "409"



        user = {
            "email": "mail@mail.mail",
            "password": "hunter2",
        }
        user = json.dumps(user);
        response = self.app.post('/api/get_token', data=user)
        print()
        print("Test: Login")
        print(response)
        assert response.status == "200 OK"

        t = json.loads(response.data)
        token = {"token": t}
        response = self.app.post('/api/is_token_valid', data=json.dumps(token))
        print()
        print("Test: Chech token validity")
        print(response)
        assert response.status == "200 OK"

        token = {"token": "invalid token"}
        response = self.app.post('/api/is_token_valid', data=json.dumps(token))
        print()
        print("Test: Chech token validity (invalid)")
        print(response)
        assert response.status[:3] == "403"

        user = {
            "email": "mail@mail.mail",
            "password": "wrong password",
        }
        user = json.dumps(user);
        response = self.app.post('/api/get_token', data=user)
        print()
        print("Test: Login user with wrong password")
        print(response)
        assert response.status[:3] == "403"
>>>>>>> master

def main():
    unittest.main()

if __name__ == '__main__':
    main()
