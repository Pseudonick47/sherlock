from app import db
import bcrypt

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, email, password):
        self.email = email
        self.active = True
        # self.password = User.hashed_password(password).decode('utf-8')
        self.password = password

    @staticmethod
    def hashed_password(password):
        # hashed = bcrypt.hashpw(str.encode(password), bcrypt.gensalt(5)) 
        return password

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        # if user and bcrypt.checkpw(str.encode(user.password), str.encode(password)):
        if user and (user.password == password):
            return user
        else:
            return None
