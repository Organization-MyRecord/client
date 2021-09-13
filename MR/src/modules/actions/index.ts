//액션의 interface 지정
import { ActionType } from "../action-type";

//모달관련
interface OpenModalAction {
  type: ActionType.OPEN_MODAL;
  payload: string;
}

interface CloseModalAction {
  type: ActionType.CLOSE_MODAL;
}

//User 관련
interface LoginAction {
  type: ActionType.LOGIN_USER;
  payload: string;
}

interface LogoutAction {
  type: ActionType.LOGOUT_USER;
}

interface RegisterAction {
  type: ActionType.REGISTER_USER;
}

interface GetUserInfo {
  type: ActionType.USER_INFO;
  payload: string;
}

interface ToggleHanlder {
  type: ActionType.USER_ISLOGIN;
}

//게시물 관련
interface GetPostAction {
  type: ActionType.POST_INFO;
  payload: string;
}

interface RegisterPostAction {
  type: ActionType.POST_REGISTRATION;
  payload: string;
}

interface DeletePostAction {
  type: ActionType.POST_DELETE;
}

interface GetPostingAction {
  type: ActionType.POST_GET;
  payload: string;
}

interface GetFieldAction {
  type: ActionType.POST_GET_FIELD;
  payload: string;
}

interface UpdatePostAction {
  type: ActionType.POST_UPDATE;
  payload: string;
}
export type Action =
  | LoginAction
  | RegisterAction
  | GetUserInfo
  | LogoutAction
  | ModalAction
  | CloseModalAction
  | ToggleHanlder;
export type PostAction =
  | GetPostAction
  | RegisterPostAction
  | DeletePostAction
  | GetPostingAction
  | GetFieldAction
  | UpdatePostAction;

export type ModalAction = OpenModalAction | CloseModalAction;
