import React from "react";

function PostList() {
  return (
    <div className="List_Container">
      <div className="category_list">
        <ul className="list">
          <li className="list_item">
            <div className="content">
              <a href="ddd" className="post_image"></a>
              <div className="box_content">
                <a className="link_title"></a>
                <div className="post_info">
                  <a className="userName">
                    <span className="nametag"></span>
                  </a>
                  <span className="date"></span>
                </div>
                <p className="post_text"></p>
                <button className="readMore">더보기..</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PostList;
