import React, { useEffect, useState } from "react";
import { options, Major } from "../options/options";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CloseModalHandler, GetUserInfo } from "../modules/action-creator";
import { RootState } from "../modules/Store";
import "../styles/change-info.scss";
import axios, { AxiosError } from "axios";
import { ConfirmModalHandler, OpenModalHandler } from "../modules/action-creator/ModalIndex";

function ChangeInfo() {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state: RootState) => state.User.myData.email);
  useEffect(() => {
    dispatch(GetUserInfo(email));
  }, [email, dispatch]);
  const [Name, setName] = useState(""); //이름
  const [major, setmajor] = useState(""); //전공계열
  const [Description, setDescription] = useState(""); //전공세부
  const [field, setfield] = useState(""); //분야
  const [imageState, setimageState] = useState<File>();

  const userData = useSelector((state: RootState) => state.User.userData); //유저정보 가져오기
  const image = useSelector((state: RootState) => state.User.image);
  const NameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  console.log(major, field);

  //분야를 select option
  const fieldList = options.map((item) => {
    return (
      <option key={item.label} value={item.value === userData.field ? "default" : item.value}>
        {item.value}
      </option>
    );
  });
  const majorList = Major.map((item) => {
    return (
      <option key={item.label} value={item.value === userData.field ? "default" : item.value}>
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

  const DescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const fileUpload = async () => {
    const formData = new FormData();
    formData.append("file", imageState);
    let url = "";
    try {
      axios
        .post("/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          url = res.data;
          sessionStorage.setItem("url", url);
        })
        .then(() => {
          dispatch(CloseModalHandler());
        });
    } catch (error) {
      const err = error as AxiosError;
      return { ...err.response };
    }
  };
  const remove = () => {
    sessionStorage.removeItem("url");
    dispatch(OpenModalHandler("삭제되었습니다."));
  };

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    setimageState(fileList[0]);
  };

  useEffect(() => {
    if (imageState === undefined) {
      return;
    } else {
      dispatch(ConfirmModalHandler(`${imageState?.name}를 추가 하시겠습니까?`, fileUpload));
    }
  }, [imageState]);

  const changeHandler = () => {
    dispatch(ConfirmModalHandler("변경사항을 저장하시겠습니까?", ChaneInfo));
  };

  const ChaneInfo = async () => {
    await axios
      .put(
        `/api/mypage?description=${Description}&userImage=${sessionStorage.getItem("url")}&userName=${Name}`,
        {},
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        if (res.data.result) {
          dispatch(OpenModalHandler("변경사항이 저장되었습니다!"));
          history.push("/");
          sessionStorage.removeItem("url");
        } else {
          dispatch(OpenModalHandler("개인정보 수정에 실패하였습니다."));
        }
      });
  };

  return (
    <div className="change_info">
      <div className="profile_cotainer">
        <div className="profile">
          {image === "string" || image === null ? (
            <FaUserCircle id="user_icon" />
          ) : (
            <div className="box">
              <img alt="profile" className="box_profile" src={userData?.image} />
            </div>
          )}
          <h1>{userData?.name}</h1>
          <p>{userData?.email}</p>
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
      <div className="mypost_change_container">
        <h3 className="tit_cont">개인정보수정</h3>
        <form className="form_set">
          <fieldset className="profile_img">
            <legend className="screen_out">이미지 설정</legend>
            <div className="img_wrapper">
              {!sessionStorage.getItem("url") ? (
                ""
              ) : (
                <img
                  src={`${sessionStorage.getItem("url")}`}
                  alt="profile"
                  className="thumb"
                  width="100%"
                  height="100%"
                />
              )}
              <label className="lab_photo">
                <span className="plus_btn">이미지 찾아보기</span>
                <input type="file" className="btn_g" accept="image/*" onChange={imageHandler} />
              </label>
              {!sessionStorage.getItem("url") ? (
                ""
              ) : (
                <button
                  type="button"
                  className="delete_btn"
                  onClick={() => {
                    dispatch(ConfirmModalHandler("이미지를 삭제하시겠습니까?", remove));
                  }}
                >
                  이미지 삭제
                </button>
              )}
            </div>
          </fieldset>

          <fieldset className="fld_info">
            <legend className="screen_out">개인정보 설정</legend>
            <label className="lab_info">
              <strong className="tit_set">닉네임</strong>
              <input
                type="text"
                className="tf_blog"
                maxLength={40}
                placeholder={userData.name}
                onChange={NameHandler}
              />
            </label>
            <label className="lab_info">
              <strong className="tit_set">관심분야</strong>
              <select className="tf_blog" onChange={FieldHandler}>
                {fieldList}
              </select>
            </label>
            <label className="lab_info">
              <strong className="tit_set">전공계열</strong>
              <select className="tf_blog" onChange={majorHandler}>
                {majorList}
              </select>
            </label>
            <div className="lab_tf">
              <strong className="title_set">블로그 설명</strong>
              <textarea
                className="tf_blog"
                placeholder="나를 잘 나타낼 수 있는 설명을 적어보세요!"
                onChange={DescriptionHandler}
              ></textarea>
            </div>
          </fieldset>
          <fieldset className="save">
            <legend className="screen_out">저장버튼</legend>
            <button type="button" className="btn_save" onClick={changeHandler}>
              변경사항 저장
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ChangeInfo;
