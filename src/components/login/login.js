import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import App from '../App';
import SignupModal from './signupModal';

const Login = () => {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ modalIsOpen, setIsOpen ] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  const handleClick = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('clicked');
    setSelected('/app');
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
      <div>
        <Redirect to="/app"/>
        <Switch>
          <Route component={App} exact path="/app" />
        </Switch>
      </div>
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
