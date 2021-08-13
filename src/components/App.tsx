import React from "react";
import Home from "./Home/Home";
import Direct from "./Direct/Direct";
import NavbarTop from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App: React.FC = () => {
  const HomeComponent = () => {
    return (
      <>
        <Home />
        <Footer />
      </>
    );
  };

  return (
    <div className="App">
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
