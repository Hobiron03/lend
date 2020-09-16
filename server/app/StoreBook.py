from models.config import Session
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from sqlalchemy import and_, or_

from app.LendInfo_auto import AutoUpdateLendInfo

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

def IsOwnBook( own_book_id , book_id ):
    session = Session()
    own_info = session.query(Own_Book).filter(
            Own_Book.id == own_book_id,
            Own_Book.book_id == book_id
        )
    session.commit()
    if own_info.count() == 0:
        return False
    return True

def GetBookIdByOwn( own_id ):
    session = Session()
    booklist = session.query( Own_Book ).filter(
            Own_Book.id == own_id
    ).all()
    session.commit()
    return booklist


#借りている本一覧
def Borrowing( borrower_id ):
    session = Session()
    lend_info = session.query(Lend_info).filter(
            Lend_info.is_valid,
            Lend_info.borrower_id == borrower_id
    ).all()
    session.commit()
    
    bookset = set()

    if lend_info != []:
        for lend in lend_info:
            own_book = GetBookIdByOwn( lend.own_book_id )
            if own_book != []:
                bookset.add( own_book[0].book_id )
    return bookset


def GetDeadLine(borrower_id,book_id):
    session = Session()
    lend_info = session.query(Lend_info).filter(
            Lend_info.is_valid,
            Lend_info.borrower_id == borrower_id
    ).all()
    session.commit()
    if lend_info != []:
        for lend in lend_info:
            if IsOwnBook(lend.own_book_id, book_id):
                return lend.deadline

    return "no date"


def BooksForUser(user_id): #応用機能
    AutoUpdateLendInfo()
    session = Session()
    booklist = session.query(Book).all()
    session.commit()
    
    borrowset = Borrowing( user_id )
    
    store = []
    if booklist != []:
        for book in booklist:
            if not IsOwn( user_id , book.id ):
                status = "still"
                deadline = None
                if book.id in borrowset:
                    status = "lending"
                    deadline = GetDeadLine(user_id, book.id)

                store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(','), "status": status , "deadline": deadline } )

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
    AutoUpdateLendInfo()
    session = Session()
    booklist = session.query(Book).all()
    session.commit()

    borrowset = Borrowing( user_id )
    
    booklist = SortByRank(booklist)
    store = []
    if booklist != []:
        for book in booklist:
            if not IsOwn( user_id , book.id ):
                status = "still"
                deadline = None
                if book.id in borrowset:
                    status = "lending"
                    deadline = GetDeadLine(user_id, book.id)

                store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(','), "status": status , "deadline": deadline } )
                #store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

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
    AutoUpdateLendInfo()
    session = Session()
    booklist = session.query(Book).all()
    session.commit()

    borrowset = Borrowing( user_id )
    
    booklist = SortByOwn(booklist)
    store = []
    if booklist != []:
        for book in booklist:
            if not IsOwn( user_id , book.id ):
                status = "still"
                deadline = None
                if book.id in borrowset:
                    status = "lending"
                    deadline = GetDeadLine(user_id, book.id)

                store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(','), "status": status , "deadline": deadline } )
                #store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

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
    AutoUpdateLendInfo()
    session = Session()
    booklist = session.query(Book).all()
    session.commit()

    borrowset = Borrowing( user_id )

    booklist = SortByLend(booklist)
    store = []
    if booklist != []:
        for book in booklist:
            if not IsOwn( user_id , book.id ):
                status = "still"
                deadline = None
                if book.id in borrowset:
                    status = "lending"
                    deadline = GetDeadLine(user_id, book.id)

                store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(','), "status": status , "deadline": deadline } )
                #store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store










