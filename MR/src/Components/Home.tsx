import { useSelector } from "react-redux";
import { RootState } from "../modules/Store";
import "../styles/home.scss";

function Home() {
  const isLogin = useSelector((state :RootState) => state.User.userLoading)
  console.log(isLogin);


  //피드부분 map 함수로 구현 할 것.

  return (
    <div className="home">
      {isLogin ? (
        <>
          <div className="myfeed_container">
            <h2>My 피드</h2>
            <div className="feed_container">
              <div className="feed">
                가나다라
                <h6>예시</h6>
              </div>
              <div className="feed">마바사아</div>
              <div className="feed">자차카타</div>
            </div>
          </div>
          <div className="populer_feed">
            <h2>인기글</h2>
            <div className="feed_container">
              <div className="feed">
                가나다라
                <h6>예시</h6>
              </div>
              <div className="feed">마바사아</div>
              <div className="feed">자차카타</div>
            </div>
          </div>
        </>
      ) : (
        <div className="populer_feed">
          <h2>인기글</h2>
          <div className="feed_container">
            <div className="feed">
              가나다라
              <h6>예시</h6>
            </div>
            <div className="feed">마바사아</div>
            <div className="feed">자차카타</div>
            <div className="feed">가나다라</div>
            <div className="feed">마바사아</div>
            <div className="feed">자차카타</div>
          </div>
        </div>
      )}
      <div className="new_post">
        <h2>최신 자료</h2>
        <div className="post_container">
          <img src="../../../../../카톡 이미지.jpg" alt="" width="92px" height="92px" />
          <div className="content_container">
            <h2>제목</h2>
            <a>가나다라마바사아 자차카타 파하</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
