
//Routing 관련 처리
//React에서는 React Router DOM 을 사용

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'

// import logo from './logo.svg';
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
// import './App.css';

import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage,null)}/>
          <Route exact path="/login" component={Auth(LoginPage,false)}/>
          <Route exact path="/register" component={Auth(RegisterPage,false)}/>
        </Switch>
      </div>
    </Router>
  );
}
// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }
export default App;
