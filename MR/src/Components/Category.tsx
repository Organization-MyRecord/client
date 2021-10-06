import { Link } from "react-router-dom";
import "../styles/category.scss";

interface IProps {
  directoryList: any;
  email: string;
}

function Category(props: IProps) {
  const { directoryList, email } = props;

  const category = directoryList?.value.directoryList.map((item) => {
    return (
      <li key={item.directoryName} className="category_item">
        <Link className="items" to={`/postList/direcory/${item.directoryName}/${email}`}>
          {item.directoryName}
        </Link>
        {` `}
        <span>({item.count})</span>
      </li>
    );
  });
  return (
    <div className="category_Wrapper">
      <div className="title">카테고리</div>
      <ul className="category_list">
        <li className="item_total">전체보기</li>
        {category}
      </ul>
    </div>
  );
}

export default Category;
