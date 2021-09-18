import React, { useEffect, useState } from "react";
import { options, Major } from "../options/options";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GetUserInfo } from "../modules/action-creator";
import { RootState } from "../modules/Store";
import "../styles/change-info.scss";

function ChangeInfo() {
  const [currentPage, setcurrentPage] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state: RootState) => state.User.myData.email);
  useEffect(() => {
    dispatch(GetUserInfo(email));
  }, [email]);
  const [Name, setName] = useState(""); //이름
  const [major, setmajor] = useState(""); //전공계열
  const [Description, setDescription] = useState(""); //전공세부
  const [field, setfield] = useState(""); //분야

  const userData = useSelector((state: RootState) => state.User.userData); //유저정보 가져오기
  const NameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const changePage = (page) => {
    setcurrentPage(page);
  };

  //분야를 select option
  const fieldList = options.map((item) => {
    return (
      <option key={item.label} value={item.value}>
        {item.value}
      </option>
    );
  });
  const majorList = Major.map((item) => {
    return (
      <option key={item.label} value={item.value}>
        {item.label}
      </option>
    );
  });

  const FieldHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setfield(e.currentTarget.value);
  };
  const majorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setmajor(e.currentTarget.value);
  };

  const DescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

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
          {sessionStorage.getItem("token") ? <button id="user_edit">기본정보 수정</button> : ""}

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
          <div className="interests">
            <table>
              <tbody>
                <tr>
                  <td>현재 닉네임</td>
                  <td>{userData?.name}</td>
                </tr>
                <tr>
                  <td>새로운 닉네임</td>
                  <td>
                    {" "}
                    <input type="text" placeholder="변경 닉네임" value={Name} onChange={NameHandler} />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>현재 관심분야</td>
                  <td>{userData?.field}</td>
                </tr>
                <tr>
                  <td>새로운 관심분야</td>
                  <td>
                    <select className="inputSelect" onChange={FieldHandler} placeholder={field}>
                      {fieldList}
                    </select>
                  </td>
                </tr>
                <br />
                <tr>
                  <td>전공 계열</td>
                  <td>{userData?.major}</td>
                </tr>
                <tr>
                  <td>새로운 전공계열</td>
                  <td>
                    <select className="MajorSelect" onChange={majorHandler} placeholder={major}>
                      {majorList}
                    </select>
                  </td>
                </tr>
                <br />
                <tr>
                  <td>Discription :</td>
                  <td>
                    <input
                      type="text"
                      placeholder="내용을 입력하세요
                      ex) 전직업, 대학교, 세부관심사항"
                      value={Description}
                      onChange={DescriptionHandler}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            type="submit"
            onClick={() => {
              history.push("/Mypage");
            }}
          >
            개인정보수정 확인
          </button>
        </div>
        <ul className="list"></ul>
      </div>
    </div>
  );
}

export default ChangeInfo;
