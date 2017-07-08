from app import db
from passlib.hash import argon2
from models.data import Payment, SpecificTour, images_of_user, Image

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column('id', db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    first_name = db.Column(db.String(255), nullable=False)
    surname = db.Column(db.String(255), nullable=False)
    dateOfBirth = db.Column(db.String(255), nullable=False)
    biography = db.Column(db.String(255))
    role = db.Column(db.String(255), nullable=False)
    image = db.Column(db.Integer(), nullable=True)
    ratings = db.relationship('Rating', backref='users', lazy='dynamic')

    def __init__(self, email, password, first_name='', surname='',role='',dateOfBirth='',biography='', image=1):
        # 1 is default profile image!!! to do: make it actually be
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)
        self.first_name = first_name
        self.surname = surname
        self.dateOfBirth = dateOfBirth
        self.biography = biography
        self.role = role
        self.image = image

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
	db.Column('spec_tour_id', db.Integer, db.ForeignKey('specific_tours.id'))
)
