from models.config import Session
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from models.notification import Notification
from sqlalchemy import and_, or_

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
    print(notification_list)
    return notification_list


def AddNotification(user_id_data,message_data):
    session = Session()
    now_date = (datetime.datetime.now())
    now_date_str = now_date.strftime('%Y/%m/%d %H:%M:%S')
    session.add_all([
        Notification( user_id = user_id_data , message = message_data ,created_at = now_date_str)
    ])
    session.commit()
    print("通知の追加が完了しました")


