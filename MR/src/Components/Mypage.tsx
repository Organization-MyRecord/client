import axios from "axios";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../styles/mypage.scss";
import { options, Major } from "../options/options";
import { RegisterHandler } from "../modules/action-creator";
import { useDispatch } from "react-redux";

function Mypage() {
  const GetMyInfo = async () => {
    await axios
      .get("/api/mypage", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => console.log(res.data));
  };
  const dispatch = useDispatch();

  const [birth, setbirth] = useState(""); //생년월일
  const [Password, setPassword] = useState(""); //패스워드
  const [PasswordCheck, setPasswordCheck] = useState(""); //패스워드 확인
  const [Name, setName] = useState(""); //이름
  const [Email, setEmail] = useState(""); //이메일
  const [toggle, settoggle] = useState<boolean>(false); //인증번호 시에 나올 입력창 토글
  const [Anum, setAnum] = useState(""); //인증번호
  const [radioState, setradioState] = useState(""); //성별
  const [field, setfield] = useState(""); //분야
  const [major, setmajor] = useState(""); //전공계열
  const [majorDetail, setmajorDetail] = useState(""); //전공세부

  const BirthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //생년월일 input onchange 함수
    setbirth(e.currentTarget.value);
  };
  const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const PasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.currentTarget.value);
  };
  const NameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const EamilHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const AnumHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnum(e.currentTarget.value);
  };

  const FieldHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setfield(e.currentTarget.value);
  };

  const majorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setmajor(e.currentTarget.value);
  };

  const majorDetailHander = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmajorDetail(e.currentTarget.value);
  };

  const onRadioChange = (e: any) => {
    setradioState(e.target.value);
  };
  //분야를 select option
  const fieldList = options.map((item) => {
    return (
      <option key={item.label} value={item.value}>
        {item.label}
      </option>
    );
  });

  //계열 select option
  const majorList = Major.map((item) => {
    return (
      <option key={item.label} value={item.value}>
        {item.label}
      </option>
    );
  });
  return (
    <div className="mypage">
      <div className="profile_cotainer">
        <div className="profile">
          <FaUserCircle id="user_icon" />
          <h1>김정수</h1>
          <a>sunpl0718@naver.com</a>
          <br />
          <button id="user_edit">기본정보 수정</button>
          <table>
            <tbody>
              <tr>
                <td>팔로잉</td>
                <td>123명</td>
              </tr>
              <tr>
                <td>팔로워</td>
                <td>83명</td>
              </tr>

              <tr>
                <td>나의 게시물</td>
                <td>13개</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="interests">
          <table>
            <tbody>
              <tr>
                <td>나이:</td>
                <td>100세</td>
              </tr>
              <tr>
                <td>관심분야:</td>
                <td>IT산업</td>
              </tr>
              <tr>
                <td>전공 계열:</td>
                <td>공학계열</td>
              </tr>
              Discription : <br />
              무엇 전직업 대학교
            </tbody>
          </table>
        </div>
      </div>

      <div className="change_info">
        <form className="changing_container">
          <label>현재 닉네임</label>
          <br />
          <label>닉네임 변경</label>
          <input type="name" value={Name} onChange={NameHandler} />
          <br />
          <label>관심분야</label>
          <div>
            <table>
              <thead>
                <tr>
                  <th>전공계열</th>
                  <th>세부전공</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select className="MajorSelect" onChange={majorHandler} placeholder={major}>
                      {majorList}
                    </select>
                  </td>
                  <td>
                    <input type="text" value={majorDetail} onChange={majorDetailHander}></input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  );
}

export default Mypage;
