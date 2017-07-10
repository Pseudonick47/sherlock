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

        assert response.status == "200 OK"

        data = json.loads(response.data)

        response = self.app.get('/api/tours/' + str(data['id']))
        print(response)
        assert response.status == "200 OK"
        
        new_tour = json.loads(response.data)


def main():
    unittest.main()

if __name__ == '__main__':
    main()
