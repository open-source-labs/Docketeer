/**
 * ************************************
 *
 * @module Login
 * @author Alex Smith, Catherine Larcheveque, Charles Ryu, Biggie Smalls, Griffin Silver, Lorenzo Guevara
 * @date 6/10/2021
 * @description Login component which renders a login page, and sign-up modal. This is the first component that is appended to the dist/.renderer-index-template.html via renderer/index.js
 *
 * ************************************
 */

// NPM Module Imports
import React, { useEffect, useState, Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, BrowserHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
// import React, { Component } from 'react'; 

import { startFirebaseUI } from '../../renderer/firebase.js';
// Redux Imports (actions)
import * as actions from '../../actions/actions';

// React Component Imports
import App from '../App';
import SignupModal from './signupModal';
import DebugRouter from '../debug/debugRouter';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// Helper Functions Import
// import { handleLogin, authenticateUser } from '../helper/loginHelper';
import firebase from 'firebase';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

const Login = () => {
  
  // React-Redux: Map dispatch to props
  const dispatch = useDispatch();
  const updateSession = () => dispatch(actions.updateSession());
  const updateUser = (userInfo) => dispatch(actions.updateUser(userInfo));

  // React-Redux: Map state to props
  const session = useSelector((state) => state.session.isLoggedIn);

  // React Hooks: Local state variables 
  const [ modalIsOpen, setIsOpen ] = useState(false);

  // Modal functions
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  // Need to set the app element to body for screen-readers (disability), otherwise modal will throw an error
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);
  
  // callback function invoked when 'login' button is clicked
  const handleLogin = (e) => {
    e.preventDefault(); // prevents form submit from reloading page
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value;
    const password = passwordInput.value;

    // clears input fields after login
    usernameInput.value = '';
    passwordInput.value = '';

    console.log('clicked');
    authenticateUser(username, password);
  };
  
  // callback function which will send request to endpoint http://localhost:3000/login and expect either SSID in cookie.
  const authenticateUser = (username, password) => {

    fetch('http://localhost:3000/login', 
      { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          window.alert(data.error);
        }
        else {
          console.log(data);
          updateSession(); // loggedIn = true 
          updateUser(data); // update user info in sessions reducer
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // class fireBase extends Component {
  //  useEffect(()=>{
  //     startFirebaseUI ('#firebaseui');
  //   }, []);
      // return (
      //   <div id="firebaseui"></div> 
      // );
    
  // }
  
  // export default App;
  
  // Firebaseui will create users for you, you don't need to do that manually. It will also throw a nasty error if it can't find the element so make sure you don't ever call it without the element on the page!
  
  
  // Upon successful login, redirect to /app location and render the App component

  // Note: this could be re-worked, just thinking about it this looks like poor security design since loggedIn is a local state variable on client end which can be hardcoded to true. Rather, the server should verify credentials and then send client either SSID to access next endpoint or another means.
  if (session){
    console.log('LOGGED IN');
    return (
      <Router
        history={BrowserHistory}
      >
        <Redirect to="/app"/>
        <Switch>
          {/* <Route component={App} exact path="/app" /> */}
          <Route path="/app">
            <App />
          </Route>
        </Switch> 
      </Router>
    );
  }
  
  // Else render the login page
  return (
    <Router 
      history={BrowserHistory}
    >
      <Route id="route" path="/"> 
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input id="username" type="text" placeholder="username"></input>
            <br></br>
            <input id="password" type="password" placeholder="password"></input>
            <br></br>
            <input type="submit"></input>
          </form>
          <button id="signup" onClick={openModal}>Sign Up</button>
          <div id="firebaseui"></div> 
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel='Modal to make user account'
          >
            <SignupModal closeModal={closeModal}/>
          </Modal>
        </div>
      </Route>
    </Router>
  );
};

export default Login;
