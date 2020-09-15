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
          <Route path="/login" component={Login} />

          {/* マイ本棚 */}
          <Route path="/mybook" component={() => <Screen><div style={{ padding: '100px' }}>/mybook 未実装</div></Screen>} />
          {/* 友達ページ */}
          <Route path="/friend" component={() => <Screen><div style={{ padding: '100px' }}>/friend 未実装</div></Screen>} />
          {/* ストアページ */}
          <Route path="/store" component={() => <Screen><div style={{ padding: '100px' }}>/store 未実装</div></Screen>} />
          {/* 限定コンテンツ一覧ページ */}
          <Route path="/contents-store" component={() => <Screen><div style={{ padding: '100px' }}>/contents-store 未実装</div></Screen>} />
          {/* 設定ページ */}
          <Route path="/settings" component={() => <Screen><div style={{ padding: '100px' }}>/settings 未実装</div></Screen>} />

          {/* 書籍ビュワー */}
          <Route path="/mybook/:id/read" component={Viewer} />

          {/* 貸し出し友達選択ページ */}
          <Route path="/mybook/:id/lend" component={() => <div style={{ padding: '100px' }}>/mybook/:bookid/lend 未実装</div>} />

          {/* 友達追加ページ */}
          <Route path="/friend/create" component={() => <div style={{ padding: '100px' }}>/friend/create 未実装</div>} />
          {/* 自分のパスコード確認ページ */}
          <Route path="/friend/mypass" component={() => <div style={{ padding: '100px' }}>/friend/mypass 未実装</div>} />


          {/* 書籍詳細ページ */}
          <Route path="/store/:id" component={() => <div style={{ padding: '100px' }}>/store/:bookid 未実装</div>} />
          {/* 書籍決済ページ */}
          <Route path="/store/:id/cart" component={() => <div style={{ padding: '100px' }}>/store/:bookid/cart 未実装</div>} />

          {/* 所持している限定コンテンツ一覧ページ */}
          <Route path="/contents-own" component={() => <div style={{ padding: '100px' }}>/contents-own 未実装</div>} />
          {/* 所持している限定コンテンツ詳細ページ（書籍ならビュワーに飛ばしても良いかも） */}
          <Route path="/contents-own/:id" component={() => <div style={{ padding: '100px' }}>/contents-own/:contentsId 未実装</div>} />
          {/* 未所持の限定コンテンツ詳細・交換ぺージ */}
          <Route path="/contents-store/:id" component={() => <div style={{ padding: '100px' }}>/contents-store/:contentsId 未実装</div>} />

          {/* 通知ページ */}
          <Route path="/notification" component={Login} />
          {/* 通知詳細ページ */}
          <Route path="/notification/:id" component={Login} />

          <Redirect to="/store"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
