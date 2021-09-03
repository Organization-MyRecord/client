import "./styles/app.scss";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from "./Components/Home";
import Mypage from "./Components/Mypage";
import RegisterPage from "./Components/RegisterPage";
import Topbar from "./options/Topbar";
import Post from "./Components/Post";
import Sidebar from "./options/Sidebar";


function App() {

  return (
    <div className = "app">
      <BrowserRouter>
        <header><Topbar/></header>
        <aside><Sidebar/></aside>
        <section>
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
  
    </div>
  );
}

export default App;
