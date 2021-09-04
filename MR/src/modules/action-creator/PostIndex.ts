//게시글 관련 액션 함수 지정

import { ActionType } from "../action-type"
import {PostAction} from '../actions/index'
import {Dispatch} from 'redux'
import axios from "axios"


export const GetPostHandler = (setLoading : any) => {
    return async(dispatch : Dispatch<PostAction>) => {
        if(localStorage.getItem("token") == null) {
            await axios.get("/api/main")
            .then(res =>{
                dispatch({
                    type : ActionType.POST_INFO,
                    payload : res.data
                })
                setLoading(false)
            }
            )
        } else {
            await axios.get("/api/main",{
                headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
            })
            .then(res =>{
                dispatch({
                    type : ActionType.POST_INFO,
                    payload : res.data
                })
                setLoading(false)
            }
            )
        }
    }
}