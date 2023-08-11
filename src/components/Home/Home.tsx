import React from 'react';
import styles from './Home.module.scss';
import Docketeer from '../../../assets/dlogo-no-bg.png';

/**
 * @module | Home.tsx
 * @description | Handles client-side routing, pre-rendering of data, refreshing of data, etc...
 **/

const Home = (): JSX.Element => {
  return (
    <>
      <div className={styles.wrapper}>
        <h2>Welcome to Docketeer!</h2>
        <a href="https://docketeer.io" >
          <img
            className={styles.logo}
            src={Docketeer}
            alt="footer-product-logo"
          />
        </a>
        <div className={styles.section}>
          <h2>DOCKETEER</h2>
          <p>
            Greetings, fellow space traveler! We&apos;re thrilled that
            you&apos;ve chosen our application to help you navigate and explore
            the vast universe of Docker infrastructure. As a Docketeer, you know
            that real-time tracking of metrics and logs is essential for staying
            ahead of potential issues and optimizing your workflows.<p></p>
            Our application provides you with the tools you need to take control
            of your Docker images, containers, volumes, and logs, along with the
            tools to view your Kubernetes cluster metrics. With an intuitive
            interface, you can easily make the necessary adjustments to ensure a
            smooth journey through the cosmos of your Docker environment.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
