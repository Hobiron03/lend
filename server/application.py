from flask import Flask, request ,session
from flask_restplus import Api, Resource, fields # Werkzeug==0.16.1が良い（Werkzeug 1.0.0のエラーらしい）
# https://qiita.com/sky_jokerxx/items/17481ffc34b52875528b よりSwaggerUIをFlaskで使う
from flask_cors import CORS, cross_origin
import json
from app.get_db import GetUserLoginData
from app.BookList import GetBookListByUser
from app.add_db_LendInfo import AddLendInfoData,UpdateLendInfoData

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
@api.doc(params={'name': 'kirin','password':'pass'})
class Login(Resource):
    @api.marshal_with(Login_doc)
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
                return { 'message': 'Error.Wrong name or password'}
            else:
                if password == LoginDatabase[3]: # データベースからパスワード
                    print('ログイン成功')
                    session['logged_in'] = True
                    #フレンドIDからフレンド情報を取得するやつをかく
                    json_text = "{'id':"+ "'"+str(LoginDatabase[0])+ "','icon_image':'"+str(LoginDatabase[1])+ ",'name':'"+str(LoginDatabase[2])+ "','password':'"+str(LoginDatabase[3])+ "','point':'"+str(LoginDatabase[4])+ "','friend_list':'"+str(LoginDatabase[5])+ "'}"
                    print(json_text)
                    return json_text
                else:
                    return {'message':'Error.Wrong name or password!'}

@api.route('/logout')
class Logout(Resource):
    def post(self):
        session['logged_in'] = False

@api.route('/books')
class BookList(Resource):
    def get(self):
        user_id = request.args.get('user_id')
        if user_id is None:
            return "パラメータが不適切です"
        booklist = GetBookListByUser(user_id)
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
    @api.marshal_with(Lend)
    def post(self):
        #try:
            lend_data = request.json #送られてきたデータの取得
            user_id = lend_data['id']
            borrower_id = lend_data['borrower_id']
            book_id = lend_data['book_id']
            deadline = lend_data['deadline']
            # bookIDが持っている書籍化を判別

            # Lend_infoデータベースにデータを送る
            try:
                print((user_id,borrower_id,book_id,deadline))
                AddLendInfoData(user_id,borrower_id,book_id,deadline)
                return {'message':'Success'}
            except:
                return {'message':'Error.Please try again.'}

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
            UpdateLendInfoData(user_id,book_id)
            return {'message':'Success'}
        except:
            return {'message':'Error. Please try again.'}




if __name__ == '__main__':
    app.run()
