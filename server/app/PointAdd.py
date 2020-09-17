from models.config import Session
from models.user import User
from models.own_book import Own_Book
from models.lend_info import Lend_info

def AddPoint(user_id, add_point):
    session = Session()
    session.query(User).filter(
            User.id == user_id
    ).update( { User.point : User.point + add_point } )
    session.commit()

# 本が以前に貸し出されたものであるかどうかを判別し、貸してくれた人のユーザidを取得する
def GetLenderId(user_id_data,book_id_data):
    session = Session()
    borrowed_list = session.query(Lend_info).filter(Lend_info.borrower_id == user_id_data)# 以前に貸し出された本のリスト
    # 貸し出されたリストの中から、今回の本のidを探索する
    borrowed_data_list =[]
    for borrowed in borrowed_list:
        list = []
        list.append(borrowed.id)
        ower_user_id,ower_book_id = GetLendUserAndBookIdByOwnBookId(borrowed.own_book_id) # own_book_idから情報を取得
        list.append(ower_user_id)
        list.append(ower_book_id)
        borrowed_data_list.append(list)
    session.commit()
    #print(borrowed_data_list) # [[lend_id,ower_user_id,ower_book_id][...]]

    # 過去に貸し出されたかどうかを探す
    for i in range(len(borrowed_data_list)):
        if borrowed_data_list[i][2] == book_id_data: # 貸し出しの履歴の中に本の履歴があったら
            lend_user_id = borrowed_data_list[i][1]
            print("貸してくれた人：",lend_user_id,"｜貸し出された本",book_id_data)
            return lend_user_id

    # 貸し出されていなかった場合
    print("貸し出されていなかったです。")
    return None

def GetLendUserAndBookIdByOwnBookId(own_book_id_data):# ownBookからowerとbookを選択
    session = Session()
    bookdata = session.query(Own_Book).filter(Own_Book.id == own_book_id_data).all()
    for book in bookdata:
        ower_user_id = book.user_id
        ower_book_id = book.book_id
    return ower_user_id,ower_book_id



