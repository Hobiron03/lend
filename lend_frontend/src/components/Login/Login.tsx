import React, { useState } from "react";

const Login = () => {
  const [registerFlag, setRegisterFlag] = useState(false);

  const toggleLoginAndRegister = () => {
    setRegisterFlag(!registerFlag);
  };
  return (
    <div className="login">
      <h1>レント Lento!</h1>
      <h2>{registerFlag ? "新規登録" : "ログイン"}</h2>
      <form>
        <div><input type="text" className="login-form login-form-username" placeholder="ユーザー名" /></div>
        <div><input type="password" className="login-form login-form-password" placeholder="パスワード" required pattern="[A-Za-z0-9]*" /></div>
        <p className="to-registration" onClick={() => toggleLoginAndRegister()}>{registerFlag ? "ログイン" : "新規登録"}</p>
        <input type="submit" className="login-form-submit" value={registerFlag ? "新規登録" : "ログイン"} />
      </form>
    </div>
  )

};

export default Login;