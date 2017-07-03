import sys

from app import db
from models.data import *


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
