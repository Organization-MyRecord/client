import { ActionType } from "./action-type";
import { Action } from "./actions/index";

type userState = {
  isLogin: boolean;
  userData: any;
  myData: any;
  error: any;
  modalstate: boolean;
  userEmail: string;
  toggleSidebar: boolean;
  image: string;
};

const initialState: userState = {
  isLogin: false,
  userData: null,
  error: null,
  myData: null,
  modalstate: false,
  userEmail: "",
  toggleSidebar: true,
  image: "string",
};

//로그인

const user = (state: userState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      return {
        ...state,
        isLogin: true,
        myData: action.payload,
        userEmail: action.email,
        image: action.image,
      };
    case ActionType.LOGOUT_USER:
      return {
        ...state,
        isLogin: false,
        userEmail: "",
      };
    case ActionType.REGISTER_USER:
      return {
        ...state,
      };
    case ActionType.USER_INFO:
      return {
        ...state,
        userData: action.payload,
        image: action.image,
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
        isLogin: false,
      };
    case ActionType.SIDEBAR_OPEN:
      return {
        ...state,
        toggleSidebar: true,
      };
    case ActionType.SIDEBAR_NONE:
      return {
        ...state,
        toggleSidebar: false,
      };
    default:
      return state;
  }
};

export default user;
