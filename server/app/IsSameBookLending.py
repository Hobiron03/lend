from models.config import Session
from models.lend_info import Lend_info
from models.own_book import Own_Book
from sqlalchemy import and_, or_

def IsContainBook( own_book_id , book_id ):
    session =Session()
    cnt = session.query(Own_Book).filter(
            Own_Book.id == own_book_id,
            Own_Book.book_id == book_id
            ).count()
    session.commit()
    if cnt == 0 :
        return False
    return True

#借りる人が同じ本を借りたことがあるのかを判定
def IsSameBookLending(borrower_id,book_id):
    session = Session()
    lend_info = session.query(Lend_info).filter(
            Lend_info.borrower_id == borrower_id
    ).all()
    
    session.commit()
    
    if lend_info == [] :
        return False


    for lend in lend_info:
        if  IsContainBook(lend.own_book_id , book_id ):
            return True

    return False


