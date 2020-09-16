from models.config import Session
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from sqlalchemy import and_, or_


from app.StoreBook import AllBooks

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


session = Session()
booklist = session.query(Book).all()
if booklist != []:
    for book in booklist:
        print("id: "+str(book.id)+"\ncnt: "+str( CntOwnBook(book.id) )+"\nlend: "+str(CntLendBook(book.id))+"\n" )




