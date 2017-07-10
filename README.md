# Sherlock #

* Python 3.x
* pip
* npm

### Create DB
First install postgresql, enable db service, create database.
```sh
$ export DATABASE_URL="postgresql://username:password@localhost/mydatabase"
```
### Install Back-End Requirements
```sh
$ cd backend
$ sudo pip install -r requirements.txt
$ python run.py --db-reset
```
### Install Front-End Requirements
```sh
$ cd frontend
$ sudo npm install
```

### Run Back-End

```sh
$ python run.py
```

### Test Back-End

```sh
$ cd backend
$ python test.py
```

### Run Front-End

```sh
$ cd frontend
$ npm start
```
