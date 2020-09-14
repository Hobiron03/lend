from flask import Flask, request ,session
from flask_restplus import Api, Resource, fields # Werkzeug==0.16.1が良い（Werkzeug 1.0.0のエラーらしい）
# https://qiita.com/sky_jokerxx/items/17481ffc34b52875528b よりSwaggerUIをFlaskで使う

import json
from app.get_db import GetUserLoginData
from app.BookList import GetBookListByUser

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
class Login(Resource):
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
                    #json_text = "{'id':"+ "'"+str(LoginDatabase[0])+ "','image_icon':" + "'"+str(LoginDatabase[1]+"'}"
                    return LoginDatabase
                else:
                    return {'message':'Error.Wrong name or password!'}

@api.route('/logout')
class Logout(Resource):
    def post(Resource):
        session['logged_in'] = False

@api.route('/books')
class BookList(Resource):
    def get(self):
        booklist = GetBookListByUser()
        return str(booklist)


if __name__ == '__main__':
    app.run()
