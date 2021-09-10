import React from "react";
import Home from "./Home/Home";
import Direct from "./Direct/Direct";
import NavbarTop from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";
import Profile from "./Profile";
import axios from "axios";
import { useStore } from "../store/UIStore";
import { observer } from "mobx-react-lite";

const App: React.FC = () => {
  const { setCurrentUserData } = useStore();
  const { getCurrentUsername } = useAuth();

  const fetchUserData = async () => {
    let username = getCurrentUsername();
    console.log(username);

    if (!username) return;
    let res = await axios.get(
      process.env.REACT_APP_SERVER + "api/user/get/" + username
    );

    setCurrentUserData(res.data);
  };

  React.useEffect(() => {
    getCurrentUsername();
    fetchUserData();
  }, []);

  window.addEventListener("locationchange", function () {
    console.log(`loca change`);
  });

  const HomeComponent = () => {
    return (
      <>
        <Home />
        <Footer />
      </>
    );
  };

  return (
    <div className="App" id="App">
      <Router>
        <NavbarTop />
        <Switch>
          <Route exact path="/istekram" component={HomeComponent} />
          <Route path="/istekram/direct/inbox" component={Direct} />
          <Route path="/istekram/:username" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
};

export default observer(App);
