import axios from "axios";
import "../styles/category.scss";

interface IProps {
  directoryList: any;
  email: string;
}

function Category(props: IProps) {
  const { directoryList, email } = props;

  const onclickHandler = async (name) => {
    await axios.get(`/api/directory?directoryName=${name}&userEmail=${email}`).then((res) => console.log(res));
  };

  const category = directoryList?.value.directoryList.map((item) => {
    return (
      <li key={item.directoryName} className="category_item">
        <div onClick={() => onclickHandler(item.directoryName)}>{item.directoryName}</div>
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
