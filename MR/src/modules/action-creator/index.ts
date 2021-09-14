//액션 생성함수 지정

import { ActionType } from "../action-type";
import { Action } from "../actions/index";
import { Dispatch } from "redux";
import axios from "axios";
import { OpenModalHandler } from "./ModalIndex";

//모달 닫기
export const CloseModalHandler = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLOSE_MODAL,
    });
  };
};

//로그인
export const LoginHandler = (Email: string, Password: string, dispa: any, setopenmodal) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .post("/api/authenticate", {
        email: Email,
        password: Password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);

        dispatch({
          type: ActionType.LOGIN_USER,
          payload: response.data,
        });
      })
      .then(() => {
        setopenmodal(false);
        dispa(OpenModalHandler("로그인이 완료되었습니다."));
      });
  };
};

//회원가입
export const RegisterHandler = (
  age: number,
  birth: string,
  detailMajor: string,
  email: string,
  field: string,
  gender: string,
  major: string,
  name: string,
  password: string,
  secondPassword: string,
  hisory,
  dispa,
) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .post("/api/register", {
        age: age,
        birth: birth,
        email: email,
        field: field,
        gender: gender,
        major: major,
        detailMajor: detailMajor,
        name: name,
        password: password,
        secondPassword: secondPassword,
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: ActionType.REGISTER_USER,
        });
      })
      .then(() => {
        dispa(OpenModalHandler("회원가입이 성공적으로 완료되었습니다!"));
        hisory.push("/");
      });
  };
};

// 마이페이지 유저정보 가져오기
export const GetUserInfo = (email) => {
  return async (dispatch: Dispatch<Action>) => {
    await axios.get(`/api/mypage?email=${email}`).then((res) => {
      dispatch({
        type: ActionType.USER_INFO,
        payload: res.data,
      });
    });
  };
};

//로그아웃
export const LogoutHandler = (hisory: any, dispa: any) => {
  return (dispatch: Dispatch<Action>) => {
    sessionStorage.removeItem("token");
    dispatch({
      type: ActionType.LOGOUT_USER,
    });

    dispa(OpenModalHandler("로그아웃 되었습니다."));
    hisory.push("/");
  };
};

//로그인정보 확인
export const IsLoginHandler = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.USER_ISLOGIN,
    });
  };
};
