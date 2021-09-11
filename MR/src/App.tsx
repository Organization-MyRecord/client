import "./styles/app.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import Mypage from "./Components/Mypage";
import RegisterPage from "./Components/RegisterPage";
import Topbar from "./options/Topbar";
import Post from "./Components/Post";
import Sidebar from "./options/Sidebar";
import Modal from "./options/Modal";
import { CloseModalHandler } from "./modules/action-creator/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules/Store";
import PostView from "./Components/PostView";
import PostList from "./Components/PostList";

function App() {
  const dispatch = useDispatch();

  const bool = useSelector((state: RootState) => state.User.modalstate);

  const CloseModal = () => {
    dispatch(CloseModalHandler());
  };

  return (
    <div className="app">
      <BrowserRouter>
        <header>
          <Topbar />
        </header>
        <aside>
          <Sidebar />
        </aside>
        <section className="Global_section">
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/mypage" component={Mypage} />
            <Route path="/registerpage" component={RegisterPage} />
            <Route exact={true} path="/post/:update" component={Post} />
            <Route exact={true} path="/post/:userEmail/:postId" component={PostView} />
            <Route exact={true} path="/postList/:Field" component={PostList} />
            {/* Not Found */}
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </section>
      </BrowserRouter>
      <Modal
        open={bool}
        close={CloseModal}
        header={bool ? "로그인이 완료되었습니다" : "비밀번호를 확인해주시기 바랍니다"}
      />
    </div>
  );
}

export default App;
