import React, { useState } from "react";
import axios from 'axios';

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

const Login = () => {
  const [registerFlag, setRegisterFlag] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const toggleLoginAndRegister = () => {
    setRegisterFlag(!registerFlag);
  };

  const handleSubmit = async () => {
    if(registerFlag){
      console.error('ユーザー登録は実装されていません')
    }else{
      await axios.post(ENTRY_POINT + '/login', {
        name: userName,
        password: password,
      });
      console.log('login成功');
    }
  }

  return (
    <div className="login">
      <h1>レント Lento!</h1>
      <h2>{registerFlag ? "新規登録" : "ログイン"}</h2>
      <form>
        <div>
          <input
            className="login-form login-form-username"
            placeholder="ユーザー名"
            value={userName}
            required
            onChange={e => setUserName(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p className="to-registration" onClick={toggleLoginAndRegister}>{registerFlag ? "ログイン" : "新規登録"}</p>
        <button className="login-form-submit" onClick={handleSubmit}>
          {registerFlag ? "新規登録" : "ログイン"}
        </button>
      </form>
    </div>
  )

};

export default Login;