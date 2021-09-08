//액션의 interface 지정

import {ActionType} from '../action-type'

//User 관련
interface ModalAction {
    type : ActionType.OPEN_MODAL
}

interface CloseModalAction {
    type : ActionType.CLOSE_MODAL
}

interface LoginAction {
    type : ActionType.LOGIN_USER
    payload : string
}

interface LogoutAction {
    type : ActionType.LOGOUT_USER
}

interface RegisterAction {
    type : ActionType.REGISTER_USER
}

interface GetUserInfo {
    type : ActionType.USER_INFO
    payload : string
}


//게시물 관련
interface GetPostAction {
    type : ActionType.POST_INFO
    payload : string
}

interface RegisterPostAction {
    type : ActionType.POST_REGISTRATION
    payload : string
}

interface DeletePostAction {
    type : ActionType.POST_DELETE
}

export type Action = LoginAction | RegisterAction | GetUserInfo | LogoutAction | ModalAction | CloseModalAction
export type PostAction = GetPostAction | RegisterPostAction | DeletePostAction