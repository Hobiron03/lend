
from models.config import session

from models.user import User
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
import os

from datetime import  date, timedelta
import datetime


def GetUserLoginData(UserName):
    print(type(UserName))
    select = (UserName)
    print("select",select)
    users = session.query(User).filter(User.name==select).all()
    session.commit()
    if users ==[]:
        return None
    for row in users:
        return [row.id,row.icon_image,row.name,row.password,row.point,row.friend_list]


str = "kirin"

#ans = (GetUserLoginData(str))
#print(ans)
user_id_data = 1
borrower_id = 2
book_id = 1
deadline = 4
def AddLendInfoData(user_id_data,borrower_id_data,book_id_data,deadline_data):
    return_date = 7
    now_date = (datetime.datetime.now())
    print(type(now_date))
    print(now_date)
    now_date_str = now_date.strftime('%Y/%m/%d %H:%M:%S')
    print(type(now_date_str))

    session.add_all([
        Lend_info(id = 1, borrower_id = 1,own_book_id = 1,created_at = (now_date),returned_at= "Non",deadline = deadline_data,is_valid = 1)
    ])
    session.commit()
    print("データの追加が完了しました")


