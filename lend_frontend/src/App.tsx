import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Screen from "./components/Screen/Screen";
import SelectFriendScreen from "./components/SelectFriendScreen/SelectFriendScreen";
import "./App.scss";
import Viewer from "./components/Viewer/Viewer";
import MyBookList from "./components/MyBookList/MyBookList";
import reducer from "./reducers/";
import AppContext from "./contexts/AppContexts";
import Store from "./components/Store/Store";
import BookPurchase from "./components/BookPurchase/BookPurchase";

const initialState = {
  user: {},
  friends: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Router>
          <Switch>
            {/* ログイン/ユーザー登録ページ */}
            <Route exact path="/login" component={Login} />
            {/* マイ本棚 */}
            <Route exact path="/mybook" component={MyBookList} />
            {/* 友達ページ */}
            <Route
              exact
              path="/friend"
              component={() => (
                <Screen>
                  <div style={{ padding: "100px" }}>/friend 未実装</div>
                </Screen>
              )}
            />
            {/* ストアページ */}
            <Route
              exact
              path="/store"
              component={Store}
            />
            {/* 限定コンテンツ一覧ページ */}
            <Route
              exact
              path="/contents-store"
              component={() => (
                <Screen>
                  <div style={{ padding: "100px" }}>/contents-store 未実装</div>
                </Screen>
              )}
            />
            {/* 設定ページ */}
            <Route
              exact
              path="/settings"
              component={() => (
                <Screen>
                  <div style={{ padding: "100px" }}>/settings 未実装</div>
                </Screen>
              )}
            />

            {/* 書籍ビュワー */}
            <Route exact path="/mybook/:id/read" component={Viewer} />

            {/* 貸し出し友達選択ページ */}
            <Route
              exact
              path="/mybook/:id/lend"
              component={SelectFriendScreen}
            />

            {/* 友達追加ページ */}
            <Route
              exact
              path="/friend/create"
              component={() => (
                <div style={{ padding: "100px" }}>/friend/create 未実装</div>
              )}
            />
            {/* 自分のパスコード確認ページ */}
            <Route
              exact
              path="/friend/mypass"
              component={() => (
                <div style={{ padding: "100px" }}>/friend/mypass 未実装</div>
              )}
            />
            {/* 書籍詳細ページ */}
            <Route
              exact
              path="/store/:id"
              component={BookPurchase}
            />
            {/* 書籍決済ページ */}
            <Route
              exact
              path="/store/:id/cart"
              component={() => (
                <div style={{ padding: "100px" }}>
                  /store/:bookid/cart 未実装
                </div>
              )}
            />
            {/* 所持している限定コンテンツ一覧ページ */}
            <Route
              exact
              path="/contents-own"
              component={() => (
                <div style={{ padding: "100px" }}>/contents-own 未実装</div>
              )}
            />
            {/* 所持している限定コンテンツ詳細ページ（書籍ならビュワーに飛ばしても良いかも） */}
            <Route
              exact
              path="/contents-own/:id"
              component={() => (
                <div style={{ padding: "100px" }}>
                  /contents-own/:contentsId 未実装
                </div>
              )}
            />
            {/* 未所持の限定コンテンツ詳細・交換ぺージ */}
            <Route
              exact
              path="/contents-store/:id"
              component={() => (
                <div style={{ padding: "100px" }}>
                  /contents-store/:contentsId 未実装
                </div>
              )}
            />

            {/* 通知ページ */}
            <Route exact path="/notification" component={Login} />
            {/* 通知詳細ページ */}
            <Route exact path="/notification/:id" component={Login} />

            <Redirect to="/store" />
          </Switch>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
