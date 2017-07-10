import unittest

from flask import jsonify, json

from app import app, db
from config import TestConfig


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

        tour = json.dumps(tour);

        response = self.app.post('/api/tours', data=tour)

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

def main():
    unittest.main()

if __name__ == '__main__':
    main()
