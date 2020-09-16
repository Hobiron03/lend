
from models.config import session

from models.user import User
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from app.BookList import GetOwnBookById,GetOwnBookIDByUseridAndBookid
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

def AddLendInfoData(user_id_data,borrower_id_data,book_id_data,deadline_data):
    now_date = (datetime.datetime.now())
    #print(type(now_date))
    #print(now_date)
    now_date_str = now_date.strftime('%Y/%m/%d %H:%M:%S')
    #print(now_date_str)
    #Own_Bookの変換を行う
    own_book_id_data = (GetOwnBookIDByUseridAndBookid(user_id_data,book_id_data))

    #print(type(own_book_id_data))
    #print(own_book_id_data)
    if own_book_id_data == "Non":
        raise Exception('Error!You don\'t have your books')

    session.add_all([
        Lend_info( borrower_id = borrower_id_data,own_book_id = own_book_id_data,created_at = (now_date_str),returned_at= "Non",deadline = deadline_data,is_valid = 1)
    ])
    session.commit()

    print("データの追加が完了しました")


# 返却処理
def UpdateLendInfoData(user_id_data,book_id_data):
    #print(user_id_data)
    own_book_id_data = (GetOwnBookIDByUseridAndBookid(user_id_data,book_id_data))
    lends = session.query(Lend_info).filter(Lend_info.own_book_id == own_book_id_data).all()
    if lends == []:
        raise Exception('Error!')
    else:
        #print(lends)
        for lend in lends:
            lend.is_valid = False
            #print("valid",lend.is_valid)
            print("貸し出し終了しました")
        session.commit()

