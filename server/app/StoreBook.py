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


#Rank付
def CntOwnBook(book_id):
    session = Session()
    cnt = session.query(Own_Book).filter(
            Own_Book.book_id == book_id
    ).count()
    session.commit()
    return cnt

def CntLendBook(book_id):
    session = Session()
    own_list = session.query(Own_Book).filter(
            Own_Book.book_id == book_id
    ).all()
    cnt = 0
    if own_list != []:
        for own in own_list:
            cnt += session.query(Lend_info).filter(
                    Lend_info.own_book_id == own.id
            ).count()
    session.commit()
    return cnt



def SortByRank(booklist):
    rank_list = []
    if booklist != []:
        for book in booklist:
            rank_list.append( { 'Rank': CntOwnBook(book.id)+CntLendBook(book.id) ,'book': book } ) 


    sorted_book_list =  sorted( rank_list , key= lambda x:x['Rank'] , reverse=True )

    res = []
    if sorted_book_list != []:
        for book in sorted_book_list:
            res.append( book['book'] )
    return res

def SortByOwn(booklist):
    rank_list = []
    if booklist != []:
        for book in booklist:
            rank_list.append( { 'Rank': CntOwnBook(book.id)  ,'book': book } ) 


    sorted_book_list =  sorted( rank_list , key= lambda x:x['Rank'] , reverse=True )

    res = []
    if sorted_book_list != []:
        for book in sorted_book_list:
            res.append( book['book'] )
    return res


def SortByLend(booklist):
    rank_list = []
    if booklist != []:
        for book in booklist:
            rank_list.append( { 'Rank': CntLendBook(book.id) ,'book': book } ) 

    sorted_book_list =  sorted( rank_list , key= lambda x:x['Rank'] , reverse=True )

    res = []
    if sorted_book_list != []:
        for book in sorted_book_list:
            res.append( book['book'] )
    return res

#Rank
def AllBooksByRank(): #基本機能全てを出す
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    booklist = SortByRank(booklist)
    store = []
    if booklist != []:
        for book in booklist:
            store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store

def BooksForUserByRank(user_id): #応用機能
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    booklist = SortByRank(booklist)
    store = []
    if booklist != []:
        for book in booklist:
            if not IsOwn( user_id , book.id ):
                store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store
#Own
def AllBooksByOwn(): #基本機能全てを出す
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    booklist = SortByOwn(booklist)
    store = []
    if booklist != []:
        for book in booklist:
            store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store

def BooksForUserByOwn(user_id): #応用機能
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    booklist = SortByOwn(booklist)
    store = []
    if booklist != []:
        for book in booklist:
            if not IsOwn( user_id , book.id ):
                store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store

def AllBooksByLend(): #基本機能全てを出す
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    booklist = SortByLend(booklist)
    store = []
    if booklist != []:
        for book in booklist:
            store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store

def BooksForUserByLend(user_id): #応用機能
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    booklist = SortByLend(booklist)
    store = []
    if booklist != []:
        for book in booklist:
            if not IsOwn( user_id , book.id ):
                store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store










