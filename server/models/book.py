from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

from models.config import engine

Base = declarative_base()

class Book(Base):
    __tablename__ = 'books'
    id = Column(Integer,primary_key=True)
    name = Column(String)
    price = Column(Integer)
    image = Column(String)
    url = Column(String)
    
    def __init__(self, name, price, image, url ):
        self.name = name
        self.price = price
        self.image = image
        self.url = url

    def __repr__(self):
        return self.name

Base.metadata.create_all(engine)
    
