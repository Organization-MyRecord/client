import React, { useState } from "react";
import axios from "axios";
import "../styles/register.scss";
import { options } from "../options/options";

type ops = { view: string; value: string };

export default function RegisterPage() {
  const [birth, setbirth] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordCheck, setPasswordCheck] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [toggle, settoggle] = useState<boolean>(false);
  const [Anum, setAnum] = useState("");
  const [radioState, setradioState] = useState(null);

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

  const onRadioChange = (e: any) => {
    setradioState(e);
    console.log(radioState);
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
      <form onSubmit={register} className="register_container">
        <div className="Email_auth">
          <label>이메일 (필수)</label>
          <input type="text" value={Email} onChange={EamilHandler} />
          <button onClick={emailAuth}>메일 인증</button>
          <h6>*본인 인증시 이메일이 반드시 필요합니다.</h6>
        </div>
        <div>
          <input type="text" value={Anum} onChange={AnumHandler} />
          <button onClick={aaa}>버튼 ㅋㅋ</button>
        </div>
        <label>비밀번호</label>
        <input type="password" value={Password} onChange={PasswordHandler} />
        <label>비밀번호 확인</label>
        <input type="password" value={PasswordCheck} onChange={PasswordCheckHandler} />
        <label>이름</label>
        <input type="text" value={Name} onChange={NameHandler} />
        <label>생년월일</label>
        <input type="date" value={birth} onChange={BirthHandler} />
        <div>
          {genderOps.map(({ title, gender }: any) => {
            return (
              <>
                <input
                  type="radio"
                  value={gender}
                  name={gender}
                  checked={gender === radioState}
                  onChange={(e) => onRadioChange(gender)}
                />
                {title}
              </>
            );
          })}
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
