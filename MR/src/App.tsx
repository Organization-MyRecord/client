import "./styles/app.scss";
import Layout from './options/Layout';
import Login from './Components/Login';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from "./Components/Home";
import Mypage from "./Components/Mypage";
import RegisterPage from "./Components/RegisterPage";
function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact = {true} path = "/" component = {Home}/>
          <Route path = "/mypage" component = {Mypage}/>
          <Route path = "/registerpage" component = {RegisterPage}/>
          <Route path = "/login" component  = {Login}/>
          {/* Not Found */}
          <Route component = {() => <Redirect to = "/" />} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
