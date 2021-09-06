import "./styles/app.scss";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from "./Components/Home";
import Mypage from "./Components/Mypage";
import RegisterPage from "./Components/RegisterPage";
import Topbar from "./options/Topbar";
import Post from "./Components/Post";
import Sidebar from "./options/Sidebar";
import Modal from "./options/Modal";
import {CloseModalHandler} from './modules/action-creator/index'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules/Store";



function App() {
  const dispatch = useDispatch()

  const bool = useSelector((state: RootState) => state.User.modalstate)
  console.log("bool" , bool);

  const CloseModal = () => {
    dispatch(CloseModalHandler())
  }
  

  return (
    <div className = "app">
      <BrowserRouter>
        <header><Topbar/></header>
        <aside><Sidebar/></aside>
        <section className = "Global_section">
        <Switch>
          <Route exact = {true} path = "/" component = {Home}/>
          <Route path = "/mypage" component = {Mypage}/>
          <Route path = "/registerpage" component = {RegisterPage}/>
          <Route path = "/post" component = {Post}/>
          {/* Not Found */}
          <Route component = {() => <Redirect to = "/" />} />
        </Switch>
        </section>
      </BrowserRouter>   
      <Modal open = {bool} close = {CloseModal} header = {bool ? "로그인이 완료되었습니다" : "비밀번호를 확인해주시기 바랍니다"}/>
    </div>
  );
}

export default App;
