import React, { useState } from "react";

export const Login = () => {
  const [registerFlag, setRegisterFlag] = useState(false);

  const toggleLoginAndRegister = () => {
    setRegisterFlag(!registerFlag);
  };

  if (registerFlag) {
    return (
      <div className="login">
        <h1>レント Lento!</h1>
        <h2>新規登録</h2>
        <form>
          <div><input type="text" className="login-form login-form-username" placeholder="ユーザー名" /></div>
          <div><input type="password" className="login-form login-form-password" placeholder="パスワード" required pattern="[A-Za-z0-9]*" /></div>
          <p className="to-registration" onClick={() => toggleLoginAndRegister()}>ログイン</p>
          <input type="submit" className="login-form-submit" value="新規登録" />
        </form>
      </div>
    )
  } else {
    return (
      <div className="login">
        <h1>レント Lento!</h1>
        <h2>ログイン</h2>
        <form>
          <div><input type="text" className="login-form login-form-username" placeholder="ユーザー名" /></div>
          <div><input type="password" className="login-form login-form-password" placeholder="パスワード" required pattern="[A-Za-z0-9]*" /></div>
          <p className="to-registration" onClick={() => toggleLoginAndRegister()}>ユーザー登録</p>
          <input type="submit" className="login-form-submit" value="ログイン" />
        </form>
      </div>
    )
  }

};

