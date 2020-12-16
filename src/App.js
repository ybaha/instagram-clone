import Home from './Home/Home';
import Direct from './Direct/Direct'
import NavbarTop from './Navbar/Navbar';
import Footer from './Footer/Footer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const HomeComponent = () => {
    return <> <Home /> <Footer /> </>
  }

  return (
    <div className="App">
      <Router>
        <NavbarTop />
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/direct/inbox" component={Direct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
