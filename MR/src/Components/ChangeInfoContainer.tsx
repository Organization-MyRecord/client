import { Switch, Route } from "react-router-dom";
import SmallNavBar from "../options/SmallNavBar";
import ChangeInfo from "./ChangeInfo";
import ChangeCategory from "./ChangeCategory";
import "../styles/small-navbar.scss";
import PasswordConfirm from "./PasswordConfirm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SideBarNoneHandler, SideBarOpenHandler } from "../modules/action-creator";

function ChangeInfoContainer({ match }) {
  console.log(match);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SideBarNoneHandler());

    return () => {
      dispatch(SideBarOpenHandler());
    };
  }, [dispatch]);

  return (
    <div className="changeInfo_container">
      <>
        <nav className="container_nav">
          <SmallNavBar path={match.path} />
        </nav>
        <section>
          <Switch>
            <Route exact={true} path={`${match.path}`} component={ChangeInfo}></Route>
            <Route path={`${match.path}/category`} component={ChangeCategory} />
            <Route path={`${match.path}/checkPassword`} component={PasswordConfirm} />
          </Switch>
        </section>
      </>
    </div>
  );
}

export default ChangeInfoContainer;
