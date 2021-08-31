//액션의 interface 지정

import {ActionType} from '../action-type'

interface LoginAction {
    type : ActionType.LOGIN_USER
    payload : string
}

interface RegisterAction {
    type : ActionType.REGISTER_USER
}

interface GetUserInfo {
    type : ActionType.USER_INFO
    payload : string
}

export type Action = LoginAction | RegisterAction | GetUserInfo