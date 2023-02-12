import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../types";

import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Home from "../components/Home";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Lexend", "sans-serif"',
    },
  },
});

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useSelector(
    (state: RootState) => state.session.isLoggedIn
  );

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={session ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/userSignup" element={<SignUp />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
