import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/category.scss";

interface IProps {
  userEmail: string;
}

interface ICategory {
  result: boolean;
  discription: string;
  value: any;
}

function Category(props: IProps) {
  const { userEmail } = props;
  //카테고리 리스트
  const [categoryList, setcategoryList] = useState<ICategory>();

  useEffect(() => {
    axios.get(`/api/directory/${userEmail}`).then((res) => {
      setcategoryList(res.data);
    });
  }, [userEmail]);

  const category = categoryList?.value.directoryList.map((item) => {
    return (
      <li key={item} className="category_item">
        {item}
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
