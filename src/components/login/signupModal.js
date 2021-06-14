/**
 * ************************************
 *
 * @module Signup Modal
 * @author Alex Smith, Catherine Larcheveque, Charles Ryu, Griffin Silver, Lorenzo Guevara
 * @date 6/10/2021
 * @description Signup modal that will be displayed when a user clicks the sign-up button on the login page
 *
 * ************************************
 */

import React, { useEffect, useState } from "react";

const SignupModal = () => {

  const handleClick = (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirmationPassword = document.getElementById('signupPasswordConfirmation').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    
    if(!confirmPassword(password, confirmationPassword)) {
      document.getElementById('password-alert').innerHTML = 'Warning: Passwords do not match';
    }

    // if(!checkEmail(email)) {
    //   document.getElementById('email-alert').innerHTML = 'Warning: Email is invalid'
    // }
    console.log('password: ', confirmPassword(password, confirmationPassword));
    console.log(username, password, confirmationPassword, email, phone);

    signupUser(email, username, password, phone);
  };

  const confirmPassword = (password, confirmation) => {
    return password === confirmation;
  }

  const checkEmail = (email) => {
    // const address = new MailAddress(email);
    // return address.Address === email;
  }

  const checkNumber = (phone) => {

  }

  const signupUser = (email, username, password, phone) => {
    console.log('SIGN UP USER');
    fetch('http://localhost:3000/signup', 
    { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        phone: phone
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data === true) {
        setLoggedIn(true);
      }
      else {
        window.alert('incorrect password');
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleClick}>
          <input id="signupEmail" type="text" placeholder="email"></input><br></br>
          <input id="signupUsername" type="text" placeholder="username"></input><br></br>
          <input id="signupPassword" type="password" placeholder="password"></input><br></br>
          <input id="signupPasswordConfirmation" type="password" placeholder="confirm"></input>
          <span id="password-alert"></span> 
          <br></br>
          <input id="signupPhone" type="text" placeholder="phone number"></input><br></br>

          <input type="submit"></input>
        </form>
      </div>
  )
};

export default SignupModal;