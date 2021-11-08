import { Link } from "react-router-dom";
import "../styles/small-navbar.scss";

interface Iurl {
  path: string;
}

function SmallNavBar(props: Iurl) {
  const { path } = props;
  return (
    <ul className="change_nav">
      <li>
        <Link className="nav_item_avtive" to={path}>
          <div className="link">
            <span className="item_profile">프로필 관리</span>
            <div className="underbar"></div>
          </div>
        </Link>
      </li>
      <li>
        <Link className="" to={`${path}/category`}>
          <div className="link">
            <span className="item_category">카테고리 관리</span>
            <div className="underbar"></div>
          </div>
        </Link>
      </li>
      <li>
        <Link className="" to={`${path}/checkPassword`}>
          <div className="link">
            <span className="item_category">비밀번호 관리</span>
            <div className="underbar"></div>
          </div>
        </Link>
      </li>
    </ul>
  );
}

export default SmallNavBar;
