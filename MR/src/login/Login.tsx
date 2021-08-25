import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../styles/login.scss";

function login() {
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
              <td>아이디</td>
              <td>
                {" "}
                <input type="text" placeholder="ID를 입력하세요" />
              </td>
            </tr>
            <tr>
              <td>패스워드</td>
              <td>
                <input type="text" placeholder="PW를 입력하세요" />
              </td>
            </tr>
          </tbody>
        </table>
        <button>로그인</button>
        <button>아이디/비밀번호 찾기</button>
      </div>
    </div>
  );
}

export default login;
