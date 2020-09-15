from models.config import Session
#from models.config import session
from models.book import Book
from models.own_book import Own_Book

def GetBookListByUser():
    session = Session() #こちらの方が適切かもしれない
    user_id = 1
    print(user_id)
    print(type(user_id) )
    booklist = session.query(Own_Book).filter(Own_Book.user_id==user_id).all()
    session.commit()
    return booklist
