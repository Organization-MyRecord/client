import React, { useState } from "react";
import axios from "axios";
import "../styles/register.scss";
import { options, Major } from "../options/options";

type ops = { view: string; value: string };

export default function RegisterPage() {
  const [birth, setbirth] = useState(""); //생년월일
  const [Password, setPassword] = useState(""); //패스워드
  const [PasswordCheck, setPasswordCheck] = useState(""); //패스워드 확인
  const [Name, setName] = useState(""); //이름
  const [Email, setEmail] = useState(""); //이메일
  const [toggle, settoggle] = useState<boolean>(false);
  const [Anum, setAnum] = useState(""); //인증번호
  const [radioState, setradioState] = useState(null); //성별
  const [filed, setfiled] = useState(""); //분야
  const [major, setmajor] = useState(""); //전공계열
  const [majorDetail, setmajorDetail] = useState(""); //전공세부

  const BirthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const FiledHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setfiled(e.currentTarget.value);
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
    await axios.post("/api/register", {
      age: 0,
      email: Email,
      field: "IT웹통신",
      gender: "남",
      job: "string",
      major: "string",
      name: Name,
      password: Password,
      secondPassword: PasswordCheck,
    });
  };

  const genderOps: ops[] = [
    { view: "남", value: "남" },
    { view: "여", value: "여" },
  ];

  //분야를 select option
  const filedList = options.map((item) => {
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
    axios.get(`api/verify?email=${Email}&randomCode=${Anum}`).then((res) => console.log(res));
  };
  return (
    <div>
      <div className="Email_auth">
        <label>이메일 (필수)</label>
        <input type="text" value={Email} onChange={EamilHandler} />
        <button onClick={emailAuth}>메일 인증</button>
        <h6>*본인 인증시 이메일이 반드시 필요합니다.</h6>
      </div>
      <div style={toggle ? { opacity: "1" } : { opacity: "0" }}>
        <input type="text" value={Anum} onChange={AnumHandler} />
        <button onClick={aaa}>인증하기</button>
      </div>
      <form onSubmit={register} className="register_container">
        <label>비밀번호</label>
        <input type="password" value={Password} onChange={PasswordHandler} />
        <label>비밀번호 확인</label>
        <input type="password" value={PasswordCheck} onChange={PasswordCheckHandler} />
        <label>이름</label>
        <input type="text" value={Name} onChange={NameHandler} />
        <label>생년월일</label>
        <input type="date" value={birth} onChange={BirthHandler} />
        <div>
          {genderOps.map(({ view: title, view: gender }: any) => {
            return (
              <div key={title}>
                <input
                  type="radio"
                  value={gender}
                  name={gender}
                  checked={gender === radioState}
                  onChange={(e) => onRadioChange(e)}
                />
                {title}
              </div>
            );
          })}
        </div>
        <label>관심분야</label>
        <select className="inputSelect" onChange={FiledHandler} placeholder={filed}>
          {filedList}
        </select>
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
  );
}
