from models.config import Session
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from models.notification import Notification
from sqlalchemy import and_, or_
#from app.BookList import GetBookById
from app.GetBookById import GetBookById
from app.friend import ChangeFriendlistToFriendData

from datetime import  date, timedelta
import datetime

def GetNotificationByUserId(user_id): #全ての通知を取得する
    session = Session()
    notification = session.query(Notification).filter(Notification.user_id == user_id)
    session.commit()
    notification_list = []
    if notification != []:
        for noti in notification:
            notification_list.append( {"user_id":noti.user_id,"message":noti.message,"created_at":noti.created_at})
    notification_list.reverse() # 通知を反転する（上が新しい物にする）
    print(notification_list)
    return notification_list


def AddNotification(user_id_data,message_data): # 通知を追加する
    session = Session()
    now_date = (datetime.datetime.now())
    now_date_str = now_date.strftime('%Y/%m/%d %H:%M:%S.%f')
    session.add_all([
        Notification( user_id = user_id_data , message = message_data ,created_at = now_date_str)
    ])
    session.commit()
    print("通知の追加が完了しました")

# 購入時の追加
def AddNotificationInBuy(user_id,book_id):
    book_info = GetBookById(book_id)
    message = "「"+str(book_info[0]) + "」を購入しました"
    AddNotification(user_id,message)

# 本を貸した時
def AddNotificationInLend(user_id,borrower_id,book_id):
    book_info = GetBookById(book_id)
    name = ChangeFriendlistToFriendData(borrower_id)[2]
    message = str(name) + "さんに「" + str(book_info[0]) + "」を貸しました。"
    AddNotification(user_id,message)

# 本を貸してくれた時
def AddNotificationInBorrow(user_id,borrower_id,book_id):
    book_info = GetBookById(book_id)
    name = ChangeFriendlistToFriendData(user_id)[2]
    message = str(name) + "さんが「" + str(book_info[0]) + "」を貸してくれました。"
    AddNotification(borrower_id,message) # 借りた側に通知がいく

# 友達が購入してくれた
def AddNotificationInLendBuy(user_id,borrower_id,book_id,addpoint):
    book_info = GetBookById(book_id)
    name = ChangeFriendlistToFriendData(borrower_id)[2]
    message = str(name) + "さんが「" + str(book_info[0]) + "」を購入しました。" + str(addpoint) +"ポイントが追加されました。"
    print(user_id,message)
    AddNotification(user_id,message) # 貸してくれた人に通知がいく

# 返却した時のメッセージ機能
def AddNotificationInReturn(user_id,borrower_id,book_id,return_message):
    book_info = GetBookById(book_id)
    name = ChangeFriendlistToFriendData(borrower_id)[2]
    message = str(name) + "さんが「" + str(book_info[0]) + "」を返却しました。"
    if return_message != None:
        message = message + "\n（コメント）" + return_message # 返却時にメッセージを追加する
    print(user_id,message)
    AddNotification(user_id,message) # 貸してくれた人に通知がいく
    # 返却しましたの通知の追加
    lender_name = ChangeFriendlistToFriendData(user_id)[2]
    message_lend = "「" + str(book_info[0]) + "」を"+ str(lender_name) +"さんに返却しました。"
    AddNotification(borrower_id,message_lend)

def AddNotificationInAutoReturn(user_id,borrower_id,book_id):
    book_info = GetBookById(book_id)
    name = ChangeFriendlistToFriendData(borrower_id)[2]
    message = str(name) + "さんが「" + str(book_info[0]) + "」を自動返却しました。"
    AddNotification(user_id,message) # 貸してくれた人に通知がいく
    # 返却しましたの通知の追加
    lender_name = ChangeFriendlistToFriendData(user_id)[2]
    message_lend = "「" + str(book_info[0]) + "」を"+ str(lender_name) +"さんに自動返却しました。"
    AddNotification(borrower_id,message_lend)