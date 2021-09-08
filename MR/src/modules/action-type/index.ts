//액션 타입 지정

export enum ActionType {
    LOGIN_USER = 'LOGIN_USER',
    LOGOUT_USER = 'LOGOUT_USER',
    REGISTER_USER = 'REGISTER_USER',
    USER_INFO = 'USER_INFO',
    OPEN_MODAL = "OPEN_MODAL",
    CLOSE_MODAL = 'CLOSE_MODAL',

    //게시글 관련 Action 타입
    POST_INFO = 'POST_INFO',
    POST_REGISTRATION = 'POST_REGISTRATION',
    POST_DELETE = 'POST_DELETE'
}