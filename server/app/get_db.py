from models.config import session

from models.user import User
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
import os

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

def GetLendData(id):
    print(type(id))
    select = (id)
    print("select",select)
    users = session.query(Lend_info).filter(Lend_info.id==id).all()
    session.commit()
    if users ==[]:
        return None
    for row in users:
        return [row.id,row.borrower_id,row.own_book_id,row.created_at,row.returned_at,row.deadline,row.is_valid]


str = "kirin"

#ans = (GetUserLoginData(str))
#print(ans)




