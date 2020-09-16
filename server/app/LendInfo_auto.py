from models.config import Session
from models.lend_info import Lend_info
import datetime
from sqlalchemy import and_, or_

def IsLendInfoUpdate(lend):
    now_date = datetime.datetime.now()
    deadline_str = lend.deadline
    deadline = datetime.datetime.strptime(deadline_str,'%Y/%m/%d %H:%M:%S')
    return now_date > deadline

def AutoUpdateLendInfo():
    session = Session()

    lend_info = session.query(Lend_info).filter(
        Lend_info.is_valid,
   #     datetime.datetime.now() > datetime.datetime.strptime(Lend_info.deadline, '%Y/%m/%d %H:%M:%S')
   # ).query.update({ is_valid: False })
    ).all()

    if lend_info != [] :
        for lend in lend_info:
            if IsLendInfoUpdate(lend):
                print("Update "+str(lend.id)+"\n")
                lend.is_valid = False
            

    session.commit()





