from sqlalchemy import create_engine, Column, Integer, String
import os

from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import scoped_session

DATAFILE = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'sql.db')

engine = create_engine('sqlite:///'+DATAFILE)
#engine = create_engine('sqlite:///'+DATAFILE+'?charset=utf-8',convert_unicode=True,encoding="utf-8",echo=True)

Session = scoped_session( sessionmaker(bind=engine) )

session = Session()

