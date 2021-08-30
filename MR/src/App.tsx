import "./styles/app.scss";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from "./Components/Home";
import Mypage from "./Components/Mypage";
import RegisterPage from "./Components/RegisterPage";
import Topbar from "./options/Topbar";


function App() {

  return (
    <div className = "app">
      <Topbar/>
      <section>
      <BrowserRouter>
        <Switch>
          <Route exact = {true} path = "/" component = {Home}/>
          <Route path = "/mypage" component = {Mypage}/>
          <Route path = "/registerpage" component = {RegisterPage}/>
          {/* Not Found */}
          <Route component = {() => <Redirect to = "/" />} />
        </Switch>
      </BrowserRouter>
      </section>
    </div>
  );
}

export default App;
