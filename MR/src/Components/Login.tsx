import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginHandler } from "../modules/action-creator";
import "../styles/login.scss";

function login() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState(""); //이메일 담을 State
  const [Password, setPassword] = useState(""); //패스워드 담을 State

  const EmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //이메일 onChange
    setEmail(e.currentTarget.value);
  };
  const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //패스워드 onChange
    setPassword(e.currentTarget.value);
  };

  const login = async () => {
    // console.log(Email, Password);

    // await axios.post('/api/authenticate', {     //서버api로 전송
    //   email : Email,
    //   password : Password
    // }).then(res => localStorage.setItem("token", res.data))   //그 다음 토큰을 로컬스토리지에 저장 , 궁금할 시 console.log로 res 검색
    dispatch(LoginHandler(Email, Password));
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
              <td>아이디</td>
              <td>
                {" "}
                <input type="text" placeholder="이메일을 입력하세요" onChange={EmailHandler} />
              </td>
            </tr>
            <tr>
              <td>패스워드</td>
              <td>
                <input type="password" placeholder="PW를 입력하세요" onChange={PasswordHandler} />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={login}>로그인</button>
        <button>아이디/비밀번호 찾기</button>
      </div>
    </div>
  );
}

export default login;
