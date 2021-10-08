import { BrowserRouter, Switch, Route } from "react-router-dom";
import SmallNavBar from "../options/SmallNavBar";
import ChangeInfo from "./ChangeInfo";
import ChangeCategory from "./ChangeCategory";
import "../styles/small-navbar.scss";
import PasswordConfirm from "./PasswordConfirm";

function ChangeInfoContainer() {
  return (
    <div className="changeInfo_container">
      <BrowserRouter>
        <nav className="container_nav">
          <SmallNavBar />
        </nav>
        <section>
          <Switch>
            <Route exact={true} path="/changeinfo" component={ChangeInfo}></Route>
            <Route exact={true} path="/changeinfo-category" component={ChangeCategory} />
            <Route exact={true} path="/changeinfo-checkPassword" component={PasswordConfirm} />
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default ChangeInfoContainer;
