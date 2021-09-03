import { ActionType } from "./action-type";
import {Action} from './actions/index'

type userState = {
    userLoading: boolean;
    userData: any
    error: any;
}

const initialState : userState = {
    userLoading : false,
    userData : null,
    error : null

}

//로그인

const user = (state : userState = initialState, action: Action) => {
    switch(action.type) {
        case ActionType.LOGIN_USER :
            return {
                ...state,
                userLoading : true

            }
        case ActionType.LOGOUT_USER :
            return {
                ...state,
                userLoading : false
            }
        case ActionType.REGISTER_USER :
            return {
                ...state
            }
        case ActionType.USER_INFO :
            return {
                ...state,
                userData : action.payload
            }
        default :
            return state
    }

}

export default user