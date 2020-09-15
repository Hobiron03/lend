import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import { TabBar } from "./components/organizations/TabBar/TabBar";
import AppBar from "./components/organizations/AppBar/AppBar";
import BottomBar from "./components/organizations/BottomBar/BottomBar";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* ログイン/ユーザー登録ページ */}
          <Route path="/login" component={Login} />

          {/* マイ本棚 */}
          <Route path="/mybook" component={() => <div style={{ padding: '100px' }}>/mybook 未実装</div>} />
          {/* 友達ページ */}
          <Route path="/friend" component={() => <div style={{ padding: '100px' }}>/friend 未実装</div>} />
          {/* ストアページ */}
          <Route path="/store" component={() => <div style={{ padding: '100px' }}>/store 未実装</div>} />
          {/* 限定コンテンツ一覧ページ */}
          <Route path="/contents-store" component={() => <div style={{ padding: '100px' }}>/contents-store 未実装</div>} />
          {/* 設定ページ */}
          <Route path="/settings" component={() => <div style={{ padding: '100px' }}>/settings 未実装</div>} />

          {/* 書籍ビュワー */}
          <Route path="/mybook/:bookid/read" component={() => <div style={{ padding: '100px' }}>/mybook/:bookid/read 未実装</div>} />

          {/* 貸し出し友達選択ページ */}
          <Route path="/mybook/:bookid/lend" component={() => <div style={{ padding: '100px' }}>/mybook/:bookid/lend 未実装</div>} />

          {/* 友達追加ページ */}
          <Route path="/friend/create" component={() => <div style={{ padding: '100px' }}>/friend/create 未実装</div>} />
          {/* 自分のパスコード確認ページ */}
          <Route path="/friend/mypass" component={() => <div style={{ padding: '100px' }}>/friend/mypass 未実装</div>} />


          {/* 書籍詳細ページ */}
          <Route path="/store/:bookid" component={() => <div style={{ padding: '100px' }}>/store/:bookid 未実装</div>} />
          {/* 書籍決済ページ */}
          <Route path="/store/:bookid/cart" component={() => <div style={{ padding: '100px' }}>/store/:bookid/cart 未実装</div>} />

          {/* 所持している限定コンテンツ一覧ページ */}
          <Route path="/contents-own" component={() => <div style={{ padding: '100px' }}>/contents-own 未実装</div>} />
          {/* 所持している限定コンテンツ詳細ページ（書籍ならビュワーに飛ばしても良いかも） */}
          <Route path="/contents-own/:contentsId" component={() => <div style={{ padding: '100px' }}>/contents-own/:contentsId 未実装</div>} />
          {/* 未所持の限定コンテンツ詳細・交換ぺージ */}
          <Route path="/contents-store/:contentsId" component={() => <div style={{ padding: '100px' }}>/contents-store/:contentsId 未実装</div>} />

          <Redirect to="/store"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
