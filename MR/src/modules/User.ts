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

            }
        case ActionType.REGISTER_USER :
            return {

            }
        default :
            return state
    }

}

export default user