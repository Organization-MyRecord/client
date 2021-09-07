import axios from "axios";
import React, { useEffect, useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GetUserInfo } from "../modules/action-creator";
import { RootState } from "../modules/Store";
import ReactPaginate from "react-paginate";
import "../styles/mypage.scss";
import { options, Major } from "../options/options";
import { RegisterHandler } from "../modules/action-creator";

function Mypage() {
  const GetMyInfo = async () => {
    await axios
      .get("/api/mypage", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => console.log(res.data));
  };
  const dispatch = useDispatch();

  const [birth, setbirth] = useState(""); //생년월일
  const [Password, setPassword] = useState(""); //패스워드
  const [PasswordCheck, setPasswordCheck] = useState(""); //패스워드 확인
  const [Name, setName] = useState(""); //이름
  const [Email, setEmail] = useState(""); //이메일
  const [toggle, settoggle] = useState<boolean>(false); //인증번호 시에 나올 입력창 토글
  const [Anum, setAnum] = useState(""); //인증번호
  const [radioState, setradioState] = useState(""); //성별
  const [field, setfield] = useState(""); //분야
  const [major, setmajor] = useState(""); //전공계열
  const [majorDetail, setmajorDetail] = useState(""); //전공세부

  const BirthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //생년월일 input onchange 함수
    setbirth(e.currentTarget.value);
  };
  const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const PasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.currentTarget.value);
  };
  const NameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const EamilHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const AnumHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnum(e.currentTarget.value);
  };

  const FieldHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setfield(e.currentTarget.value);
  };

  const majorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setmajor(e.currentTarget.value);
  };

  const majorDetailHander = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmajorDetail(e.currentTarget.value);
  };

  const onRadioChange = (e: any) => {
    setradioState(e.target.value);
  };
  //분야를 select option
  const fieldList = options.map((item) => {
    return (
      <option key={item.label} value={item.value}>
        {item.label}
      </option>
    );
  });

  //계열 select option
  const majorList = Major.map((item) => {
    return (
      <option key={item.label} value={item.value}>
        {item.label}
      </option>
    );
  });
  return (
    <div className="mypage">
      <div className="profile_cotainer">
        <div className="profile">
          {userData?.lenth == "string" ? (
            <FaUserCircle id="user_icon" />
          ) : (
            <div className="box">
              <img className="box_profile" src={userData?.image} />
            </div>
          )}
          <h1>{userData?.name}</h1>
          <a>{userData?.email}</a>
          <br />
          <button id="user_edit">기본정보 수정</button>
          <table>
            <tbody>
              <tr>
                <td>팔로잉</td>
                <td>123명</td>
              </tr>
              <tr>
                <td>팔로워</td>
                <td>83명</td>
              </tr>

              <tr>
                <td>나의 게시물</td>
                <td>{userData?.myPostList.length}개</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="interests">
          <table>
            <tbody>
              <tr>
                <td>나이</td>
                <td>{userData?.age}세</td>
              </tr>
              <tr>
                <td>관심분야</td>
                <td>{userData?.field}</td>
              </tr>
              <tr>
                <td>전공 계열</td>
                <td>{userData?.major}</td>
              </tr>
              Discription : <br />
              무엇 전직업 대학교
            </tbody>
          </table>
        </div>
      </div>
      <div className="mypost_container">
        <div className="motto">태초에 하나님이 천지를 창조하시느니라.</div>
        <div className="mypost">
          <div className="post_info">
            전체글 {userData?.postPagination.totalElements}개
            <button
              onClick={() => {
                history.push("/post");
              }}
            >
              글쓰기
            </button>
          </div>
          <table className="post_detail">
            {MyPost == null ? "표시할 정보가 없습니다." : MyPost}
          </table>
          <ReactPaginate
            pageCount={userData?.postPagination.totalPages} //총 페이지 수
            pageRangeDisplayed={10} //한 페이지에 표시할 게시글 수
            initialPage={currentPage} // 선택한 초기 페이지
            marginPagesDisplayed={1} //페이지 여백 수
            previousLabel={"<"} //이전 라벨
            nextLabel={">"} //다음 라벨
            breakLabel={"..."} //줄임 라벨
            onPageChange={changePage} //클릭 할 때 호출 할 메서드
            containerClassName={"pagination-ul"} //페이지 매김 컨테이너의 클래스 이름
            pageClassName={"page-li"} //각 페이지 요소의 li태그에 있는 클래스 이름
            activeClassName={"currentPage"} //활성 페이지의 클래스 이름
            previousClassName={"pageLabel-btn"} //이전 라벨의 클래스 이름
            nextClassName={"pageLabel-btn"} //다음 라벨의 클래스 이름
          />
        </div>
      </div>
    </div>
  );
}

export default Mypage;
