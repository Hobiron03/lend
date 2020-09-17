from models.config import engine
from models.config import session
from app.add_db_LendInfo import AddLendInfoData,UpdateLendInfoData
from app.get_db import GetLendData
from datetime import datetime ,date, timedelta
from models.lend_info import Lend_info
from app.BookList import GetOwnBookIDByUseridAndBookid,GetOwnBookById
from app.BuyBooks import AddOwnBooks
from app.AddNotification import GetNotificationByUserId,AddNotification,AddNotificationInBuy

user_id_data = 1
borrower_id_data = 4

book_id_data = 5

now_date = datetime.now()
deadline_data = (now_date + timedelta(minutes=60))

now_date_string = now_date.strftime('%Y/%m/%d %H:%M:%S')
deadline_date_string = deadline_data.strftime('%Y/%m/%d %H:%M:%S')

print(now_date_string,deadline_date_string)

AddLendInfoData(user_id_data,borrower_id_data,book_id_data,deadline_date_string)

#print(GetLendData(GetOwnBookIDByUseridAndBookid(2,6)))
#UpdateLendInfoData(2,6) # 貸し出し処理の終了
#print(GetOwnBookIDByUseridAndBookid(1,1))
#print(GetLendData(1))



"""
now_date = datetime.now()
print(now_date)
tomorrow = now_date + timedelta(days=7)
a =  str(tomorrow)
print(type(a))
print(str(now_date))
print(str(tomorrow))

print(GetLendData(1))

#UpdateLendInfoData(1,1)
#print(GetLendData(1))
"""

#AddOwnBooks(2,6)
#print(GetOwnBookIDByUseridAndBookid(2,6))


# 通知機能のテスト
AddNotification(1,"今日は快晴です")
print(GetNotificationByUserId(1))
AddNotificationInBuy(1,1)
