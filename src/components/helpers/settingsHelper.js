/**
 * @module | settingsHelper.tsx
 * @description | Contains helper functions facilitating updates to account information (AccountDisplay, Settings, etc.)
 **/

import store from '../../renderer/store';

export const handlePasswordChange = () => {
  const currentPassword = document.getElementById(
    'current-password-input'
  ).value;
  const newPassword = document.getElementById('new-password-input').value;

  if (!checkCurrentPassword()) {
    window.alert('Warning: Please enter your current password');
    return;
  }
  if (!checkPasswordLength()) {
    window.alert('Warning: Password must be 6 characters or longer');
    return;
  }

  if (!confirmPassword()) {
    window.alert('Warning: Passwords do not match');
    return;
  }

  updatePassword(currentPassword, newPassword);
};

export const updatePassword = (password, newPassword) => {
  const state = store.getState();
  const username = state.session.username;
  fetch('http://localhost:3000/account/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password: password,
      newPassword: newPassword,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (Object.prototype.hasOwnProperty.call(data, 'error')) {
        window.alert(data.error);
        return;
      }
      window.alert('Successfully updated your password.');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkCurrentPassword = () => {
  const password = document.getElementById('current-password-input').value;
  const passwordAlert = document.getElementById('current-password-alert');
  if (password === '') {
    passwordAlert.innerHTML = 'Warning: Please enter your current password';
  } else {
    passwordAlert.innerHTML = '';
  }
  return password !== '';
};

export const confirmPassword = () => {
  const newPassword = document.getElementById('new-password-input').value;
  const newPasswordConfirmation = document.getElementById(
    'new-password-confirmation-input'
  ).value;
  const passwordConfirmationAlert = document.getElementById(
    'confirm-new-password-alert'
  );

  if (newPassword !== newPasswordConfirmation) {
    passwordConfirmationAlert.innerHTML = 'Warning: Passwords do not match';
  } else {
    passwordConfirmationAlert.innerHTML = '';
  }
  return newPassword === newPasswordConfirmation;
};

export const checkPasswordLength = () => {
  const newPassword = document.getElementById('new-password-input').value;
  const newPasswordAlert = document.getElementById('new-password-alert');

  if (newPassword.length <= 6) {
    newPasswordAlert.innerHTML =
      'Warning: Password must be 6 characters or longer';
  } else {
    newPasswordAlert.innerHTML = '';
  }
  return newPassword.length >= 6;
};

export const handleEmailUpdate = () => {
  const email = document.getElementById('update-email-input').value;

  const state = store.getState();
  const username = state.session.username;

  if (email === '') {
    window.alert('Please input a valid email');
    return;
  }

  updateEmail(username, email);
};

export const updateEmail = (username, email) => {
  fetch('http://localhost:3000/account/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      updateUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handlePhoneUpdate = () => {
  const newPhoneNumber = document.getElementById('update-phone-input').value;
  if (!checkPhone(newPhoneNumber)) {
    window.alert(
      'Warning: Please enter valid phone number with country code (+1).\nExample: +12345678900'
    );
    return;
  }
  const state = store.getState();
  const username = state.session.username;
  updatePhone(username, newPhoneNumber);
};

export const checkPhone = (phone) => {
  const regex = /[+][1][\d]{10}$/;
  const phoneAlert = document.getElementById('update-phone-alert');
  if (phone.match(regex) === null) {
    phoneAlert.innerHTML =
      'Warning: Please enter valid phone number with country code (+1).\nExample: +12345678900';
  } else {
    phoneAlert.innerHTML = '';
  }
  return phone.match(regex) !== null;
};

export const updatePhone = (username, phone) => {
  fetch('http://localhost:3000/account/phone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      phone,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById('update-phone-input').value = '';
      updateUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUser = (data) => {
  store.dispatch(actions.updateUser(data));
};
