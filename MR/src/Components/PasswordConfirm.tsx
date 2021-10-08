import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { OpenModalHandler } from "../modules/action-creator/ModalIndex";
import "../styles/change-password.scss";

function PasswordConfirm() {
  //현재 패스워드
  const [CurrentPWD, setCurrentPWD] = useState("");
  //바꿀 패스워드
  const [ChangePWD, setChangePWD] = useState("");
  //바꿀 패스워드 확인
  const [ChangePWD_Cofirm, setChangePWD_Cofirm] = useState("");
  const [state, setstate] = useState(false);
  const dispatch = useDispatch();

  //현재 패스워드
  const CurrentPWDChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPWD(e.currentTarget.value);
  };
  const changePWDChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePWD(e.currentTarget.value);
  };
  const ConfirmPWDChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePWD_Cofirm(e.currentTarget.value);
  };

  //현재 패스워드가 맞는지 확인
  const CheckPassword = async () => {
    await axios
      .post(
        "/api/CheckPw",
        { password: CurrentPWD },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        if (res.data.result) {
          dispatch(OpenModalHandler(res.data.value));
          setstate(true);
        } else {
          dispatch(OpenModalHandler(res.data.description));
        }
      });
  };

  //변경하기 버튼
  const change = async () => {
    if (ChangePWD === ChangePWD_Cofirm) {
      await axios
        .put(
          "/api/ChangePasspw",
          {
            password: ChangePWD,
          },
          {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          },
        )
        .then((res) => {
          if (res.data.result) {
            console.log("여기1");

            dispatch(OpenModalHandler(res.data.value));
          } else {
            console.log("여기2");

            dispatch(OpenModalHandler(res.data.description));
          }
        })
        .then(() => window.location.replace("/mypage"));
    } else {
      dispatch(OpenModalHandler("두 비밀번호가 서로 같지 않습니다."));
    }
  };

  return (
    <div className="container">
      <div className="password_confirm">
        <div className="confirm_container">
          <input type="password" placeholder="현재 비밀번호를 입력해주세요." onChange={CurrentPWDChangeHandler} />
          <button onClick={CheckPassword}>확인</button>
        </div>
        <span style={state ? { display: "" } : { display: "none" }}>확인 되었습니다!!</span>
        <div className="change_passowrd" style={state ? { display: "" } : { display: "none" }}>
          <input type="password" placeholder="변경할 비밀번호" onChange={changePWDChangeHandler} />
          <input type="password" placeholder="변경할 비밀번호 확인" onChange={ConfirmPWDChangeHandler} />
          <button onClick={change}>변경하기</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordConfirm;
