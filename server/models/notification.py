from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound

from models.config import engine

Base_notification = declarative_base()

class Notification(Base_notification):
    __tablename__ = 'notification'
    id = Column(Integer,primary_key=True)
    user_id = Column(Integer)
    message = Column(String)
    created_at = Column(String)

    
    def __init__(self, user_id, book_id,created_at):
        self.user_id = user_id
        self.message = message
        self.created_at = created_at

    def __repr__(self):
        return str(self.id)

#Base.metadata.create_all(engine)
    
