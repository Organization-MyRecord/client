import React,{useState} from 'react'
import {FaAdversal,FaSearch,FaUserCircle} from 'react-icons/fa'
import '../styles/topbar.scss'

function Topbar() {
    const [Keyword, setKeyword] = useState("")

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.currentTarget.value)
    }

    const onclick = () => {     //클릭 시 함수
        console.log(Keyword);
        
    }

    return (
        <nav className = "topbar">
            <div className="bar_logo">
                <FaAdversal className="logo"/>
                <a>MyRecord</a>
            </div>
            <div className="bar_search">
                <input type = "text" placeholder = "Search..." value = {Keyword} onChange = {onchange}/>
                <FaSearch className="logo" onClick = {onclick}/>
            </div>
            <div className="bar_info">
                <button className="small_btn">Login</button>
                <button className="small_btn">Logout</button>
                <FaUserCircle className="logo"/>
            </div>
        </nav>
    )
}

export default Topbar
