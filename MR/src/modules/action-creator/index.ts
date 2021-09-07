//액션 생성함수 지정

import { ActionType } from "../action-type"
import {Action} from '../actions/index'
import {Dispatch} from 'redux'
import axios from "axios"

export const CloseModalHandler = () => {
    return (dispatch : Dispatch<Action>) => {
        dispatch({
            type : ActionType.CLOSE_MODAL
        })
    }
}

export const LoginHandler = (Email : string, Password : string, setopenmodal : any) => {
    console.log("여기1");
    
    return async(dispatch : Dispatch<Action>) => {
        console.log("durl2");
        
        await axios.post('/api/authenticate',{
            email : Email,
            password : Password
        })
        .then((response) => {
            localStorage.setItem("token", response.data)
            console.log(response)
            dispatch({
                type : ActionType.LOGIN_USER,
                payload : response.data
            })
        })
        .then(() => {
            setopenmodal(false)
            dispatch({
                type : ActionType.OPEN_MODAL
            })
        })
    }
}

export const RegisterHandler = (
    age: number,
    birth: string,
    detailMajor: string,
    email: string,
    field: string,
    gender: string,
    major: string,
    name: string,
    password: string,
    secondPassword: string
) => {
    return async(dispatch : Dispatch<Action>) => {
        await axios.post('/api/register', {
            age: age,
            birth : birth,
            email: email,
            field: field,
            gender: gender,
            major: major,
            detailMajor : detailMajor,
            name: name,
            password: password,
            secondPassword: secondPassword
        })
        .then(res => {
            console.log(res);
            dispatch({
                type : ActionType.REGISTER_USER
            })
        })
    }
}

export const GetUserInfo = () =>{
    
    return async(dispatch : Dispatch<Action>) => {
                
        await axios.get('/api/mypage', {
            headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
        })
        .then(res => {
            dispatch({
                type : ActionType.USER_INFO,
                payload : res.data
            })
        })
    }
}

export const LogoutHandler = () => {
    return (dispatch : Dispatch<Action>) => {
        localStorage.removeItem("token")
        dispatch({
            type : ActionType.LOGOUT_USER
        })
    }
}
