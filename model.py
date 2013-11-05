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
    salt = Column(String(64), nullable=False)
    pw = Column(String(64), nullable=False)

    user_levels = relationship("UserLevel", uselist=True)

    def set_password(self, password):
        self.salt = bcrypt.gensalt()
        password = password.encode("utf-8")
        self.pw = bcrypt.hashpw(password, self.salt)

    def authenticate(self, password):
        password = password.encode("utf-8")
        return bcrypt.hashpw(password, self.salt.encode("utf-8")) == self.pw



class Level(Base):
    __tablename__ = "levels"
    
    id = Column(Integer, primary_key=True)
    map = Column(String(64), nullable=False)


    """
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    posted_at = Column(DateTime, nullable=True, default=None)
    """

class UserLevel(Base):
    __tablename__ = "user_levels"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    level_id = Column(Integer, ForeignKey("levels.id"))

    levels = relationship("Level")


def create_tables():
    Base.metadata.create_all(engine)
# put the stuff in seed.py for creating a starter db, but keep create tables in here.
    # u = User(email="test@test.com")
    # u.set_password("unicorn")
    # session.add(u)
    # p = Post(title="This is a test post", body="This is the body of a test post.")
    # u.posts.append(p)
    # session.commit()


if __name__ == "__main__":
    create_tables()