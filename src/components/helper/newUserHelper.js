/**
 * ************************************
 *
 * @module newUserHelper
 * @author Alex Smith, Catherine Larcheveque, Charles Ryu, Griffin Silver, Lorenzo Guevara
 * @date 6/10/2021
 * @description Helper functions for creating a new user in the NewUserDisplay component
 *
 * ************************************
 */

// Redux Store Import
import store from '../../renderer/store';

// Dispatch Actions Import
import * as actions from '../../actions/actions';

export const handleNewUser = (e) => {
  e.preventDefault();

  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;
  const confirmationPassword = document.getElementById('signupPasswordConfirmation').value;
  const email = document.getElementById('signupEmail').value;
  const phone = document.getElementById('signupPhone').value;

  console.log(username, password, confirmationPassword, email, phone);

  if (!checkPasswordLength()) {
    window.alert('Warning: Password must be 6 characters or longer');
    return;
  }
  if (!confirmPassword()) {
    window.alert('Warning: Passwords do not match');
    return;
  }
  if (!checkPhone(phone)){
    window.alert('Warning: Please enter a valid phone number with country code (+1) in the following format:\n\n+12345678900');
    return;
  }
  return createNewUser(email, username, password, phone);
};

export const confirmPassword = () => {
  const password = document.getElementById('signupPassword').value;
  const confirmationPassword = document.getElementById('signupPasswordConfirmation').value;
  const passwordConfirmationAlert = document.getElementById('password-confirmation-alert');

  if (password !== confirmationPassword) {
    passwordConfirmationAlert.innerHTML = 'Warning: Passwords do not match';
  }
  else{
    passwordConfirmationAlert.innerHTML = '';
  }

  return password === confirmationPassword;
};

export const checkPasswordLength = () => {
  const passwordLengthAlert = document.getElementById('password-length-alert');
  const password = document.getElementById('signupPassword').value;

  if (password.length <= 6) {
    passwordLengthAlert.innerHTML = 'Warning: Password must be 6 characters or longer';
  }
  else {
    passwordLengthAlert.innerHTML = '';
  }
  return password.length >= 6;
};

export const checkPhone = (phone) => {
  const regex = /[+][1][\d]{10}$/;
  const phoneAlert = document.getElementById('phone-alert');
  if (phone.match(regex) === null) {
    phoneAlert.innerHTML = 'Warning: Please enter valid phone number with country code (+1).\nExample: 12345678900';
  }
  else {
    phoneAlert.innerHTML = '';
  }
  return phone.match(regex) !== null;
};

export const createNewUser = (email, username, password, phone) => {
  
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
      if (Object.prototype.hasOwnProperty.call(data, 'error')) {
        window.alert(data.error);
      }
      else {
        console.log('NEW USER SUCCESSFULLY CREATED');
        console.log(data);
        document.getElementById('signupUsername').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('signupPasswordConfirmation').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPhone').value = '';
        document.getElementById('password-length-alert').innerHTML = '';
        document.getElementById('password-confirmation-alert').innerHTML = '';
        window.alert((`New user has been successfully created. \n\nAn email with the user's credentials and login instructions has been sent to ${email}`));
        getUpdatedUserList();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUpdatedUserList = () => {
  fetch('http://localhost:3000/admin',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      updateUserList(data);
    });
};


export const updateUserList = (data) => {
  store.dispatch(actions.updateUserList(data));
};