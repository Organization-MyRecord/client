//액션의 interface 지정

import {ActionType} from '../action-type'

interface LoginAction {
    type : ActionType.LOGIN_USER
    payload : string
}

interface RegisterAction {
    type : ActionType.REGISTER_USER
}

export type Action = LoginAction | RegisterAction