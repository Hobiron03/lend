
from models.config import Session
from models.lend_info import Lend_info
from models.own_book import Own_Book
from sqlalchemy import and_, or_

def IsHaveBook( book_id , user_id ):
    session = Session()
    cnt = session.query(Own_Book).filter(
            Own_Book.book_id == book_id,
            Own_Book.user_id == user_id
            ).count()
    session.commit()
    if cnt == 0 :
        return False
    return True





