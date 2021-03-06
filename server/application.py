from flask import Flask, request ,session
from flask_restplus import Api, Resource, fields # Werkzeug==0.16.1が良い（Werkzeug 1.0.0のエラーらしい）
# https://qiita.com/sky_jokerxx/items/17481ffc34b52875528b よりSwaggerUIをFlaskで使う
from flask_cors import CORS, cross_origin
import json
from app.friend import GetUserFriendData,GetPointByUserId
from app.get_db import GetUserLoginData
from app.BookList import GetBookListByUser,IsOwnBookAndId
from app.add_db_LendInfo import AddLendInfoData,UpdateLendInfoData
from app.BuyBooks import AddOwnBooks
from app.StoreBook import AllBooks, BooksForUser
from app.PointAdd import AddPoint,GetLenderId
from app.friend import ChangeFriendlistToFriendData
from app.StoreBook import AllBooksByRank, BooksForUserByRank
from app.StoreBook import AllBooksByOwn, BooksForUserByOwn
from app.StoreBook import AllBooksByLend, BooksForUserByLend
from app.AddNotification import AddNotificationInBuy,AddNotificationInLend,AddNotificationInBorrow,AddNotificationInLendBuy,GetNotificationByUserId,AddNotificationInReturn

from app.IsHaveBook import IsHaveBook


app = Flask(__name__)
app.secret_key = 'シークレットキーです'
cors = CORS(app, supports_credentials=True) # Flask-CORSを使って有効化しました。フロント側でもリクエスト時に「withCredentials」をtrueにしてください
api = Api(app)

example_get_spec = api.model('Example GET', { #ドキュメントの名前を定義（説明の追加）
    'id': fields.String(description='example id'),
    'param': fields.String(description='example param')
})

@api.route('/example/<id>/<param>')
@api.doc(params={'id': 'id of example','param':'param of example'})
class Example(Resource): #RESTfull型の定義
    @api.marshal_with(example_get_spec) # マニュアルの追加
    def get(self, id, param):
        return {'id': id, 'param': param}

example2_post_spec = api.model('Example POST', {
    'name': fields.String(description='name of example2'),
    'param': fields.String(description='param of example2')
})

@api.route('/example2')
@api.expect(example2_post_spec)
class Example2(Resource):
    @api.marshal_with(example2_post_spec)
    def post(self):
        return {'name': request.json['name'], 'param': request.json['param']}


Login_doc = api.model('Login POST', { #ドキュメントの名前を定義（説明の追加）
    'name': fields.String(description='name'),
    'password': fields.String(description='password')
})

@api.route('/login')
#@api.doc(params={'name': 'kirin','password':'pass'})
class Login(Resource):
    #@api.marshal_with(Login_doc)
    def post(self):
        if session.get('logged_in') == True: #ログインしていたら表示
            return {'message': 'すでにログインしています。'}
        else:
            print("ログイン画面")
            logindata = request.json #送られてきたデータの取得
            print(logindata)
            name = logindata['name']
            password = logindata['password']
            print(name,password) #デバック
            #データベースの取得
            print("name",name)
            LoginDatabase = GetUserLoginData(str(name))
            print(LoginDatabase)
            if LoginDatabase == None:
                return { 'message': 'Error.Wrong name or password'},401
            else:
                if password == LoginDatabase[3]: # データベースからパスワード
                    print('ログイン成功')
                    session['logged_in'] = True
                    #フレンドIDからフレンド情報を取得するやつをかく
                    print(type((LoginDatabase[5])))
                    friend_list_data = LoginDatabase[5].strip("[")
                    friend_list_data = friend_list_data.strip("]")
                    friend_list_data = friend_list_data.split(",")
                    print(friend_list_data)
                    friend_info_data =[] # これを格納する
                    for i in range(len(friend_list_data)):
                        friend_info_data.append((ChangeFriendlistToFriendData(friend_list_data[i])))
                    print(friend_info_data)

                    json_text = {'id':(LoginDatabase[0]),'icon_image':(LoginDatabase[1]),'name':(LoginDatabase[2]),'password':(LoginDatabase[3]),'point':(LoginDatabase[4]),'friend_list':friend_info_data}
                    print(json_text)

                    return json_text
                else:
                    return {'message':'Error.Wrong name or password!'},401

@api.route('/logout')
class Logout(Resource):
    def post(self):
        session['logged_in'] = False
        return {"message":"Success."}

@api.route('/books')
class BookList(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        if user_id is None:
            return "パラメータが不適切です"
        booklist = GetBookListByUser(user_id)
        return booklist

@api.route('/store')
class store(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        if user_id is None:
            booklist = AllBooks()
            return booklist
        else :
            booklist = BooksForUser(user_id)
            return booklist


@api.route('/store/rank') #(貸出+購入)順
class BookStoreRank(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        if user_id is None:
            booklist = AllBooksByRank()
            return booklist
        else :
            booklist = BooksForUserByRank(user_id)
            return booklist

@api.route('/store/own') #購入順
class BookStoreOwn(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        if user_id is None:
            booklist = AllBooksByRank()
            return booklist
        else :
            booklist = BooksForUserByRank(user_id)
            return booklist

@api.route('/store/lend') #貸出数順
class BookStoreLend(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        if user_id is None:
            booklist = AllBooksByRank()
            return booklist
        else :
            booklist = BooksForUserByRank(user_id)
            return booklist


# 書籍の貸し出し
Lend = api.model('lend POST', { #ドキュメントの名前を定義（説明の追加）
    'id': fields.String(description='id'),
    'borrower_id': fields.String(description='borrower_id'),
    'book_id': fields.String(description='book_id'),
    'deadline': fields.String(description='deadline')
})
@api.route('/lend')
@api.doc(params={ "id": "1", "borrower_id": "2", "book_id": '1', "deadline": "2020-09-22 12:26:48.084076" })
class BookLend(Resource):
    #@api.marshal_with(Lend)
    def post(self):
        #try:
            lend_data = request.json #送られてきたデータの取得
            user_id = lend_data['id']
            borrower_id = lend_data['borrower_id']
            book_id = lend_data['book_id']
            deadline = lend_data['deadline']
            #print("返却時間",deadline)
            # bookIDが持っている書籍化を判別
            if IsHaveBook(book_id,user_id) == False:
                return {'message':"Error.You don't have a book!"}

            # ここに友達じゃない時の処理をかく！！
            friend_list = GetUserFriendData(user_id)
            if borrower_id not in friend_list:
                print("貸し出す相手が友達ではありません")
                return {"message":"Error. You are not friends!!"},401
            # Lend_infoデータベースにデータを送る
            try:
                print((user_id,borrower_id,book_id,deadline))
                AddLendInfoData(user_id,borrower_id,book_id,deadline)
                # 本を貸しだしの通知
                AddNotificationInLend(user_id,borrower_id,book_id) # 貸す側の通知
                AddNotificationInBorrow(user_id,borrower_id,book_id) #貸してもらった側の通知
                return {'message':'Success'}
            except:
                return {'message':'Error.Please try again.'},401
        #except:
            #return {'message':'Error. Please try again.'},500


# 書籍の返却
Lend = api.model('lend POST', { #ドキュメントの名前を定義（説明の追加）
    'id': fields.String(description='id'),
    'book_id': fields.String(description='book_id')
})
@api.route('/return_book')
class ReturnBook(Resource):
    def post(self):
        try:
            lend_data = request.json #送られてきたデータの取得
            user_id = lend_data['id']
            book_id = lend_data['book_id']
            message = lend_data['message']
            lend_user_id = GetLenderId(user_id,book_id) # 貸してくれた人の情報の取得
            print("lend_user_id",lend_user_id)
            UpdateLendInfoData(lend_user_id,book_id)
            # 返却されたことを相手に通知する
            AddNotificationInReturn(lend_user_id,user_id,book_id,message) #メッセージの追加（返却がされたという情報＋メッセージ）
            return {'message':'Success'}
        except:
            return {'message':'Error. Please try again.'},401


# 書籍の購入
BuyDoc = api.model('buy POST', { #ドキュメントの名前を定義（説明の追加）
    'user_id': fields.String(description='user_id'),
    'book_id': fields.String(description='book_id'),
    'point': fields.String(description='point')
})

@api.route('/buy')
class BuyBooks(Resource):
    #@api.marshal_with(BuyDoc)
    def post(self):
        buy_book_data = request.json
        user_id_data = buy_book_data['id']
        book_id_data = buy_book_data['book_id']
        point_data = buy_book_data['point'] # (拡張機能、デフォルトで０)
        point_data = 0

        # 書籍の購入を行う
        try:
            AddOwnBooks(user_id_data,book_id_data)
            AddNotificationInBuy(user_id_data,book_id_data) # 購入時の通知の追加
            # 貸してくれたものを買ってくれた時にポイントを追加する
            lend_user_id = GetLenderId(user_id_data,book_id_data)
            if lend_user_id != None:
                print("ポイント付与相手",lend_user_id)
                add_point = 30
                AddPoint(lend_user_id, add_point)
                AddNotificationInLendBuy(lend_user_id,user_id_data,book_id_data,add_point) # 貸してくれた人に通知
                print("付与か完了しました")
            return {"message":"Success."}
        except:
            return {"message":"Error.Please try again"},500

# 通知の取得
@api.route('/notification')
class Notification(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        notification_list = GetNotificationByUserId(user_id)
        return notification_list

@api.route('/point')
class Point(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        point_data = GetPointByUserId(user_id)
        print(point_data)
        return {'point':point_data}

# ポイントの取得

if __name__ == '__main__':
    app.run()
