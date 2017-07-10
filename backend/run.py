import sys

from app import app
from dev_database import main as db_main


def main():
    if len(sys.argv) == 2:
        if (sys.argv[1] == '--db-reset'):
            db_main(drop_all=True)
        elif (sys.argv[1] == '--db-create'):
            db_main()

    app.run()

if __name__ == "__main__":
    main()
