import React, { useState } from "react";

import "../styles/login.scss";

export default function login() {
  const [Id, setId] = useState(""); //e-mail
  const [Password, setPassword] = useState(""); //password

  const IdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };

  const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  return (
    <div className="login">
      <div className="login_contatiner">
        <div className="login_register_container">
          <div className="login_top">
            <h1>로그인</h1>
          </div>
        </div>

        <table className="login_register_container">
          <tbody>
            <tr>
              <td>E-mail</td>
              <td>
                <input type="text" placeholder="ID를 입력하세요" value={Id} onChange={IdHandler} />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input type="text" placeholder="PW를 입력하세요" value={Password} onChange={PasswordHandler} />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="login_button">로그인</button>
        <button>아이디/비밀번호 찾기</button>
      </div>
    </div>
  );
}
