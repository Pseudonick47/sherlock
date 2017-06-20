"""
    This module starts flask application.

"""

from sherlock import app, db

def main():
    """Creates SQLAlchemy tables and starts Flask applicaiton."""

    # do not forget to run feed_db.py after dropping all tables
    #db.drop_all()

    db.create_all()
    app.run(debug=True)


if __name__ == "__main__":
    main()
