from models.config import session
from models.book import Book
from models.own_book import Own_Book

def GetBookList():
    booklist = session.query(Own_Book).all()
    session.commit()
    return booklist
