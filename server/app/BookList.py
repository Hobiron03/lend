from models.config import Session
#from models.config import session
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from sqlalchemy import and_, or_

def IsOwnBookAndId(own_book_id, user_id):
    session = Session()
    own_book =  session.query(Own_Book).filter(Own_Book.id == own_book_id )
    if( own_book.count() == 0 ) :
        return False
    session.commit()
    return own_book.first().user_id == user_id

def IsLending(own_book_id):
    session = Session()
    user_lend_info = session.query(Lend_info).filter(
            Lend_info.is_valid,
            Lend_info.own_book_id == own_book_id
    )
    if( user_lend_info.count() == 0 ) :
        return False
    session.commit()
    return True

def GetBookById(book_id):
    session = Session()
    book = session.query(Book).filter(Book.id == book_id).all()
    session.commit()
    return book #リスト?


def ChangeBooksFromOwnBook(booklist):
    res = []
    for book in booklist:
        res.extend( GetBookById(book.book_id) )
    return res


def GetBookListByUser():
    session = Session() #こちらの方が適切かもしれない
    user_id = 1
    print(user_id)
    print(type(user_id) )
    
    #Lend_infoの更新関数をここで呼び出す予定............................................................................................
    


    #is_validを利用して判断する．
    #貸し出し中の本( いらないかも )
    user_lend_info =  session.query(Lend_info).filter(
            and_(
                Lend_info.is_valid,
                IsOwnBookAndId( Lend_info.own_book_id, user_id )
            )
    ).all()


    #借りている本
    user_borrow_info = session.query(Lend_info).filter(
            and_(
                Lend_info.is_valid,
                Lend_info.borrower_id == user_id
            )
    ).all()

    
    
    booklist = session.query(Own_Book).filter(
            or_(
                and_(
                    Own_Book.user_id==user_id,
                    not IsLending( Own_Book.id )
                ),

            )
    ).all()

    session.commit()
    str = []
    
    #print(type(booklist) )
    #print(type(user_lend_info) )
    #print(type(user_borrow_info) )

    if booklist != []:
        books = ChangeBooksFromOwnBook(booklist)
    
        for book in books:
            str.append( { "id" : book.id , "name" : book.name , "price" :book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url , "status": "having"} )

        print(str)
    
    return str



