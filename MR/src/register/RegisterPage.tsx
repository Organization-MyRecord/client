import React, {useState} from 'react'
import axios from 'axios'
import '../styles/register.scss'

export default function RegisterPage() {
    
    const [ID, setID] = useState<string>("")
    const [Password, setPassword] = useState<string>("")
    const [PasswordCheck, setPasswordCheck] = useState<string>("")
    const [Name, setName] = useState<string>("")
    const [Email, setEmail] = useState<string>("")
    const [toggle, settoggle] = useState<boolean>(false)
    const [Anum, setAnum] = useState<string>("")

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

    const AnumHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnum(e.currentTarget.value)
    }

    const register = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('/api/register',{
            age: 0,
            email: Email,
            field: "IT웹통신",
            gender: "남",
            job: "string",
            major: "string",
            name: Name,
            password: Password,
            secondPassword: PasswordCheck
        })
    }


    const emailAuth = () => {
        axios.get(`api/email?email=${Email}`)
        .then(res => {
            console.log(res);
            settoggle(true)
        })
    }

    const aaa = () => {
        axios.get(`api/verify?email=${Email}&randomCode=${Anum}`)
        .then(res => console.log(res))
    }
    return (
        <div>
            <form onSubmit={register} className = "register_container">
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
                <div style = {toggle ? {opacity : '1'} : {opacity : "0"}}>
                    <input type= "text" value = {Anum} onChange = {AnumHandler}/>
                    <button onClick = {aaa}>버튼 ㅋㅋ</button>
                </div>
            </form>
        </div>
    )
}
