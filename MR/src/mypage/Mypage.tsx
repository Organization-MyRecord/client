import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/mypage.scss';

function Mypage() {
  return (
    <div className="mypage">
      <div className="profile_cotainer">
        <div className="profile">
          <FaUserCircle />
          <br />
          김정수
          <br />
          sunpl0718@naver.com
          <br />
          <button>기본정보 수정</button>
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
                <td>13개</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="interests">
          <table>
            <tbody>
              <tr>
                <td>나이</td>
                <td>100세</td>
              </tr>
              <tr>
                <td>관심분야</td>
                <td>IT산업</td>
              </tr>
              <tr>
                <td>전공 계열</td>
                <td>공학계열</td>
              </tr>
            </tbody>
          </table>
          Discription : 무엇 전직업 대학교
        </div>
      </div>
      <div className="mypost_container">
        <div className="motto">태초에 하나님이 천지를 창조하시느니라.</div>
        <div className="mypost">
          <div className="post_info">
            전체글 0개
            <button>글쓰기</button>
          </div>
          <div>여기에 내 글 정보들이 들어갈 꺼입니다.</div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
