from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

from models.config import engine

Base_user = declarative_base()

class User(Base_user):
    __tablename__ = 'users'
    id = Column(Integer,primary_key=True)
    icon_image = Column(String)
    name = Column(String)
    password = Column(String)
    point = Column(Integer)
    friend_list = Column(String) #Integer Array

    def __init__(self, icon_image , name, password, point, friend_list ):
        self.icon_image = icon_image
        self.name = name
        self.password = password
        self.point = point
        self.friend_list = friend_list

    def __repr__(self):
        return self.name

#Base.metadata.create_all(engine)
    
