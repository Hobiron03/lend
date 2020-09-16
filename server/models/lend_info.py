from sqlalchemy import create_engine, Column, Integer, String,Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

from models.config import engine

Base_lend_info = declarative_base()

class Lend_info(Base_lend_info):
    __tablename__ = 'lend_info'
    id = Column(Integer,primary_key=True)
    borrower_id = Column(Integer)
    own_book_id = Column(Integer)
    created_at = Column(String)
    returned_at = Column(String)
    deadline = Column(String)
    is_valid = Column(Boolean)

    def __init__(self, id, borrower_id,own_book_id,created_at,returned_at,deadline,is_valid):
        self.id = id
        self.borrower_id = borrower_id
        self.own_book_id = own_book_id
        self.created_at = created_at
        self.returned_at = returned_at
        self.deadline = deadline
        self.is_valid = is_valid
    def __repr__(self):
        return str(self.id)

#Base_own_book.metadata.create_all(engine)

