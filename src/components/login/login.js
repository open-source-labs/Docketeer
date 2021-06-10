import React, { useEffect, useState } from "react";
import Modal from "react-modal";
<<<<<<< HEAD
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
=======
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
>>>>>>> f50561d650654f4c07a41668d45cfd2823b321d9
import App from '../App';
import SignupModal from './signupModal';

class DebugRouter extends Router {
  constructor(props){
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null,2))
    this.history.listen((location, action)=>{
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });
  }
}
const Login = () => {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ modalIsOpen, setIsOpen ] = useState(false);
.
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
    
  const handleClick = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('clicked');
    authenticateUser(username, password);
  }
  
  const authenticateUser = (username, password) => {
    if (username === 'codesmith' && password === 'narwhals'){
      setLoggedIn(true);
    }
    else {
      window.alert('incorrect password');
    }
  }

  if (loggedIn){
    return (
<<<<<<< HEAD
      <div>
        <Router>
          <Redirect to="/app"/>
          <Switch>
            <Route component={App} exact path="/app" />
          </Switch>
        </Router>
      </div>
=======
      <Router>
        <Redirect to="/app"/>
        <Switch>
          <Route component={App} exact path="/app" />
        </Switch>
      </Router>
>>>>>>> f50561d650654f4c07a41668d45cfd2823b321d9
    )
  };
  
  return (
    <Route id="route" path="/"> 
      <div>
        <h1>Login</h1>
        <form onSubmit={handleClick}>
          <input id="username" type="text" placeholder="username"></input>
          <input id="password" type="password" placeholder="password"></input>
          <input type="submit"></input>
        </form>
        <button id="signup" onClick={openModal}>Sign Up</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Modal to make user account'
        >
          <SignupModal />
        </Modal>
      </div>
    </Route>
  );
};

export default Login;
