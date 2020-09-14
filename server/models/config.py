from sqlalchemy import create_engine, Column, Integer, String
import os

from sqlalchemy.orm import sessionmaker

DATAFILE = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'db.sqlite3')

engine = create_engine('sqlite:///'+DATAFILE)

Session = sessionmaker(bind=engine)

session = Session()

