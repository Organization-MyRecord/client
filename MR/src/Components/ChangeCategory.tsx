import React, { useEffect, useState } from "react";
import "../styles/change-category.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/Store";
import { OpenModalHandler } from "../modules/action-creator/ModalIndex";
import Loader from "react-loader-spinner";

interface ICategory {
  result: boolean;
  discription: string;
  value: any;
}

function ChangeCategory() {
  const userEmail = useSelector((state: RootState) => state.User.userEmail);
  const dispatch = useDispatch();
  const [changeToggle, setchangeToggle] = useState(true);
  const [inputToggle, setinputToggle] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [categoryList, setcategoryList] = useState<ICategory>();
  //추가할 디렉토리의 input state
  const [name, setname] = useState("");
  const [inputDirectory, setinputDirectory] = useState("");
  const [ChangedirectoryInput, setChangedirectoryInput] = useState("");

  useEffect(() => {
    axios.get(`/api/directory/${userEmail}`).then((res) => {
      setcategoryList(res.data);
    });
  }, [userEmail, categoryList]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputDirectory(e.currentTarget.value);
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedirectoryInput(e.currentTarget.value);
  };

  //디렉토리 추가 버튼
  const AddDirectory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "/api/directory",
        {
          name: inputDirectory,
        },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        if (res.data.result) {
          dispatch(OpenModalHandler("카테고리가 정상적으로 추가되었습니다!"));
          setinputDirectory("");
        } else {
          dispatch(OpenModalHandler(res.data.description));
        }
        setLoading(false);
      });
  };

  //디렉토리 삭제
  const DeletDirectory = async (directoryName) => {
    await axios
      .delete(`/api/directory/${directoryName}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.result) {
          dispatch(OpenModalHandler(res.data.description));
        } else {
          dispatch(OpenModalHandler(res.data.description));
        }
      });
  };
  //토글 하나만 하기 구현
  const modifytoggle = (namex) => {
    console.log(name);
    setname(namex);
    if (name === namex) {
      setname("");
    }
  };

  const ModifyCategory = async (category) => {
    setLoading(true);
    await axios
      .put(
        `/api/directory/${category}`,
        { name: ChangedirectoryInput },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.result) {
          dispatch(OpenModalHandler(res.data.description));
        } else {
          dispatch(OpenModalHandler(res.data.description));
        }
      });
  };

  //내 디렉토리를 표시
  const list = categoryList?.value.directoryList.map((item) => {
    return (
      <li key={item.directoryName} className="total_list_item">
        <div className="item_order">
          <span className="text_name">
            {item.directoryName}
            {` `}({item.count})
          </span>
          <div className="info_btn">
            <div className="btn_post" onClick={() => modifytoggle(item.directoryName)}>
              수정
            </div>
            <div className="btn_post" onClick={() => DeletDirectory(item.directoryName)}>
              삭제
            </div>
          </div>
        </div>
        <div
          className="wrap_add"
          style={name === item.directoryName ? { display: "" } : { display: "none" }}
          key={item.directoryName}
        >
          <div className="lab_btn_lab_add">
            <form className="edit">
              <label className="lab_tf">
                <strong className="screen_out">카테고리 Label</strong>
                <input
                  placeholder={item.directoryName}
                  type="text"
                  className="tf_blog"
                  maxLength={40}
                  onChange={inputHandler}
                />
              </label>
              <div className="order_btn">
                <button
                  type="button"
                  className={ChangedirectoryInput ? "btn_cancel" : "btn_ok"}
                  onClick={() => ModifyCategory(item.directoryName)}
                >
                  {Loading ? <Loader type="Oval" color="#3d66ba" height={30} width={30} timeout={3000} /> : "확인"}
                </button>
                <button type="button" className="btn_cancel" onClick={() => modifytoggle(item.directoryName)}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="change_category">
      <div>카테고리 관리</div>
      <div className="my_category">
        <div className="wrap_order">
          <ul className="list_order">
            <li className="total_list_item">
              <div className="item_order">
                <span className="text_name">전체보기</span>
              </div>
            </li>
            {list}
          </ul>
          <div className="wrap_add" onClick={() => setinputToggle(false)}>
            <div className="lab_btn_lab_add">
              <label>
                <span className="plus">+</span>
                카테고리 추가
              </label>
              <span className="total_count"></span>
            </div>
          </div>
          <div className="wrap_add" style={inputToggle ? { display: "none" } : { display: "" }}>
            <div className="lab_btn_lab_add">
              <form className="edit" onSubmit={AddDirectory}>
                <label className="lab_tf">
                  <strong className="screen_out">카테고리 Label</strong>
                  <input
                    value={inputDirectory}
                    type="text"
                    className="tf_blog"
                    maxLength={40}
                    onChange={inputChangeHandler}
                  />
                </label>
                <div className="order_btn">
                  <button className={inputDirectory ? "btn_cancel" : "btn_ok"}>
                    {Loading ? <Loader type="Oval" color="#3d66ba" height={30} width={30} timeout={3000} /> : "확인"}
                  </button>
                  <button type="button" className="btn_cancel" onClick={() => setinputToggle(true)}>
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeCategory;
