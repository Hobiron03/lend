from models.config import session

from models.user import User
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
import os


ImageDir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'images/')

session.add_all([
    User( icon_image = ImageDir+"icon_1.jpg", name = "kirin" , password = "pass", point=0, friend_list = "[2,4,5]"),
    User( icon_image = ImageDir+"icon_2.jpg", name = "usagi" , password = "pass", point=10, friend_list = "[1,3]"),
    User( icon_image = ImageDir+"icon_3.jpg", name = "kame" , password = "pass", point=1000, friend_list = "[2]"),
    User( icon_image = ImageDir+"icon_4.jpg", name = "lion" , password = "pass", point=100, friend_list = "[1,5]"),
    User( icon_image = ImageDir+"icon_5.jpg", name = "zou" , password = "pass", point=10, friend_list = "[1,4]")] )

session.add_all([
    Book( name="キリンの翼", price=100, image=ImageDir+"1.jpg", url = ImageDir+"1.jpg" , info ="Tsubasa", auther = "Me"),
    Book( name="キリンの刃", price=1000, image=ImageDir+"2.jpg", url = ImageDir+"2.jpg", info="....あれから3年....", auther = "You" ),
    Book( name="3匹のキリン", price=10000, image=ImageDir+"3.jpg", url = ImageDir+"3.jpg", info="物語は~~~から始まった", auther ="He"),
    Book( name="キリンビール", price=5000, image=ImageDir+"4.jpg", url = ImageDir+"4.jpg", info="nof" , auther = "She" ),
    Book( name="Kirin", price=777, image=ImageDir+"5.jpg", url = ImageDir+"5.jpg", info="beautiful" , auther="We"  )])

session.add_all([
    Own_Book( user_id = 1 , book_id = 1 ),
    Own_Book( user_id = 1 , book_id = 2 ),
    Own_Book( user_id = 1 , book_id = 3 ),
    Own_Book( user_id = 1 , book_id = 4 ),
    Own_Book( user_id = 1 , book_id = 5 ),
    Own_Book( user_id = 2 , book_id = 1 ),
    Own_Book( user_id = 2 , book_id = 2 ),
    Own_Book( user_id = 3 , book_id = 3 ),
    Own_Book( user_id = 3 , book_id = 4 ),
    Own_Book( user_id = 5 , book_id = 5 )])



session.commit()

