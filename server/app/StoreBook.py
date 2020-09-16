from models.config import Session
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from sqlalchemy import and_, or_
from app.LendInfo_auto import AutoUpdateLendInfo


def AllBooks():
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    store = []
    if booklist != []:
        for book in booklist:
            store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store



