from models.config import Session
from models.lend_info import Lend_info
import datetime
from sqlalchemy import and_, or_
from models.own_book import Own_Book
from app.AddNotification import AddNotificationInReturn

def IsLendInfoUpdate(lend):
    now_date = datetime.datetime.now()
    now_date_str = str(now_date)
    print(now_date_str,type(now_date_str))
    #now_date = datetime.datetime.strptime(now_date_str,'%Y/%m/%d %H:%M:%S')
    deadline = lend.deadline
    print("返還前",deadline,now_date)
    deadline_after = datetime.datetime.strptime(deadline,'%Y/%m/%d %H:%M:%S.%f')
    print(now_date,deadline_after)
    return now_date > deadline_after


def GetBookIdByOwn( own_id ):
    session = Session()
    booklist = session.query( Own_Book ).filter(
            Own_Book.id == own_id
    ).all()
    session.commit()
    return booklist


def AutoUpdateLendInfo():
    session = Session()

    lend_info = session.query(Lend_info).filter(
        Lend_info.is_valid,
   #     datetime.datetime.now() > datetime.datetime.strptime(Lend_info.deadline, '%Y/%m/%d %H:%M:%S')
   # ).query.update({ is_valid: False })
    ).all()

    if lend_info != [] :
        for lend in lend_info:
            if IsLendInfoUpdate(lend):
                print("Update "+str(lend.id)+"\n")
                lend.is_valid = False
                own_info = GetBookIdByOwn( lend.own_book_id )
                user_id = own_info[0].user_id
                book_id = own_info[0].book_id
                borrower_id = lend.borrower_id
                AddNotificationInReturn( user_id , borrower_id, book_id, "自動返却による返却" )

    session.commit()





