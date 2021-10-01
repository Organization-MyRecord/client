import { useEffect, useState } from "react";
import "../styles/change-category.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../modules/Store";

interface ICategory {
  result: boolean;
  discription: string;
  value: any;
}

function ChangeCategory() {
  const userEmail = useSelector((state: RootState) => state.User.userEmail);

  useEffect(() => {
    axios.get(`/api/directory/${userEmail}`).then((res) => {
      setcategoryList(res.data);
    });
  });
  const [inputToggle, setinputToggle] = useState(true);
  const [categoryList, setcategoryList] = useState<ICategory>();

  const list = categoryList?.value.directoryList.map((item) => {
    return (
      <li key={item} className="total_list_item">
        <div className="item_order">
          <span className="text_name">{item}</span>
          <div className="info_btn">
            <div className="btn_post">수정</div>
            <div className="btn_post">삭제</div>
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
              <form className="edit">
                <label className="lab_tf">
                  <strong className="screen_out">카테고리 Label</strong>
                  <input type="text" className="tf_blog" maxLength={40} />
                </label>
                <div className="order_btn">
                  <button className="btn_ok">확인</button>
                  <button className="btn_cancel" onClick={() => setinputToggle(true)}>
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
