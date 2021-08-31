import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import Modal from 'react-modal'
import { FaAdversal, FaSearch, FaUserCircle } from "react-icons/fa";
import Login from '../Components/Login'
import "../styles/topbar.scss";

function Topbar() {
  const [Keyword, setKeyword] = useState("");
  const [OpenModal, setOpenModal] = useState(false)

  const history = useHistory()

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const onOpen = () => {
    setOpenModal(true)
  }


  const onclick = () => {
    //클릭 시 함수
    console.log(Keyword);
  };

  
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <header className="topbar">
      <div className="bar_logo" onClick = {() => {history.push('/')}}>
        <FaAdversal className="logo" />
        <a>MyRecord</a>
      </div>
      <div className="bar_search">
        <input type="text" placeholder="Search..." value={Keyword} onChange={onchange} />
        <button className="search_logo">
          <FaSearch className="logo" onClick={onclick}/>
        </button>
      </div>
      <div className="bar_info">
        <button className="small_btn" onClick = {onOpen}>Login</button>
        <button className="small_btn" onClick = {() => {localStorage.removeItem("token")}}>Logout</button>
        <button className="account_logo">
          <FaUserCircle className="logo" onClick = {() => {history.push('/mypage')}}/>
        </button>
      </div>

      <Modal className = "Modal" isOpen ={OpenModal} ariaHideApp= {false} onRequestClose = {handleCloseModal}>
        <Login setopenmodal = {setOpenModal}  openmodal = {OpenModal}/>
      </Modal>
    </header>
  );
}

export default Topbar;
