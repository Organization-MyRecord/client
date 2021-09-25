import "./styles/app.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import Mypage from "./Components/Mypage";
import RegisterPage from "./Components/RegisterPage";

import Topbar from "./options/Topbar";
import Post from "./Components/Post";
import Sidebar from "./options/Sidebar";
import Modal from "./options/Modal";
import { CloseModalHandler } from "./modules/action-creator/ModalIndex";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules/Store";
import PostView from "./Components/PostView";
import PostList from "./Components/PostList";
import ChangeInfo from "./Components/ChangeInfo";

function App() {
  const dispatch = useDispatch();
  const bool = useSelector((state: RootState) => state.Modal);
  const toggleSideBar = useSelector(
    (state: RootState) => state.User.toggleSidebar
  ); //true면 사이드바 보이고 false면 안보임

  const CloseModal = () => {
    dispatch(CloseModalHandler());
  };

  return (
    <div className="app">
      <BrowserRouter>
        <header>
          <Topbar />
        </header>
        <aside
          className="side-bar"
          style={{ display: toggleSideBar ? "" : "none" }}
        >
          <Sidebar />
        </aside>
        <section className="Global_section">
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/mypage" component={Mypage} />
            <Route path="/registerpage" component={RegisterPage} />
            <Route path="/changeinfo" component={ChangeInfo} />
            <Route exact={true} path="/post/:update?" component={Post} />
            <Route
              exact={true}
              path="/post/:userEmail/:postId"
              component={PostView}
            />
            <Route
              exact={true}
              path="/postList/:Field?/:KeyWord?"
              component={PostList}
            />
            {/* Not Found */}
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </section>
      </BrowserRouter>
      <Modal
        open={bool.ModalState}
        close={CloseModal}
        header={bool?.ModalText}
      />
    </div>
  );
}

export default App;
