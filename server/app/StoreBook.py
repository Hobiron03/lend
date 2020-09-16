from models.config import Session
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from sqlalchemy import and_, or_


def AllBooks(): #基本機能全てを出す
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    store = []
    if booklist != []:
        for book in booklist:
            store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store


def IsOwn( user_id , book_id ): #所有判定
    session = Session()
    own_inf = session.query(Own_Book).filter(
            Own_Book.user_id == user_id,
            Own_Book.book_id == book_id
    )
    session.commit()
    if own_inf.count() == 0 :
        return False
    return True

    


def BooksForUser(user_id): #応用機能
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    store = []
    if booklist != []:
        for book in booklist:
            if not IsOwn( user_id , book.id ):
                store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store

