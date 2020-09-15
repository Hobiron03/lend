# Flask

## 使うための前準備
#### ライブラリのインストール
1. コマンドでフォルダ内に移動し 
```bash
    $pip install -r requirements.txt
    または
    $py -m install -r requirements.txt
```
を実行する  



ローカル環境での実行方法

```bash
    export FLASK_APP=application.py
    flask run
```
#### WindowsのCMDプロンプトの場合
```bash
    set FLASK_APP=application.py
    flask run
```
#### Windowsのパワーシェルの場合
```bash
    $env:FLASK_APP = "application.py"
    flask run
```

127.0.0.1:5000にアクセスすることで利用できます.
#### DB初期設定
```bash
   python init_db.py
   python init_add_db.py
```


