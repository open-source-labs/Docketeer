import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import App from '../App';
import SignupModal from './signupModal';
// import fetch from 'electron-fetch';

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
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  // example fetch request to localhost:3000/
  fetch('http://localhost:3000/', 
    { 
      method: 'POST', 
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'hello',
      })
    })
    .then((response) => {
      console.log('RESPONSE: ', response);
      return response.json();
    })
    .then((data) => {
      console.log('DATA: ', data);
    })
    .catch((err) => {
      console.log(err);
    })

  // change what you need
  console.log(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
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
      <Router>
        <Redirect to="/app"/>
        <Switch>
          <Route component={App} exact path="/app" />
        </Switch>
      </Router>
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
