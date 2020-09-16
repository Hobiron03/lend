
from models.config import session

from models.user import User
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
import os

from datetime import  date, timedelta
import datetime


def GetUserFriendData(user_id):
    users = session.query(User).filter(User.id==user_id).all()
    session.commit()
    if users ==[]:
        return None
    for row in users:
        return row.friend_list

def ChangeFriendlistToFriendData(friend_id): #フレンドidから名前と画像を取得
    users = session.query(User).filter(User.id==friend_id).all()
    session.commit()
    if users ==[]:
        return None
    for row in users:
        return [row.id,row.icon_image,row.name]
