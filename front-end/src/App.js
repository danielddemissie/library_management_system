import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Signup from "./components/signUp/signup";
import Login from "./components/Login/login";

import UsersHome from "./components/Home/UsersHome";
import AdminsHome from "./components/Home/AdminsHome";
import LibrarianHome from "./components/Home/LibrarianHome";
import Notification from "./components/Notification/Notification";

import Sendreq from "./components/sendrequest/Sendreq";
import SearchComponent from "./components/search/searchComponent";

import CommentComponent from "./components/comment/CommentComponent";
import Reply from "./components/reply/Reply";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/CommentComponent">
            <CommentComponent />
          </Route>
          <Route exact path="/Reply">
            <Reply />
          </Route>

          <Route exact path="/SearchComponent">
            <SearchComponent />
          </Route>
          <Route exact path="/UsersHome">
            <UsersHome />
          </Route>
          <Route exact path="/AdminsHome">
            <AdminsHome />
          </Route>
          <Route exact path="/LibrarianHome">
            <LibrarianHome />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/Notification">
            <Notification />
          </Route>
          <Route exact path="/Sendreq">
            <Sendreq />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
