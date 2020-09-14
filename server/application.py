from flask import Flask, request
from flask_restplus import Api, Resource, fields # Werkzeug==0.16.1が良い（Werkzeug 1.0.0のエラーらしい）
# https://qiita.com/sky_jokerxx/items/17481ffc34b52875528b よりSwaggerUIをFlaskで使う
app = Flask(__name__)
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


if __name__ == '__main__':
    app.run()
