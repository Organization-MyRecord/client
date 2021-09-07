import React, { useState } from "react";
import axios from "axios";
import "../styles/register.scss";
import { options, Major } from "../options/options";
import { RegisterHandler } from "../modules/action-creator";
import { useDispatch } from "react-redux";

type ops = { view: string; value: string };

function Getage(day: string): number {
  const today = new Date();
  const birthDay = new Date(day);

  return today.getFullYear() - birthDay.getFullYear();
}

export default function RegisterPage() {
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

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      RegisterHandler(
        Getage(birth),
        birth,
        majorDetail,
        Email,
        field,
        radioState,
        major,
        Name,
        Password,
        PasswordCheck
      )
    );
    console.log(radioState);
  };

  const genderOps: ops[] = [
    { view: "남", value: "남" },
    { view: "여", value: "여" },
  ];

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

  const emailAuth = () => {
    axios.get(`api/email?email=${Email}`).then((res) => {
      console.log(res);
      settoggle(true);
    });
  };

  const aaa = () => {
    axios
      .get(`api/verify?email=${Email}&randomCode=${Anum}`)
      .then((res) => console.log(res));
  };
  return (
    <div className="big_container">
      <div className="email_auth_container">
        <div className="Email_auth">
          <table>
            <label>이메일 (필수)</label>
            <input type="text" value={Email} onChange={EamilHandler} />
            <button onClick={emailAuth}>메일 인증</button>
            <h6>*본인 인증시 이메일이 반드시 필요합니다.</h6>
          </table>
        </div>
        <div style={toggle ? { opacity: "1" } : { opacity: "0" }}>
          <input type="text" value={Anum} onChange={AnumHandler} />
          <button onClick={aaa}>인증하기</button>
        </div>
      </div>
      <form onSubmit={register} className="register_container">
        <table>
          <tbody>
            <tr>
              <td>비밀번호</td>
              <td>
                {" "}
                <input
                  type="password"
                  value={Password}
                  onChange={PasswordHandler}
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호 확인</td>
              <td>
                <input
                  type="password"
                  value={PasswordCheck}
                  onChange={PasswordCheckHandler}
                />
              </td>
            </tr>
            <tr>
              <td>이름</td>
              <td>
                <input type="text" value={Name} onChange={NameHandler} />
              </td>
            </tr>
            <tr>
              <td>생년월일</td>
              <td>
                <input type="date" value={birth} onChange={BirthHandler} />
              </td>
            </tr>
            <tr>
              <td>성별</td>
              <td>
                {genderOps.map(({ view: title, view: gender }: any) => {
                  return (
                    <React.Fragment key={title}>
                      <input
                        type="radio"
                        value={gender}
                        name={gender}
                        checked={gender === radioState}
                        onChange={(e) => onRadioChange(e)}
                      />
                      {title}
                    </React.Fragment>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td>관심분야</td>
              <td>
                <select
                  className="inputSelect"
                  onChange={FieldHandler}
                  placeholder={field}
                >
                  {fieldList}
                </select>
              </td>
            </tr>

            <tr>
              <td>전공계열</td>
              <td>
                <select
                  className="MajorSelect"
                  onChange={majorHandler}
                  placeholder={major}
                >
                  {majorList}
                </select>
              </td>
            </tr>
            <tr>
              <td>세부전공</td>

              <td>
                <input
                  type="text"
                  value={majorDetail}
                  onChange={majorDetailHander}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit">등록</button>
      </form>
    </div>
  );
}
