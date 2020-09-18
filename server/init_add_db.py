from models.config import session

from models.user import User
from models.book import Book
from models.own_book import Own_Book
from models.lend_info import Lend_info
import os

import datetime


#ImageDir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'images/')
ImageDir = "http://localhost:5000/static/images/"

session.add_all([
    User( icon_image = ImageDir+"icon_1.jpg", name = "kirin" , password = "pass", point=0, friend_list = "[2,4,5]"),
    User( icon_image = ImageDir+"icon_2.jpg", name = "usagi" , password = "pass", point=10, friend_list = "[1,3]"),
    User( icon_image = ImageDir+"icon_3.jpg", name = "kame" , password = "pass", point=1000, friend_list = "[2]"),
    User( icon_image = ImageDir+"icon_4.jpg", name = "lion" , password = "pass", point=100, friend_list = "[1,5]"),
    User( icon_image = ImageDir+"icon_5.jpg", name = "zou" , password = "pass", point=10, friend_list = "[1,4]")] )

mangalist = [ImageDir+"p1.png", ImageDir+"p2.png" , ImageDir+"p3.png" , ImageDir+"p4.png" ]
mangastr = ','.join(mangalist)

defaultpass = ImageDir+"default/"
defaultlist = [ defaultpass+"1.png", defaultpass+"2.png",defaultpass+"3.png", defaultpass+"4.png" ]
defaultmanga = ','.join(defaultlist)

kirinpass = ImageDir+"kirin/"
kirin_tlist = [ kirinpass+"kirinnotsubasa-1.png",kirinpass+"kirinnotsubasa-2.png",kirinpass+"kirinnotsubasa-3.png"]
kirin_tmanga = ','.join(kirin_tlist)
kirin_ylist = [ kirinpass+"kirinnoyaiba-1.png",kirinpass+"kirinnoyaiba-2.png",kirinpass+"kirinnoyaiba-3.png"]
kirin_ymanga =  ','.join(kirin_ylist)
kirin_3list = [ kirinpass+"kirinn3-1.png",kirinpass+"kirinn3-2.png",kirinpass+"kirinn3-3.png" ]
kirin_3manga =  ','.join(kirin_3list)


session.add_all([
    Book( name="ブラックジャックによろしく", price=600, image=kirinpass+"hello.png", url = mangastr , info ="研修医が目にする日本の大学病院や医療現場の現状を描く。", auther = "佐藤秀峰"),
    Book( name="キリンの翼", price=100, image=kirin_tlist[0] , url = kirin_tmanga , info ="ドラマ化もされた人気マンガ。東京を舞台にした殺人事件を描く。", auther = "山田次郎"),
    Book( name="キリンの刃", price=1000, image=kirin_ylist[0], url = kirin_ymanga , info="キリンとキリンが刃を持って戦う！新感覚アドベンチャー！", auther = "杉山健一" ),
    Book( name="3匹のキリン", price=800, image=kirin_3list[0] , url = kirin_3manga , info="物語はxxxから始まった。全米が泣いた人気マンガが遂に日本上陸。", auther ="林四郎"),
    Book( name="キリンなレモン", price=550, image=kirinpass+"lemon.png", url = ImageDir+"4.jpg", info="美味しい飲み物ではありません。楽しいマンガです。" , auther = "松江宏樹" ),
    Book( name="Kirin", price=777, image=ImageDir+"5.jpg", url = ImageDir+"5.jpg", info="累計発行部数1億部突破の大人気コミック。" , auther="落合由香" ),
    Book( name="Defalt", price=0 , image = defaultpass+"1.png" , url = defaultmanga , info="No manga No life.", auther="広井淳二" ),
    Book( name="リスとキリン", price=500 , image = kirinpass+"RisutoKirin.png" , url = defaultmanga , info="ある日、リスはキリンと出会った", auther="前川紀子" ),
    Book( name="きりんな人たち", price=810 , image = kirinpass+"kirinnokao.png" , url = defaultmanga , info="きりんの顔を見てみよう...様々なキリンの顔を集めた大人気写真集。", auther="魚田和子" )
    ])

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
"""
return_date = 7
session.add.all([
    Lend_info(id = 1, borrower_id = 1,own_book_id = 1,created_at = str(datetime.datetime.now()),returned_at= "Non",deadline = str(datetime.datetime.now()),is_valid = 1)
])
"""



session.commit()

