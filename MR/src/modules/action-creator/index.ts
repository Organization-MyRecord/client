//액션 생성함수 지정

import { ActionType } from "../action-type";
import { Action, ModalAction } from "../actions/index";
import { Dispatch } from "redux";
import axios from "axios";

//모달 닫기
export const CloseModalHandler = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLOSE_MODAL,
    });
  };
};

//로그인
export const LoginHandler = (Email: string, Password: string) => {
  return async (dispatch: Dispatch<Action>, dispatch2: Dispatch<ModalAction>) => {
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
        dispatch2({
          type: ActionType.OPEN_MODAL,
          payload: "로그인에 성공했습니다.",
        });
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
      .then(() => hisory.push("/"));
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
export const LogoutHandler = (hisory: any) => {
  return (dispatch: Dispatch<Action>) => {
    sessionStorage.removeItem("token");
    dispatch({
      type: ActionType.LOGOUT_USER,
    });
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
