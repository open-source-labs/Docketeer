export const handlePasswordChange = () => {
  console.log('handle password click');
  const currentPassword = document.getElementById('current-password-input').value;
  const newPassword = document.getElementById('new-password-input').value;
  const newPasswordConfirmation = document.getElementById('new-password-confirmation-input').value;

  console.log(currentPassword, newPassword, newPasswordConfirmation);
  if (!checkCurrentPassword()) {
    window.alert('Warning: Please enter your current password');
    return;
  }
  if (!checkPasswordLength()){
    window.alert('Warning: Password must be 6 characters or longer');
    return;
  } 

  if (!confirmPassword()){
    window.alert('Warning: Passwords do not match');
    return;
  }

  updatePassword(newPassword);
};

export const updatePassword = () => {
  console.log('New password sent to server!');
};
export const checkCurrentPassword = () => {
  const password = document.getElementById('current-password-input').value;
  const passwordAlert = document.getElementById('current-password-alert');
  if (password === ''){
    passwordAlert.innerHTML = 'Warning: Please enter your current password';
  }
  return (password !== '');
};

export const confirmPassword = () => {
  const newPassword = document.getElementById('new-password-input').value;
  const newPasswordConfirmation = document.getElementById('new-password-confirmation-input').value;
  const passwordConfirmationAlert = document.getElementById('confirm-new-password-alert');

  if (newPassword !== newPasswordConfirmation) {
    passwordConfirmationAlert.innerHTML = 'Warning: Passwords do not match';
  }
  else{
    passwordConfirmationAlert.innerHTML = '';
  }
  return newPassword === newPasswordConfirmation;
};

export const checkPasswordLength = () => {
  const newPassword = document.getElementById('new-password-input').value;
  const newPasswordAlert = document.getElementById('new-password-alert');

  if (newPassword.length <= 6) {
    newPasswordAlert.innerHTML = 'Warning: Password must be 6 characters or longer';
  }
  else {
    newPasswordAlert.innerHTML = '';
  }
  return newPassword.length >= 6;
};