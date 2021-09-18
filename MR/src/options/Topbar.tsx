import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import TextLogo from "./text_logo2.png";
import Login from "../Components/Login";
import "../styles/topbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { LogoutHandler } from "../modules/action-creator";
import { RootState } from "../modules/Store";

function Topbar() {
  const [Keyword, setKeyword] = useState("");
  const [OpenModal, setOpenModal] = useState(false);
  const isLogin = useSelector((state: RootState) => state.User.userLoading); //사용자가 로그인 되어 있는지 확인

  const history = useHistory();
  const dispatch = useDispatch();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const onOpen = () => {
    setOpenModal(true);
  };

  const onclick = () => {
    //클릭 시 함수
    console.log(Keyword);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <header className="topbar">
      <Link to="/">
        <div className="logo_area">
          <img src={TextLogo} alt="text_logo" width="180px" height="45px" />
        </div>
      </Link>
      <div className="bar_search">
        <input type="text" placeholder="Search..." value={Keyword} onChange={onchange} />
        <button className="search_logo">
          <FaSearch className="logo" onClick={onclick} />
        </button>
      </div>
      <div className="bar_info">
        <button className={isLogin ? "small_btn unvisible" : "small_btn"} onClick={onOpen}>
          Login
        </button>
        <button className={isLogin ? "small_btn unvisible" : "small_btn"} onClick={() => history.push("/registerpage")}>
          Sign Up
        </button>
        <button
          className={isLogin ? "small_btn" : "small_btn unvisible"}
          onClick={() => {
            dispatch(LogoutHandler(history, dispatch));
          }}
        >
          Logout
        </button>
        <button className="account_logo">
          <FaUserCircle
            className="logo"
            onClick={() => {
              history.push("/mypage");
            }}
          />
        </button>
      </div>

      <Modal className="Modal" isOpen={OpenModal} ariaHideApp={false} onRequestClose={handleCloseModal}>
        <Login setopenmodal={setOpenModal} openmodal={OpenModal} />
      </Modal>
    </header>
  );
}

export default Topbar;
