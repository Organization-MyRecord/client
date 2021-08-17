import React, {useState} from 'react'
import axios from 'axios'
import '../styles/register.scss'

export default function RegisterPage() {
    
    const [ID, setID] = useState<string>("")
    const [Password, setPassword] = useState<string>("")
    const [PasswordCheck, setPasswordCheck] = useState<string>("")
    const [Name, setName] = useState<string>("")
    const [Email, setEmail] = useState<string>("")

    const IDHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setID(e.currentTarget.value)
    }
    const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const PasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.currentTarget.value)
    }
    const NameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const EamilHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const register = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('')
    }

    const emailAuth = async() => {
        await axios.get(`3.22.47.207:8080/api/email?email=${Email}`)
        .then(res => console.log(res))
    }
    return (
        <div className = "register">
            <form onSubmit={register}>
                <label>아이디</label>
                <input type = "text" value = {ID} onChange = {IDHandler}/>
                <label>비밀번호</label>
                <input type = "password"  value = {Password}  onChange = {PasswordHandler}/>
                <label>비밀번호 확인</label>
                <input type = "password" value = {PasswordCheck} onChange = {PasswordCheckHandler}/>
                <label>이름</label>
                <input type = "text" value = {Name}  onChange = {NameHandler}/>
                <label>이메일</label>
                <input type = "text" value = {Email}  onChange = {EamilHandler}/>
                <button type = "submit">등록</button>
                <button onClick = {emailAuth}>메일 인증</button>
            </form>
        </div>
    )
}
