/**
 * @module newUserHelper
 * @description Helper functions for creating a new user in the NewUserDisplay component
 */
import store from '../../renderer/store';
import * as actions from '../../redux/actions/actions';
import React from 'react';

export const handleNewUser = (e: React.SyntheticEvent, roleID: string) => {

  e.preventDefault();
  const username = (<HTMLInputElement>document.getElementById('signupUsername')).value;
  const password = (<HTMLInputElement>document.getElementById('signupPassword')).value;
  const confirmationPassword = (<HTMLInputElement>document.getElementById(
    'signupPasswordConfirmation'
  )).value;
  const email = (<HTMLInputElement>document.getElementById('signupEmail')).value;
  const phone = (<HTMLInputElement>document.getElementById('signupPhone')).value;

  if (!checkPasswordLength()) {
    window.alert('Warning: Password must be 6 characters or longer');
    return;
  }
  if (!confirmPassword()) {
    window.alert('Warning: Passwords do not match');
    return;
  }
  if (!checkPhone(phone)) {
    window.alert(
      'Warning: Please enter a valid phone number with country code (+1) in the following format:\n\n+12345678900');
    return;
  }

  createNewUser(email, username, password, phone, roleID);
};

export const confirmPassword = () => {
  const password = (<HTMLInputElement>document.getElementById('signupPassword')).value;
  const confirmationPassword = (<HTMLInputElement>document.getElementById(
    'signupPasswordConfirmation'
  )).value;
  const passwordConfirmationAlert = (<HTMLSpanElement>document.getElementById(
    'password-confirmation-alert'
  ));

  if (password !== confirmationPassword) {
    passwordConfirmationAlert.innerHTML = 'Warning: Passwords do not match';
  } else {
    passwordConfirmationAlert.innerHTML = '';
  }
  return password === confirmationPassword;
};

export const checkPasswordLength = () => {
  const passwordLengthAlert = (<HTMLSpanElement>document.getElementById('password-length-alert'));
  const password = (<HTMLInputElement>document.getElementById('signupPassword')).value;
  const regex = /^(?=[a-z\d]{6,}$)(?=\d*[a-z])[a-z]*\d[a-z\d]*$/;

  if (!regex.test(password) && password) {
    passwordLengthAlert.innerHTML =
      '\nWarning: Password must be 6 characters or longer \nand must include at least one number and one letter';
  } else {
    passwordLengthAlert.innerHTML = '';
  }
  return password.length >= 6;
};

export const checkPhone = (phone: string) => {
  const regex = /[+][1][\d]{10}$/;
  const phoneAlert = document.getElementById('phone-alert') as HTMLInputElement;
  if (phone.match(regex) === null) {
    phoneAlert.innerHTML =
      'Warning: Please enter valid phone number with country code (+1).\nExample: 12345678900';
  } else {
    phoneAlert.innerHTML = '';
  }
  return phone.match(regex) !== null;
};

export const createNewUser = (email: string, username: string, password: string, phone: string, role_id: string) => {
  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      phone: phone,
      role_id: role_id
    })
  })
    .then(() => {
      (<HTMLInputElement>document.getElementById('signupUsername')).value = '';
      (<HTMLInputElement>document.getElementById('signupPassword')).value = '';
      (<HTMLInputElement>document.getElementById('signupPasswordConfirmation')).value = '';
      (<HTMLInputElement>document.getElementById('signupEmail')).value = '';
      (<HTMLInputElement>document.getElementById('signupPhone')).value = '';
      (<HTMLSpanElement>document.getElementById('password-length-alert')).innerHTML = '';
      (<HTMLSpanElement>document.getElementById('password-confirmation-alert')).innerHTML = '';

      window.alert(`New user has been successfully created. \n\n
          An email with the user's credentials and login instructions has been sent to ${email}`);
  
    }). then (() =>{
      getUpdatedUserList();
    })
    .catch((err) => {
      console.log(err);
    });
};


export const getUpdatedUserList = () => {

  fetch('http://localhost:3000/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // username: store.userInfo.username,  //TM: Accessing store.userInfo.username returns undefined - this is original code
      // token: store.userInfo.token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      updateUserList(data);
    })
    .catch((err) => {
      console.log('error in getUpdatedUserList: ', err);
    });
};

export const updateUserList = (data: object[]) => {  
  store.dispatch(actions.updateUserList(data));
};
