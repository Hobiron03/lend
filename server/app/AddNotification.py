from models.config import Session
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from models.notification import Notification
from sqlalchemy import and_, or_


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

def AllBooks(): #基本機能全てを出す
    session = Session()
    booklist = session.query(Book).all()

    session.commit()
    store = []
    if booklist != []:
        for book in booklist:
            store.append( { "id" : book.id , "name" : book.name , "price" : book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url.split(',') } )

    return store

