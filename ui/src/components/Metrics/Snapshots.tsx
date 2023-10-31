import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Snapshots = (): JSX.Element => {
 
  const dropDown = [];
  const getDates = () : void => {
    fetch('http://localhost:3000/api/saveMetricsEntry/date')
      .then((data) => data.json())
      .then((data) => {
        populateDropdown(data)
      })
      .catch((err) => console.log(err));
  }
  const populateDropdown = (dates: []): void => {
  }

  getDates();

  return (
    <div>
    </div>
  );
};

export default Snapshots;
