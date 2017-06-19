"""
    This module starts flask application.

"""

from sherlock import app, db

if __name__ == "__main__":
    app.run(debug=True)
    db.create_all()
