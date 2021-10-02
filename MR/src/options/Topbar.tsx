import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import { FaUserCircle } from "react-icons/fa";
import TextLogo from "./text_logo2.png";
import Login from "../Components/Login";
import "../styles/topbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { LogoutHandler } from "../modules/action-creator";
import { RootState } from "../modules/Store";
import { OpenModalHandler } from "../modules/action-creator/ModalIndex";

function Topbar() {
  const [Keyword, setKeyword] = useState("");
  const [OpenModal, setOpenModal] = useState(false);
  const isLogin = useSelector((state: RootState) => state.User.isLogin); //사용자가 로그인 되어 있는지 확인

  const history = useHistory();
  const dispatch = useDispatch();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const onOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const HandleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      history.push(`/postList/-/${Keyword}`);
    }
  };

  return (
    <header className="topbar">
      <Link to="/">
        <div className="logo_area">
          <img src={TextLogo} alt="text_logo" width="180px" height="45px" />
        </div>
      </Link>
      <div className="bar_search">
        <input
          type="text"
          placeholder="레코드를 입력하세요."
          value={Keyword}
          onChange={onchange}
          onKeyDown={HandleKeyPress}
        />
        <Link to={`/postList/-/${Keyword}`}>
          <button className="search_logo">검색</button>
        </Link>
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
            dispatch(LogoutHandler(dispatch));
          }}
        >
          Logout
        </button>
        <button className="account_logo">
          <FaUserCircle
            className="logo"
            onClick={() => {
              if (sessionStorage.getItem("token")) {
                history.push("/mypage");
              } else {
                dispatch(OpenModalHandler("로그인을 먼저 해 주시기 바랍니다!"));
              }
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
