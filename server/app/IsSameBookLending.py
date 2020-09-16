from models.config import Session
from models.lend_info import Lend_info
from models.own_book import Own_Book
from sqlalchemy import and_, or_

#借りる人が同じ本を借りたことがあるのかを判定
def IsSameBookLendgin(borrower_id,book_id):
    session = Session()
    lend_info = session.query(Lend_info).filter(

    )




