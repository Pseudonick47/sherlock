from app import db
from passlib.hash import argon2
from models.data import Payment, SpecificTour

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column('id', db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    name = db.Column(db.String(255), nullable=False)
    surname = db.Column(db.String(255), nullable=False)
    dateOfBirth = db.Column(db.String(255), nullable=False)
    biography = db.Column(db.String(255))
    role = db.Column(db.String(255), nullable=False)

    def __init__(self, email, password, name='',surname='',dateOfBirth='',biography='',role='tourist'):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)
        self.name = name
        self.surname = surname
        self.dateOfBirth = dateOfBirth
        self.biography = biography
        self.role = role

    @staticmethod
    def hashed_password(password):
        hashed = argon2.hash(password)
        return hashed

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and argon2.verify(password, user.password):
            return user
        else:
            return None


tourists_and_payments = db.Table(
	'tourists_and_payments',
	db.Column('tourist_id', db.Integer, db.ForeignKey('user.id')),
	db.Column('payment_id', db.Integer, db.ForeignKey('payments.id'))
)

guides_and_tours = db.Table(
	'guides_and_tours',
	db.Column('guide_id', db.Integer, db.ForeignKey('user.id')),
	db.Column('spec_tour_id', db.Integer, db.ForeignKey('specificTours.id'))
)