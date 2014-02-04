import config
import bcrypt
from datetime import datetime

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, ForeignKey
from sqlalchemy import Column, Integer, String, DateTime, Text

from sqlalchemy.orm import sessionmaker, scoped_session, relationship, backref

from flask.ext.login import UserMixin

engine = create_engine(config.DB_URI, echo=False) 
session = scoped_session(sessionmaker(bind=engine,
                                    autocommit = False,
                                    autoflush = False))

Base = declarative_base()
Base.query = session.query_property()

class User(Base, UserMixin):
    __tablename__ = "users" 
    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=False)
    pettype = Column(String(64), nullable=False)
    petname = Column(String(64), nullable=False)
    ##petgender = Column(String(64), nullable=False)
    salt = Column(String(64), nullable=False)
    pw = Column(String(64), nullable=False)
    current_level = Column(Integer, default=1)

    user_levels = relationship("UserLevel", uselist=True)

    def set_password(self, password):
        self.salt = bcrypt.gensalt()
        password = password.encode("utf-8")
        self.pw = bcrypt.hashpw(password, self.salt)

    def authenticate(self, password):
        password = password.encode("utf-8")
        return bcrypt.hashpw(password, self.salt.encode("utf-8")) == self.pw

    def increment_current_level(self):
        # NOTE: make it so that you can't increment level if on the last level
        self.current_level+=1
        session.commit()
        return self.current_level

class Level(Base):
    __tablename__ = "levels"
    
    id = Column(Integer, primary_key=True)
    map = Column(String(64), nullable=False)
    petStart = Column(String(64), nullable=False)
    treatPos = Column(String(64), nullable=False)


class UserLevel(Base):
    __tablename__ = "user_levels"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    level_id = Column(Integer, ForeignKey("levels.id"))
    last_saved = Column(DateTime, nullable=False, default=datetime.now)
    current_level_input = Column(String(64), nullable=False, default=" ")
    complete = Column(Integer, default=0)

    levels = relationship("Level")


def register_new_user(username, pettype, petname, pw): ##, petgender
    new_user = User(username = username, pettype = pettype, 
                    petname = petname) ##, petgender = petgender
    new_user.set_password(pw)
    session.add(new_user)
    session.commit()

def get_user_id():
    user = session.query(User).filter_by(username = username).all()
    if user == []:
        return None
    else:
        return user[0]

def create_tables():
    Base.metadata.create_all(engine)

if __name__ == "__main__":
    create_tables()