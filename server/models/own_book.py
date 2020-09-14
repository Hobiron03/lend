from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

from models.config import engine

Base_own_book = declarative_base()

class Own_Book(Base_own_book):
    __tablename__ = 'own_books'
    id = Column(Integer,primary_key=True)
    user_id = Column(Integer)
    book_id = Column(Integer)
    
    def __init__(self, user_id, book_id):
        self.user_id = user_id
        self.book_id = book_id

    def __repr__(self):
        return str(self.id)

#Base.metadata.create_all(engine)
    
