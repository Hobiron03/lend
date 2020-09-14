from sqlalchemy import create_engine, Column, Integer, String,Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

from config import engine

Base_own_book = declarative_base()

class Own_Book(Base_own_book):
    __tablename__ = 'lend_info'
    id = Column(Integer,primary_key=True)
    borrower_id = Column(Integer)
    own_book_id = Column(Integer)
    created_at = Column(String)
    returned_at = Column(String)
    deadline = Column(String)
    is_vaild = Column(Boolean)

    def __init__(self, id, borrowe_id,own_book_id,created_at,returned_at,deadline,is_vaild):
        self.id = id
        self.borrowe_id = borrowe_id
        self.own_book_id = own_book_id
        self.created_at = created_at
        self.returned_at = returned_at
        self.deadline = deadline
        self.is_vaild = is_vaild
    def __repr__(self):
        return str(self.id)

#Base_own_book.metadata.create_all(engine)

