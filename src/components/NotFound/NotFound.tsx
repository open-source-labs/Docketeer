import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundProps } from '../../../types';
import questionDocketeer from '../../../assets/404page.png'; 
import style from './NotFound.module.scss';
import globalStyle from '../global.module.scss';

const NotFound = ( session  : NotFoundProps ): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <div className={style.notFoundDiv}>
      <img src={questionDocketeer}></img>
      <h1 className={style.h1}>Oops! You seem to be lost!</h1>
      <Link className={globalStyle.button1} to={session.session ? '/home/' : '/login'}> {session.session ? 'Go back to the Home page!' : 'Go back to the Login page!'} </Link>
    </div>
  );
};

export default NotFound;