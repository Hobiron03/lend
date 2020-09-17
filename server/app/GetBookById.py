from models.config import Session
from models.book import Book

#own_book => book
def GetBookById(book_id):
    session = Session()
    book = session.query(Book).filter(Book.id == book_id).all()
    session.commit()
    return book #リスト
