import "../styles/sidebar.scss";
import { options } from "./options";
import { Link } from "react-router-dom";

function Sidebar() {
  const option = options.map((item) => {
    return (
      <li key={item.label}>
        <Link to={`/postList/${item.label}`}>
          <h2>{item.value}</h2>
        </Link>
      </li>
    );
  });

  return (
    <aside className="left_aside">
      <ul>{option}</ul>
    </aside>
  );
}

export default Sidebar;
