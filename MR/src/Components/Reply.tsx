import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import "../styles/reply.scss";
interface IArray {
  commentId: number;
  userName: string;
  userImage: string;
  comment: string;
  commentTime: string;
}

export interface IReply {
  commentId: number;
  userName: string;
  userImage: string;
  comment: string;
  commentTime: string;
  commentList: Array<IArray>;
}
function Reply(props: IReply) {
  return (
    <li className="comment">
      <Link to="" className="reply_thumb">
        <img
          src={
            props.userImage === null || props.userImage === "string"
              ? "https://myrecord.s3.ap-northeast-2.amazonaws.com/7e1436db-68ea-45c5-b997-6de46f17280b.png"
              : props.userImage
          }
        />
      </Link>
      <div className="reply_box">
        <Link to="" className="link_name">
          <span>{props.userName}</span>
        </Link>
        <p>{props.comment}</p>
        <span className="date">{props.commentTime}</span>
        <div className="modify">
          <FaPlusSquare className="plus" size="19" />
          <p>2개의 답글</p>
        </div>
      </div>
      <ul></ul>
    </li>
  );
}

export default Reply;
