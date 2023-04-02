/**
 * @module | settingsHelper.tsx
 * @description | Contains helper functions facilitating updates to account information (AccountDisplay, Settings, etc.)
 **/
// import useSurvey from '../helpers/dispatch';
import store from '../store';
// const { updateUser } = useSurvey();

export const handlePasswordChange = () => {
  const currentPasswordHolder = document.getElementById(
    'current-password-input'
  ) as HTMLInputElement;
  const currentPassword = currentPasswordHolder.value;
  const newPasswordHolder = document.getElementById(
    'new-password-input'
  ) as HTMLInputElement;
  const newPassword = newPasswordHolder.value;

  updatePassword(currentPassword, newPassword);
};

export const updatePassword: (password: string, newPassword: string) => void = (
  password,
  newPassword
) => {
  const state = store.getState();
  const username = state.sessions.username;
  fetch('/api/account/password', {
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

export const checkCurrentPassword: () => boolean = () => {
  const passwordInput = document.getElementById(
    'current-password-input'
  ) as HTMLInputElement;
  const password = passwordInput.value;
  const passwordAlert = document.getElementById('current-password-alert');
  if (password === '') {
    passwordAlert.innerHTML = 'Warning: Please enter your current password';
  } else {
    passwordAlert.innerHTML = '';
  }
  return password !== '';
};

export const confirmPassword: () => void = () => {
  const newPasswordInput = document.getElementById(
    'new-password-input'
  ) as HTMLInputElement;
  const newPassword = newPasswordInput.value;

  const newPasswordConfirmationInput = document.getElementById(
    'new-password-confirmation-input'
  ) as HTMLInputElement;
  const newPasswordConfirmation = newPasswordConfirmationInput.value;
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

export const handleEmailUpdate = () => {
  const emailInput = document.getElementById(
    'update-email-input'
  ) as HTMLInputElement;
  const email = emailInput.value;

  const state = store.getState();
  const username = state.sessions.username;

  if (email === '') {
    window.alert('Please input a valid email');
    return;
  }

  updateEmail(username, email);
};

export const updateEmail = (username, email) => {
  fetch('/api/account/email', {
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
    // .then((data) => {
    //   updateUser(data);
    // })
    .catch((err) => {
      console.log(err);
    });
};

export const handlePhoneUpdate = () => {
  const newPhoneNumberInput = document.getElementById(
    'update-phone-input'
  ) as HTMLInputElement;
  const newPhoneNumber = newPhoneNumberInput.value;
  if (!checkPhone(newPhoneNumber)) {
    window.alert(
      'Warning: Please enter valid phone number with country code (+1).\nExample: +12345678900'
    );
    return;
  }
  const state = store.getState();
  const username = state.sessions.username;
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

export const updatePhone = (username: string, phone: string) => {
  fetch('/api/account/phone', {
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
    // .then((data) => {
    //   const phoneInput = document.getElementById(
    //     'update-phone-input'
    //   ) as HTMLInputElement;
    //   phoneInput.value = '';
    //   updateUser(data);
    // })
    .catch((err) => {
      console.log(err);
    });
};
