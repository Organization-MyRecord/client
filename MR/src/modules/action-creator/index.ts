//액션 생성함수 지정

import { ActionType } from "../action-type"
import {Action} from '../actions/index'
import {Dispatch} from 'redux'
import axios from "axios"

export const LoginHandler = (Email : string, Password : string, setopenmodal : any) => {
    return async(dispatch : Dispatch<Action>) => {
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
            console.log("가나라다마바사아");
            setopenmodal(false)})
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