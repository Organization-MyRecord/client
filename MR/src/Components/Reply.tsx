import { Link } from "react-router-dom";
import "../styles/reply.scss";

function Reply() {
  return (
    <li className="comment">
      <Link to="" className="reply_thumb">
        <img src="https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png" />
      </Link>
      <div className="reply_box">
        <Link to="" className="link_name">
          <span>나는야 퉁퉁이</span>
        </Link>
        <p>포스팅이 너무 예쁘네욤 히히히히ㅣ히히</p>
        <span className="date">2021.09.15</span>
        <div className="modify">
          <Link to="">
            <p>답글</p>
          </Link>
          <Link to="">
            <p>수정/삭제</p>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default Reply;
