import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GetUserInfo } from "../modules/action-creator";
import { RootState } from "../modules/Store";
import ReactPaginate from "react-paginate";
import "../styles/change.scss";

function ChangeInfo() {

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
    <div className="editing-container">
      <table>
        <thead>기본정보 수정</thead>
        <tbody>
          <tr>
            <td>닉네임</td>
            <td><input type="text" value={(userData?.name)}/></td>
          </tr>
          <tr>
          <td>관심분야</td>
          <td><select classNae="inputSelect" onChange={FieldHandler} placeholder={field}>
            {fieldList}</select>></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ChangeInfo;
