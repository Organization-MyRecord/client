import { useState } from "react";
import "../styles/change-category.scss";

function ChangeCategory() {
  const [inputToggle, setinputToggle] = useState(true);
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
