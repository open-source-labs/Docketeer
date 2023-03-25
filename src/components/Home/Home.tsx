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

  const { sessions, volumes } = useAppSelector((state) => state);
  const userData = sessions;
  const { arrayOfVolumeNames } = volumes;

  const {
    refreshRunning,
    refreshStopped,
    refreshImages,
    writeToDb,
    networkContainers,
    // below function never called
    // setDbSessionTimeZone,
    getAllDockerVolumes,
    handlePruneClick,
    getVolumeContainers,
  } = useHelper();

  // Deconstructs dispatch functions from custom hook
  const { updateUser, getVolumeContainerList } =
    useSurvey();

  useEffect(() => {
    refreshRunning();
    refreshStopped();
    refreshImages();
    writeToDb();
    networkContainers();
    getAllDockerVolumes();
    setAdminToken();
  }, []);

  // Changes in arrayOfVolumeNames will run history.volumeByName
  useEffect(() => {
    history.volumeByName(
      getVolumeContainers,
      arrayOfVolumeNames,
      getVolumeContainerList
    );
  }, [arrayOfVolumeNames]);

  // Refresh runningList, stoppedList, and imageList every 5-seconds to ensure GUI accurately depicts local Docker environment
  useEffect(() => {
    const interval = setInterval(() => {
      refreshRunning();
      refreshStopped();
      refreshImages();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Pertains to sysAdmin only
  // TODO: double check what this is doing and name appropriately
  const setAdminToken = async (): Promise<void> => {
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: userData.token,
          username: userData.username,
        }),
      });
      const parsedData = await response.json();

      updateUser(parsedData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>

      </div>

    </>
  );
};

export default Home;
