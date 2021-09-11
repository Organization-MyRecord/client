import { ActionType } from "./action-type";
import { Action } from "./actions/index";

type userState = {
  userLoading: boolean;
  userData: any;
  myData: any;
  error: any;
  modalstate: boolean;
};

const initialState: userState = {
  userLoading: false,
  userData: null,
  error: null,
  myData: null,
  modalstate: false,
};

//로그인

const user = (state: userState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      return {
        ...state,
        userLoading: true,
        myData: action.payload,
      };
    case ActionType.LOGOUT_USER:
      return {
        ...state,
        userLoading: false,
      };
    case ActionType.REGISTER_USER:
      return {
        ...state,
      };
    case ActionType.USER_INFO:
      return {
        ...state,
        userData: action.payload,
      };
    case ActionType.OPEN_MODAL:
      return {
        ...state,
        modalstate: true,
      };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,
        modalstate: false,
      };
    case ActionType.USER_ISLOGIN:
      return {
        ...state,
        userLoding: false,
      };
    default:
      return state;
  }
};

export default user;
