/**
 * @module newUserHelper
 * @description Helper functions for creating a new user in the NewUserDisplay component
 */
import store from '../../renderer/store';
import * as actions from '../../redux/actions/actions';

export const handleNewUser = (e, roleID) => {
  e.preventDefault();

  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;
  const role_id = roleID;
  const confirmationPassword = document.getElementById(
    'signupPasswordConfirmation'
  ).value;
  const email = document.getElementById('signupEmail').value;
  const phone = document.getElementById('signupPhone').value;

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

  createNewUser(email, username, password, phone, role_id);
};

export const confirmPassword = () => {
  const password = document.getElementById('signupPassword').value;
  const confirmationPassword = document.getElementById(
    'signupPasswordConfirmation'
  ).value;
  const passwordConfirmationAlert = document.getElementById(
    'password-confirmation-alert'
  );

  if (password !== confirmationPassword) {
    passwordConfirmationAlert.innerHTML = 'Warning: Passwords do not match';
  } else {
    passwordConfirmationAlert.innerHTML = '';
  }
  return password === confirmationPassword;
};

export const checkPasswordLength = () => {
  const passwordLengthAlert = document.getElementById('password-length-alert');
  const password = document.getElementById('signupPassword').value;
  const regex = /^(?=[a-z\d]{6,}$)(?=\d*[a-z])[a-z]*\d[a-z\d]*$/;

  if (!regex.test(password)) {
    passwordLengthAlert.innerHTML =
      '\nWarning: Password must be 6 characters or longer \nand must include at least one number and one letter';
  } else {
    passwordLengthAlert.innerHTML = '';
  }
  return password.length >= 6;
};

export const checkPhone = (phone) => {
  const regex = /[+][1][\d]{10}$/;
  const phoneAlert = document.getElementById('phone-alert');
  if (phone.match(regex) === null) {
    phoneAlert.innerHTML =
      'Warning: Please enter valid phone number with country code (+1).\nExample: 12345678900';
  } else {
    phoneAlert.innerHTML = '';
  }
  return phone.match(regex) !== null;
};

export const createNewUser = (email, username, password, phone, role_id) => {
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
      document.getElementById('signupUsername').value = '';
      document.getElementById('signupPassword').value = '';
      document.getElementById('signupPasswordConfirmation').value = '';
      document.getElementById('signupEmail').value = '';
      document.getElementById('signupPhone').value = '';
      document.getElementById('password-length-alert').innerHTML = '';
      document.getElementById('password-confirmation-alert').innerHTML = '';

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

export const updateUserList = (data) => {  
  store.dispatch(actions.updateUserList(data));
};
