import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Screen from "./components/Screen/Screen";
import { TabBar } from "./components/organizations/TabBar/TabBar";
import AppBar from "./components/organizations/AppBar/AppBar";
import BottomBar from "./components/organizations/BottomBar/BottomBar";
import "./App.scss";
import Viewer from './components/Viewer/Viewer'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* ログイン/ユーザー登録ページ */}
          <Route exact path="/login" component={Login} />

          {/* マイ本棚 */}
          <Route exact path="/mybook" component={() => <Screen><div style={{ padding: '100px' }}>/mybook 未実装</div></Screen>} />
          {/* 友達ページ */}
          <Route exact path="/friend" component={() => <Screen><div style={{ padding: '100px' }}>/friend 未実装</div></Screen>} />
          {/* ストアページ */}
          <Route exact path="/store" component={() => <Screen><div style={{ padding: '100px' }}>/store 未実装</div></Screen>} />
          {/* 限定コンテンツ一覧ページ */}
          <Route exact path="/contents-store" component={() => <Screen><div style={{ padding: '100px' }}>/contents-store 未実装</div></Screen>} />
          {/* 設定ページ */}
          <Route exact path="/settings" component={() => <Screen><div style={{ padding: '100px' }}>/settings 未実装</div></Screen>} />

          {/* 書籍ビュワー */}
          <Route exact path="/mybook/:id/read" component={Viewer} />

          {/* 貸し出し友達選択ページ */}
          <Route exact path="/mybook/:id/lend" component={() => <div style={{ padding: '100px' }}>/mybook/:bookid/lend 未実装</div>} />

          {/* 友達追加ページ */}
          <Route exact path="/friend/create" component={() => <div style={{ padding: '100px' }}>/friend/create 未実装</div>} />
          {/* 自分のパスコード確認ページ */}
          <Route exact path="/friend/mypass" component={() => <div style={{ padding: '100px' }}>/friend/mypass 未実装</div>} />


          {/* 書籍詳細ページ */}
          <Route exact path="/store/:id" component={() => <div style={{ padding: '100px' }}>/store/:bookid 未実装</div>} />
          {/* 書籍決済ページ */}
          <Route exact path="/store/:id/cart" component={() => <div style={{ padding: '100px' }}>/store/:bookid/cart 未実装</div>} />

          {/* 所持している限定コンテンツ一覧ページ */}
          <Route exact path="/contents-own" component={() => <div style={{ padding: '100px' }}>/contents-own 未実装</div>} />
          {/* 所持している限定コンテンツ詳細ページ（書籍ならビュワーに飛ばしても良いかも） */}
          <Route exact path="/contents-own/:id" component={() => <div style={{ padding: '100px' }}>/contents-own/:contentsId 未実装</div>} />
          {/* 未所持の限定コンテンツ詳細・交換ぺージ */}
          <Route exact path="/contents-store/:id" component={() => <div style={{ padding: '100px' }}>/contents-store/:contentsId 未実装</div>} />

          {/* 通知ページ */}
          <Route exact path="/notification" component={Login} />
          {/* 通知詳細ページ */}
          <Route exact path="/notification/:id" component={Login} />

          <Redirect to="/store"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
