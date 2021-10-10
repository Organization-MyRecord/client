import { BrowserRouter, Switch, Route } from "react-router-dom";
import SmallNavBar from "../options/SmallNavBar";
import ChangeInfo from "./ChangeInfo";
import ChangeCategory from "./ChangeCategory";
import "../styles/small-navbar.scss";
import PasswordConfirm from "./PasswordConfirm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SideBarNoneHandler, SideBarOpenHandler } from "../modules/action-creator";

function ChangeInfoContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SideBarNoneHandler());

    return () => {
      dispatch(SideBarOpenHandler());
    };
  }, [dispatch]);

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
