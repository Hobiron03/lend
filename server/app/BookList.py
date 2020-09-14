from models.config import session
from models.book import Book
from models.own_book import Own_Book

def GetBookListByUser():
    booklist = session.query(Own_Book).filter(Own_Book.user_id==1).all()
    session.commit()
    return booklist
