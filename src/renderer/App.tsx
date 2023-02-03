import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Components
import Login from '../components/Login';
import Authentication from '../components/Authentication';
import SignUp from '../components/SignUp';
import RenderViews from '../components/RenderViews';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `"Lexend", "sans-serif"`
    }
  }
})

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Authentication />} />
        <Route path='/userSignup' element={<SignUp />} />
        <Route path='/app/*' element={<RenderViews />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;