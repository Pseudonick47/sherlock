import sys
from PIL import Image as PILImage

from app import db
from models.data import *


def insert_cities():
    with open('../data/cities', mode='r', encoding='UTF-8') as f:
        for line in f.readlines():
            name, country_id = line.strip().split('|')
            city = City(name, country_id, 1)
            db.session.add(city)

    db.session.commit()


def insert_default_images():
    folder = '../static/'
    images = []
    images.append('city.jpg')
    images.append('location.png')
    images.append('tour.jpg')
    images.append('profile.jpg')

    for i in images:
        with PILImage.open(folder + i) as img:
            width, height = img.size
            image = Image(i, width, height)
            db.session.add(image)

    db.session.commit()


def insert_countries():
    with open('../data/countries', mode='r', encoding='UTF-8') as f:
        for line in f.readlines():
            continent, name = line.strip().split('|')
            country = Country(name, continent)
            db.session.add(country)

    db.session.commit()


def main(drop_all=False):
    if drop_all:
        db.engine.execute('drop schema if exists public cascade')
        db.engine.execute('create schema public')

    db.create_all()

    insert_countries()
    insert_default_images()
    insert_cities()
