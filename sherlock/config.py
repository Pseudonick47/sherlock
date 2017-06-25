# -*- config=utf-8 -*-

import os

SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/database_name'
SQLALCHEMY_DATABASE_URI = 'postgresql://aleksandar:ftn@localhost/sherlock'

SECRET_KEY =              os.getenv('SECRET_KEY',       'THIS IS AN INSECURE SECRET')
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL',     'sqlite:///basic_app.sqlite')
CSRF_ENABLED = True

# Flask-Mail settings
MAIL_USERNAME =           os.getenv('MAIL_USERNAME',        'travel.with.sherlock@gmail.com')
MAIL_PASSWORD =           os.getenv('MAIL_PASSWORD',        'arstneio')
MAIL_DEFAULT_SENDER =     os.getenv('MAIL_DEFAULT_SENDER',  '"Sherlock" <travel.with.sherlock@gmail.com>')
MAIL_SERVER =             os.getenv('MAIL_SERVER',          'smtp.gmail.com')
MAIL_PORT =           int(os.getenv('MAIL_PORT',            '465'))
MAIL_USE_SSL =        int(os.getenv('MAIL_USE_SSL',         True))

# Flask-User settings
USER_APP_NAME        = "Sherlock Travel"                # Used by email templates
USER_ENABLE_CHANGE_PASSWORD = True  # Allow users to change their password
USER_ENABLE_CHANGE_USERNAME = False  # Allow users to change their username
USER_ENABLE_CONFIRM_EMAIL = True  # Force users to confirm their email
USER_ENABLE_FORGOT_PASSWORD = True  # Allow users to reset their passwords
USER_ENABLE_EMAIL = True  # Register with Email
USER_ENABLE_REGISTRATION = True  # Allow new users to register
USER_ENABLE_RETYPE_PASSWORD = True  # Prompt for `retype password` in:
USER_ENABLE_USERNAME = False  # Register and Login with username
USER_AFTER_LOGIN_ENDPOINT = 'user_page'
USER_AFTER_LOGOUT_ENDPOINT = 'home_page'