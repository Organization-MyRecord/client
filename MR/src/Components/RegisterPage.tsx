import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/register.scss";
import { options, Major } from "../options/options";
import { RegisterHandler, SideBarNoneHandler, SideBarOpenHandler } from "../modules/action-creator";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { OpenModalHandler } from "../modules/action-creator/ModalIndex";
import TextLogo from "../options/text_logo.png";
type ops = { view: string; value: string };

function Getage(day: string): number {
  const today = new Date();
  const birthDay = new Date(day);

  return today.getFullYear() - birthDay.getFullYear();
}

export default function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [birth, setbirth] = useState(""); //생년월일
  const [Password, setPassword] = useState(""); //패스워드
  const [PasswordCheck, setPasswordCheck] = useState(""); //패스워드 확인
  const [Name, setName] = useState(""); //닉네임
  const [Email, setEmail] = useState(""); //이메일
  const [toggle, settoggle] = useState(false); //인증번호 시에 나올 입력창 토글
  const [textToggle, settextToggle] = useState(false); //이메일인증 경고글 토글
  const [Anum, setAnum] = useState(""); //인증번호
  const [radioState, setradioState] = useState(""); //성별
  const [field, setfield] = useState(""); //분야
  const [major, setmajor] = useState(""); //전공계열
  const [majorDetail, setmajorDetail] = useState(""); //전공세부

  useEffect(() => {
    dispatch(SideBarNoneHandler());

    return () => {
      dispatch(SideBarOpenHandler());
    };
  }, [dispatch]);

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
  const EmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        PasswordCheck,
        history,
        dispatch,
      ),
    );
  };

  const genderOps: ops[] = [
    { view: "남", value: "man" },
    { view: "여", value: "woman" },
  ];

  //분야를 select option
  const fieldList = options.map((item) => {
    return (
      <option key={item.label} value={item.value}>
        {item.value}
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
      dispatch(OpenModalHandler(res.data));
      settoggle(true);
    });
  };

  const checkAuth = () => {
    axios.get(`api/verify?email=${Email}&randomCode=${Anum}`).then((res) => {
      if (res.data) {
        settoggle(false);
        settextToggle(true);
        dispatch(OpenModalHandler("인증이 성공적으로 완료 되었습니다!"));
      } else {
        settoggle(true);
        dispatch(OpenModalHandler("인증번호가 틀렸습니다."));
      }
    });
  };
  return (
    <div className="big_container">
      <div className="logo_area">
        <img src={TextLogo} alt="text_logo" width="200px" height="60px" />
      </div>
      <div className="email_auth_container">
        <div className="Email_auth">
          <table>
            <tbody>
              <tr>
                <td>
                  <label>이메일 (필수)</label>

                  <input type="text" value={Email} onChange={EmailHandler} disabled={textToggle} />
                  <button onClick={emailAuth} style={textToggle ? { display: "none" } : {}}>
                    메일 인증
                  </button>
                  <h6 className={textToggle ? "checked" : "warning"}>
                    {textToggle ? "본인 인증이 완료되었습니다!" : "*본인 인증시 이메일이 반드시 필요합니다."}
                  </h6>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={toggle ? { marginLeft: "50px" } : { display: "none" }} className="auth_num">
          <table>
            <tbody>
              <tr>
                <td>인증번호</td>
                <td>
                  <input type="text" value={Anum} onChange={AnumHandler} />
                  <button onClick={checkAuth}>인증하기</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form onSubmit={register} className="register_container">
        <table>
          <tbody>
            <tr>
              <td>비밀번호</td>
              <td>
                {" "}
                <input type="password" value={Password} onChange={PasswordHandler} />
              </td>
            </tr>
            <tr>
              <td>비밀번호 확인</td>
              <td>
                <input type="password" value={PasswordCheck} onChange={PasswordCheckHandler} />
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
                {genderOps.map(({ view: title, value: gender }: any) => {
                  return (
                    <React.Fragment key={title}>
                      <input
                        className={gender}
                        type="radio"
                        value={gender}
                        name={gender}
                        checked={gender === radioState}
                        onChange={(e) => onRadioChange(e)}
                        style={{ width: "20px", height: "20px" }}
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
                <select className="inputSelect" onChange={FieldHandler} placeholder={field}>
                  {fieldList}
                </select>
              </td>
            </tr>

            <tr>
              <td>전공계열</td>
              <td>
                <select className="MajorSelect" onChange={majorHandler} placeholder={major}>
                  {majorList}
                </select>
              </td>
            </tr>
            <tr>
              <td>세부전공</td>

              <td>
                <input type="text" value={majorDetail} onChange={majorDetailHander}></input>
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit">등록</button>
      </form>
    </div>
  );
}
