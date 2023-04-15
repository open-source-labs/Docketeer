import React from 'react';
import styles from './Home.module.scss';
import Setup from '../Setup/Setup';

/**
 * @module | Home.tsx
 * @description | Handles client-side routing, pre-rendering of data, refreshing of data, etc...
 **/

const Home = (): JSX.Element => {
  return (
    <>
      <div className={styles.wrapper}>
        <h2>Welcome to Docketeer!</h2>
      </div>
      <div className={styles.wrapper}>
        <Setup />
      </div>
    </>
  );
};

export default Home;
