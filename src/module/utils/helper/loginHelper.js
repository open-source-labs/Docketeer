// THIS ENTIRE CODE BLOCK DOES NOT SEEM TO DO ANYTHING - COMMENTING IT OUT DOES NOT
// AFFECT THE ABILITY TO LOG IN - TM OCT 202o

// callback function invoked when 'login' button is clicked
// export const handleLogin = (e) => {
//   e.preventDefault(); // prevents form submit from reloading page
//   const usernameInput = document.getElementById('username');
//   const passwordInput = document.getElementById('password');
//   const username = usernameInput.value;
//   const password = passwordInput.value;

//   // clears input fields after login
//   usernameInput.value = '';
//   passwordInput.value = '';

//   // authenticateUser(username, password);
// };

// export const authenticateUser = (username, password) => {
//   console.log('username & password: ', username, password);
//   fetch('http://localhost:3000/login', 
//     { 
//       method: 'POST', 
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password
//       }),
//     })
//     .then((response) => {
//       console.log('in login helper response')
//       return response.json();
//       // response = response.json();
//       // console.log('response from auth: ', response);
//     })
//     .then((data) => {
//       if (typeof data === 'object') {
//         window.alert(data.error);
//       } else {
//         console.log('LOGGED IN');
//         return(data);
//       }
//     })
//     .catch((err) => {
//       console.log('authenticateUser ERR: ', err);
//       return (err);
//     });
// };
