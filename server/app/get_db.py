from models.config import session

from models.user import User
from models.book import Book
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


str = "kirin"

#ans = (GetUserLoginData(str))
#print(ans)




