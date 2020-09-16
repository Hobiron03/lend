#from models.config import session
from models.config import Session
from models.user import User
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
import os


def AddOwnBooks(user_id_data,book_id_data):
    #own_bookにデータを追加する
    session = Session()
    session.add_all([
        Own_Book( user_id = user_id_data , book_id = book_id_data )
    ])
    print("購入ができました")
    session.commit()
