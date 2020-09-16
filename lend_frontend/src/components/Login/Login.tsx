import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AppContext from "../../contexts/AppContexts";
import { CREATE_USER } from "../../actions/";

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

const Login = () => {
  const history = useHistory();

  const { dispatch } = useContext(AppContext);
  const [registerFlag, setRegisterFlag] = useState(false);

  const [userName, setUserName] = useState("kirin");
  const [password, setPassword] = useState("pass");

  const toggleLoginAndRegister = () => {
    setRegisterFlag(!registerFlag);
  };

  const handleSubmit = async () => {
    if (registerFlag) {
      console.error("ユーザー登録は実装されていません");
    } else {
      await axios
        .post(ENTRY_POINT + "/login", {
          name: userName,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: CREATE_USER,
            user: res.data,
          });
          history.push(`/mybook/`);
        });
    }
  };

  return (
    <div className="login">
      <h1>レント Lento!</h1>
      <h2>{registerFlag ? "新規登録" : "ログイン"}</h2>
      <div>
        <input
          className="login-form login-form-username"
          placeholder="ユーザー名"
          value={userName}
          required
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          className="login-form login-form-password"
          placeholder="パスワード"
          required
          pattern="[A-Za-z0-9]*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <p className="to-registration" onClick={toggleLoginAndRegister}>
        {registerFlag ? "ログイン" : "新規登録"}
      </p>
      <button className="login-form-submit" onClick={handleSubmit}>
        {registerFlag ? "新規登録" : "ログイン"}
      </button>
    </div>
  );
};

export default Login;
