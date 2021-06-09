import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const SignupModal = () => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    // comment
    setUsername(document.getElementById('signupUsername').value);
    setPassword(document.getElementById('signupPassword').value);
    setEmail(document.getElementById('signupEmail').value);
    console.log(username, password, email);

  };

  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleClick}>
          <input id="signupUsername" type="text" placeholder="username"></input>
          <input id="signupEmail" type="text" placeholder="email"></input>
          <input id="signupPassword" type="password" placeholder="password"></input>
          <input type="submit"></input>
        </form>
      </div>
  )
};

export default SignupModal;