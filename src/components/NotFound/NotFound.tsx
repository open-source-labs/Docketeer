import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSurvey from '../../helpers/dispatch';
import useHelper from '../../helpers/commands';

const NotFound = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { updateSession } = useSurvey();
  const { checkCookie } = useHelper();

  const [session, setSession] = useState<boolean | undefined>(undefined);
  const checkLogin = async () => {
    try {
      const data = await checkCookie();
      if (data) {
        updateSession();
        setSession(true);
      } else {
        setSession(false);
      }
    } catch (err) {
      console.log('Cannot get uid key or API key:', err);
      setSession(false);
    }
  };
  useEffect(() => {
    checkLogin();
  }, [checkCookie, updateSession]);

  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <h2>{session ? 'Go back to the homepage!' : 'Go back to the login page!'}</h2>
      <Link to={session ? '/home/' : '/login'}>{session ? 'Home' : 'Login'}</Link>
      <Link to="/blog"></Link>
    </div>
  );
};

export default NotFound;
