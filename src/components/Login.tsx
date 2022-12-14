/**
 * @module Login
 * @description Login component which renders a login page, and sign-up modal. This is the first component that is appended to the dist/.renderer-index-template.html via renderer/index.js
 */
 import React from 'react';
 import { useNavigate } from 'react-router-dom';
 
 import { useDispatch } from 'react-redux';
 import * as actions from '../redux/actions/actions';
 
 //MUI Elements
 import TextField from '@mui/material/TextField';
 import Button from '@mui/material/Button';
 import { grey } from '@mui/material/colors';

 
 // @ts-ignore
 import Docketeer from '../../assets/docketeer-title.png';

 // import interface
 import { UserInfo } from '../../types';
 
 
 const Login = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const updateSession = () => dispatch(actions.updateSession());
   const updateUser = (userInfo: UserInfo) => dispatch(actions.updateUser(userInfo));
 
   // callback function invoked when 'login' button is clicked
   const handleLogin = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLFormElement>) => {
     e.preventDefault(); 
     //check that username and password are inputted
     const usernameInput = document.getElementById("username");
     const passwordInput = document.getElementById("password");
    
       const username: string = (usernameInput as HTMLInputElement).value;
       const password: string = (passwordInput as HTMLInputElement).value;
       // clears input fields after login
       (usernameInput as HTMLInputElement).value = "";
       (passwordInput as HTMLInputElement).value = "";
 
       authenticateUser(username, password);
   };
 
   // callback function which will send request to endpoint http://localhost:3000/login and expect
   const authenticateUser = (username: string, password: string) => {
     fetch("http://localhost:3000/login", {
       method: "POST",
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         username: username,
         password: password
       })
     })
       .then((response) => response.json())
       .then((data) => {
         if (Object.prototype.hasOwnProperty.call(data, 'error')) {
           window.alert(data.error);
         } else {
           // are the two below functions necessary?
           updateSession(); // loggedIn = true
           updateUser(data); // update user info in sessions reducer
           navigate('/');
         }
       })
       .catch((err) => {
         console.log('Fetch: POST error to /login', err);
         // created a pop window for wrong username/password
         window.alert('Wrong Password or Username. Please try Again!');
       });
   };
 
   return (
     <div>
       <header>
         <img src={Docketeer} width={160} />
       </header>
       <br />
       <br />
       <br />
       <div className='renderContainers'>
         <div className='header'>
           <h1 className='tabTitle'>Login</h1>
         </div>
         <div className='settings-container'>
           <form className='loginForm' onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleLogin(e)}>
             <TextField 
               id='username' 
               label='Username' 
               variant='outlined'
             />
             <br />
             <br />
             <TextField
               id='password'
               label='Password'
               type='password'
               variant='outlined'
             />
             <br />
             {/* * Login Button * */}
             <Button
               variant='contained'
               color='primary'
               type='submit'
               size='medium'
               onClick={() => handleLogin}
               sx={{
                 marginTop: 1,
                 marginBottom:1
               }}
             >
               Login
             </Button>
             <br/>
             <Button
             variant= 'contained'
             size='small'
             onClick={()=> navigate('/userSignup')}
             sx={{
              color:'#1976d2',
              background:'white',
              marginTop:1
             }}
             >
              Register New Sysadmin
             </Button>
             <br/>
           </form>
         </div> 
       </div>
     </div>
   );
 };
 
 export default Login;