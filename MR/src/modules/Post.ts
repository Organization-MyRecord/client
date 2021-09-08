import { ActionType } from "./action-type";
import {PostAction} from './actions/index'

type PostState = {
    MyData : any,
    TotalData : any,
    LoadingData : boolean,
    modalText : string
}

const initialState : PostState = {
    MyData : null,
    TotalData : null,
    LoadingData : false,
    modalText : ""
}


const Post = (state : PostState = initialState, action: PostAction) => {
    switch(action.type) {
        case  ActionType.POST_INFO :
            return {
                ...state,
                TotalData : action.payload
            }
        case ActionType.POST_REGISTRATION :
            return {
                ...state
            }
        case ActionType.POST_DELETE :
            return {
                ...state
            }
        default :
            return state
    }

}

export default Post