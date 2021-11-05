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

interface OpenConFirmModalAction {
  type: ActionType.OPEN_CONFIRM_MODAL;
  payload: string;
  func: any;
}

//User 관련
interface LoginAction {
  type: ActionType.LOGIN_USER;
  payload: string;
  email: string;
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
  image: string;
}

interface ToggleHanlder {
  type: ActionType.USER_ISLOGIN;
}

interface ToggleOpenSideBar {
  type: ActionType.SIDEBAR_OPEN;
}

interface ToggleNoneSideBar {
  type: ActionType.SIDEBAR_NONE;
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

interface PostSearchAction {
  type: ActionType.POST_SEARCH;
  payload: string;
}

interface GetDirectoryDataAction {
  type: ActionType.GET_DIRECTORY_DATA;
  payload: string;
}
export type Action =
  | LoginAction
  | RegisterAction
  | GetUserInfo
  | LogoutAction
  | ModalAction
  | CloseModalAction
  | ToggleHanlder
  | ToggleOpenSideBar
  | ToggleNoneSideBar;
export type PostAction =
  | GetPostAction
  | RegisterPostAction
  | DeletePostAction
  | GetPostingAction
  | GetFieldAction
  | UpdatePostAction
  | PostSearchAction
  | GetDirectoryDataAction;

export type ModalAction = OpenModalAction | CloseModalAction | OpenConFirmModalAction;
