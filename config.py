import os


# Config file, put all your keys and passwords and whatnot in here
DB_URI = os.environ.get("HEROKU_POSTGRESQL_TEAL_URL", "sqlite:///gamedata.db")
SECRET_KEY = "this should be a secret"