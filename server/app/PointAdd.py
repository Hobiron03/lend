from models.config import Session
from models.user import User

def AddPoint(user_id, add_point):
    session = Session()
    session.query(User).filter(
            User.id == user_id
    ).update( { User.point : User.point + add_point } )
    session.commit()


