from flask import Flask, request ,session
from flask_restplus import Api, Resource, fields # Werkzeug==0.16.1が良い（Werkzeug 1.0.0のエラーらしい）
# https://qiita.com/sky_jokerxx/items/17481ffc34b52875528b よりSwaggerUIをFlaskで使う

import json
from app.get_db import GetUserLoginData
from app.BookList import GetBookListByUser
from app.add_db_LendInfo import AddLendInfoData

app = Flask(__name__)
app.secret_key = 'シークレットキーです'
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

@api.route('/login')
@api.doc(params={'name': 'kirin','password':'pass'})
class Login(Resource):
    @api.marshal_with(example_get_spec)
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
        booklist = GetBookListByUser()
        return str(booklist)










# 書籍の貸し出し
@api.route('/lend')
class BookLend(Resource):
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





if __name__ == '__main__':
    app.run()
