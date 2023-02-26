/**
 * @module | newUserHelper.tsx
 * @description | Contains helper functions for creating new users
 **/

import React from 'react';
import { useAppDispatch } from '../../reducers/hooks';
import { updateUsers } from '../../reducers/userReducer';
import { UserInfo } from '../../../types';

export const handleNewUser = (
  userInformation: any,
  roleID: string,
  setValues: any
) => {
  const { email, username, password, phone } = userInformation;

  if (!checkPasswordLength(password)) {
    window.alert('Warning: Password must be 6 characters or longer');
    return;
  }
  if (!confirmPassword(password, userInformation.passwordConfirmation)) {
    window.alert('Warning: Passwords do not match');
    return;
  }
  if (!checkPhone(phone)) {
    window.alert(
      'Warning: Please enter a valid phone number with country code (+1) in the following format:\n\n+12345678900'
    );
    return;
  }

  createNewUser(email, username, password, phone, roleID, setValues);
};

export const confirmPassword = (
  password: string,
  passwordConfirmation: string
) => {
  if (password !== passwordConfirmation) {
    window.alert('Warning: Passwords do not match');
    return;
  }
  return password === passwordConfirmation;
};

export const checkPasswordLength = (password: string) => {
  const regex = /^(?=[a-z\d]{6,}$)(?=\d*[a-z])[a-z]*\d[a-z\d]*$/;
  if (!regex.test(password) && password) {
    window.alert(
      'Warning: Password must be 6 characters or longer \nand must include at least one number and one letter'
    );
    return;
  }
  return password.length >= 6;
};

export const checkPhone = (phone: string) => {
  const regex = /[+][1][\d]{10}$/;
  if (phone.match(regex) === null) {
    window.alert(
      'Warning: Please enter valid phone number with country code (+1).\nExample: 12345678900'
    );
    return;
  }
  return phone.match(regex) !== null;
};

export const createNewUser = (
  email: string,
  username: string,
  password: string,
  phone: string,
  role_id: string,
  setValues
) => {
  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      phone: phone,
      role_id: role_id,
    }),
  })
    .then(() => {
      setValues({
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        phone: '',
        showPassword: false,
      });
    })
    .then(() => {
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
      'Content-Type': 'application/json',
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

export const updateUserList = (data: UserInfo[]) => {
  const dispatch = useAppDispatch();
  dispatch(updateUsers(data));
};

export const checkDbInit = () => {
  fetch('http://localhost:3000/db')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
};
