//액션 타입 지정

export enum ActionType {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  REGISTER_USER = "REGISTER_USER",
  USER_INFO = "USER_INFO",
  USER_ISLOGIN = "USER_ISLOGIN",

  //게시글 관련 Action 타입
  POST_INFO = "POST_INFO",
  POST_REGISTRATION = "POST_REGISTRATION",
  POST_DELETE = "POST_DELETE",
  POST_GET = "GET_POST",
  POST_GET_FIELD = "POST_GET_FIELD",
  POST_UPDATE = "POST_UPDATE",

  //모달 관련
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",

  //사이드바 관련
  SIDEBAR_OPEN = "SIDEBAR_OPEN",
  SIDEBAR_NONE = "SIDEBAR_NONE",
}
