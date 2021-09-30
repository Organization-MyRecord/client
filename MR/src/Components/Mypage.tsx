import { useEffect, useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GetUserInfo, SideBarOpenHandler } from "../modules/action-creator";
import { RootState } from "../modules/Store";
import ReactPaginate from "react-paginate";
import { OpenModalHandler } from "../modules/action-creator/ModalIndex";
import "../styles/mypage.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Category from "./Category";

async function GetDirectoryList(setdirectoties: any) {
  await axios
    .get("/api/directory", {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    })
    .then((res) => setdirectoties(res.data));
}

function Mypage() {
  const [currentPage, setcurrentPage] = useState(1);
  const [directoties, setdirectoties] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state: RootState) => state.User.myData.email);

  useEffect(() => {
    dispatch(GetUserInfo(email));
    GetDirectoryList(setdirectoties);

    return () => {
      dispatch(SideBarOpenHandler());
    };
  }, [email]);

  const userData = useSelector((state: RootState) => state.User.userData); //유저정보 가져오기

  const changePage = (page) => {
    setcurrentPage(page);
  };

  const onClickHandler = () => {
    if (directoties === null) {
      dispatch(OpenModalHandler("디렉토리를 만들어야 게시글을 작성할 수 있습니다!"));
    } else {
      history.push("/post");
    }
  };

  const MyPost = userData?.myPostList?.map((item: any) => {
    return (
      <li className="list_item" key={item.id}>
        <div className="content">
          <Link to={`/post/${userData.email}/${item.id}`}>
            <div
              className="post_image"
              style={{
                backgroundImage:
                  item.postImage == null || item.postImage == "string"
                    ? "url(https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png)"
                    : `url(${item.postImage})`,
              }}
            ></div>
          </Link>
          <div className="box_content">
            <Link className="link_title" to={`/post/${userData.email}/${item.id}`}>
              <strong className="post_title">{item.postName}</strong>
            </Link>
            <div className="post_info">
              <Link to="" className="userName">
                <span className="nametag">{userData.name}</span>
              </Link>
              <span className="date">2021.09.08</span>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="mypage">
      <div className="profile_cotainer">
        <div className="profile">
          {userData?.image == "string" ? (
            <FaUserCircle id="user_icon" />
          ) : (
            <div className="box">
              <img className="box_profile" src={userData?.image} />
            </div>
          )}
          <h1>{userData?.name}</h1>
          <a>{userData?.email}</a>
          <br />
          {sessionStorage.getItem("token") ? (
            <button id="user_edit" onClick={() => history.push("/changeinfo-category")}>
              기본정보 수정
            </button>
          ) : (
            ""
          )}

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
            </tbody>
          </table>
          Description:
          <br />
          무엇 전직업 대학교
        </div>
      </div>
      <div className="mypost_container">
        <div className="motto">태초에 하나님이 천지를 창조하시느니라.</div>
        <div className="mypost">
          <div className="post_info">
            전체글 {userData?.postPagination.totalElements}개
            <button className="post_btn" onClick={onClickHandler}>
              글쓰기
            </button>
          </div>
          <ul className="list">{MyPost == null ? "표시할 정보가 없습니다." : MyPost}</ul>
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
      <div className="category">
        <Category userEmail={email} />
      </div>
    </div>
  );
}

export default Mypage;
