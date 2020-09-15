from models.config import engine
from models.config import session
from app.add_db_LendInfo import AddLendInfoData
from datetime import datetime ,date, timedelta
from models.lend_info import Lend_info


user_id_data = 1
borrower_id_data = 2
book_id_data = 1
now_date = datetime.now()
deadline_data = (now_date + timedelta(days=7))


now_date_string = now_date.strftime('%Y/%m/%d %H:%M:%S')
deadline_date_string = deadline_data.strftime('%Y/%m/%d %H:%M:%S')

print(now_date_string,deadline_date_string)

#AddLendInfoData(user_id_data,borrower_id_data,book_id_data,deadline_data)


now_date = datetime.now()
print(now_date)
tomorrow = now_date + timedelta(days=7)
a =  str(tomorrow)
print(type(a))
print(str(now_date))
print(str(tomorrow))

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

print(GetLendData(1))