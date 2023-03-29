//TODO what do we do about this file?
/**
 * @module | newUserHelper.tsx
 * @description | Contains helper functions for creating new users
 **/

// import { useSurvey } from '../../reducers/hooks';

// import { useAppDispatch } from '../../reducers/hooks';
// import { updateUsers } from '../../reducers/userReducer';
// import { UserInfo } from '../../../types';

// export const handleNewUser = (
//   userInformation: any,
//   roleID: string,
// ) => {
//   const { username, password } = userInformation;

// if (!checkPasswordLength(password)) {
//   window.alert('Warning: Password must be 6 characters or longer');
//   return;
// }
// if (!confirmPassword(password, userInformation.passwordConfirmation)) {
//   window.alert('Warning: Passwords do not match');
//   return;
// }
// if (!checkPhone(phone)) {
//   window.alert(
//     'Warning: Please enter a valid phone number with country code (+1) in the following format:\n\n+12345678900'
//   );
//   return;
// }

//   createNewUser(username, password, roleID);
// };

// export const confirmPassword = (
//   password: string,
//   passwordConfirmation: string
// ) => {
//   if (password !== passwordConfirmation) {
//     window.alert('Warning: Passwords do not match');
//     return;
//   }
//   return password === passwordConfirmation;
// };

// export const checkPasswordLength = (password: string) => {
//   const regex = /^(?=[a-z\d]{6,}$)(?=\d*[a-z])[a-z]*\d[a-z\d]*$/;
//   if (!regex.test(password) && password) {
//     window.alert(
//       'Warning: Password must be 6 characters or longer \nand must include at least one number and one letter'
//     );
//     return;
//   }
//   return password.length >= 6;
// };

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

// * changed role_id to string, may need to change back if assignment function is changed
// export const createNewUser = (
//   username: string,
//   password: string,
//   role_id: string
// ) => {
//   console.log('ab to fetch -> createNewUser');
//   fetch('/api/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       username: username,
//       password: password,
//       role_id: role_id,
//     }),
//   })
//     .then((res) => {
//       console.log('res in createNewUser: ', res);
//       console.log('ab to invoke getUpdatedUserList');
//       getUpdatedUserList();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const getUpdatedUserList = () => {
//   console.log('ab to fetch -> getUpdatedUserList');
//   fetch('/api/admin', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       // username: store.userInfo.username,  //TM: Accessing store.userInfo.username returns undefined - this is original code
//       // token: store.userInfo.token,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('data from getUpdatedUserList: ', data);
//       // updateUserList(data);
//     })
//     .catch((err) => {
//       console.log('error in getUpdatedUserList: ', err);
//     });
// };

// export const updateUserList = (data: UserInfo[]) => {
//   const dispatch = useAppDispatch();
//   dispatch(updateUsers(data));
// };

export const checkDbInit = () => {
  fetch('/api/db')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
};
