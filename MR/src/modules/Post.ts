import { ActionType } from "./action-type";
import {PostAction} from './actions/index'

type PostState = {
    MyData : any,
    TotalData : any,
    LoadingData : boolean
}

const initialState : PostState = {
    MyData : null,
    TotalData : null,
    LoadingData : false

}

//로그인

const Post = (state : PostState = initialState, action: PostAction) => {
    switch(action.type) {
        case  ActionType.POST_INFO :
            return {
                ...state,
                TotalData : action.payload
            }
        default :
            return state
    }

}

export default Post