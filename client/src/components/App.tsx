import React from "react";
import Home from "./Home/Home";
import Direct from "./Direct/Direct";
import NavbarTop from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";

const App: React.FC = () => {
  const { getCurrentUsername } = useAuth();
  React.useEffect(() => {
    getCurrentUsername();
  }, []);

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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
