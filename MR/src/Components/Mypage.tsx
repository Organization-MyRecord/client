import React, { useEffect, useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GetUserInfo } from "../modules/action-creator";
import { RootState } from "../modules/Store";
import ReactPaginate from "react-paginate";
import "../styles/mypage.scss";

function Mypage() {
  const [currentPage, setcurrentPage] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(GetUserInfo());
  }, []);

  const userData = useSelector((state: RootState) => state.User.userData); //유저정보 가져오기

  const changePage = (page) => {
    setcurrentPage(page);
  };

  const MyPost = userData?.myPostList?.map((item: any, index: number) => {
    return (
      <tbody id={"body" + index} key={item.id}>
        <tr>
          <td id="title">{item.postName}</td>
        </tr>
        <tr>
          <td id="content">{item.content}</td>
        </tr>
      </tbody>
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
            </tbody>
          </table>
          Discription : <br />
          무엇 전직업 대학교
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
