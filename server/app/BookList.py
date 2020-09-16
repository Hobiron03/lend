from models.config import Session
#from models.config import session
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
from sqlalchemy import and_, or_
from app.LendInfo_auto import AutoUpdateLendInfo


def IsOwnBookAndId(own_book_id, user_id):
    session = Session()
    own_book =  session.query(Own_Book).filter(Own_Book.id == own_book_id )
    session.commit()
    if( own_book.count() == 0 ) :
        return False
    return own_book.first().user_id == int( user_id )

def IsLending(own_book_id):
    session = Session()
    user_lend_info = session.query(Lend_info).filter(
            and_(
                Lend_info.is_valid,
                Lend_info.own_book_id == own_book_id
            )
    )
    session.commit()
    if( user_lend_info.count() == 0 ) :
        return False
    return True

#lend_info => own_book
def GetOwnBookById(own_book_id):
    session = Session()
    own_book = session.query(Own_Book).filter(Own_Book.id == own_book_id).all()
    session.commit()
    return own_book #リスト

#own_book => book
def GetBookById(book_id):
    session = Session()
    book = session.query(Book).filter(Book.id == book_id).all()
    session.commit()
    return book #リスト


def ChangeBooksFromOwnBook(booklist):
    res = []
    for book in booklist:
        res.extend( GetBookById(book.book_id) )
    return res

def ChangeBooksFromLendInfo( booklist ):
    res = []
    for book in booklist:
        own_book = GetOwnBookById( book.own_book_id )
        if own_book != [] :
            res.extend( GetBookById( own_book[0].book_id ) )
    return res


def GetBookListByUser(user_id):
    session = Session() #こちらの方が適切かもしれない
    
    #Lend_infoの更新関数をここで呼び出す予定............................................................................................
    AutoUpdateLendInfo()


    #is_validを利用して判断する．
    #貸し出し中の本( いらないかも )
    user_lend_info_valid =  session.query(Lend_info).filter(
            and_(
                Lend_info.is_valid,
      #          IsOwnBookAndId( Lend_info.own_book_id, user_id )
            )
    ).all()
    

    user_lend_info = []
    if user_lend_info_valid != []:
        for user_lend in user_lend_info_valid:
            if IsOwnBookAndId( user_lend.own_book_id , user_id ) :
                user_lend_info.append( user_lend )



    #借りている本
    user_borrow_info = session.query(Lend_info).filter(
            and_(
                Lend_info.is_valid,
                Lend_info.borrower_id == user_id
            )
    ).all()

    
    
    booklist_user = session.query(Own_Book).filter(
        and_(
            Own_Book.user_id==user_id,
     #       not IsLending( Own_Book.id )
        )
    ).all()

    booklist = []
    if booklist_user != [] :
        for book in booklist_user :
            if not IsLending( book.id ):
                booklist.append( book )


    session.commit()
    str = []
    
    print(booklist )
    print(user_lend_info )
    print(user_borrow_info )

    if booklist != []:
        books = ChangeBooksFromOwnBook(booklist)
    
        for book in books:
            str.append( { "id" : book.id , "name" : book.name , "price" :book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url , "status": "having"} )

       # print(str)
    
    if user_borrow_info != []:
        books = ChangeBooksFromLendInfo(user_borrow_info)
        for book in books:
            str.append( { "id" : book.id , "name" : book.name , "price" :book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url , "status": "borrowing"} )
    #print(str)

    if user_lend_info != []:
        books = ChangeBooksFromLendInfo(user_lend_info)
        for book in books:
            str.append( { "id" : book.id , "name" : book.name , "price" :book.price, "image" : book.image , "info" : book.info , "auther" : book.auther , "url": book.url , "status": "lending"} )
        #print(str)


    return str



