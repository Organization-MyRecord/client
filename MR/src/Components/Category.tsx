import "../styles/category.scss";

interface IProps {
  directoryList: any;
}

function Category(props: IProps) {
  const { directoryList } = props;

  const category = directoryList?.value.directoryList.map((item) => {
    return (
      <li key={item.directoryName} className="category_item">
        {item.directoryName}
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
