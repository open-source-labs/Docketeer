import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert, createPrompt } from '../../reducers/alertReducer';
import styles from './Home.module.scss';
// import globalStyles from '../global.module.scss';



// Importing helpers
import useSurvey from '../helpers/dispatch';
import useHelper from '../helpers/commands';
import * as history from '../helpers/volumeHistoryHelper';


/**
 * @module | Home.tsx
 * @description | Handles client-side routing, pre-rendering of data, refreshing of data, etc...
 **/

const Home = (): JSX.Element => {



  return (
    <>
      <div className={styles.wrapper}>

      </div>

    </>
  );
};

export default Home;
