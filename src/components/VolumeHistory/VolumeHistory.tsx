/* eslint-disable react/prop-types */
// we import Dispatch and SetStateAction to type declare the result of invoking useState
import React, { useState, Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '../../reducers/hooks';
import { VolumeObj } from '../../../types';

import globalStyles from '../global.module.scss';
import styles from './VolumeHistory.module.scss';
import useHelper from '../../helpers/commands'; // added
/**
 * @module | VolumeHistory.js
 * @description | Provides information regarding volumes
 **/

const VolumeHistory = (): JSX.Element => {

  const { removeVolume } = useHelper(); // added

  const [volumeName, setVolumeName]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState('');
  const [volumeList, setVolumeList]: [
    VolumeObj[],
    Dispatch<SetStateAction<VolumeObj[]>>
  ] = useState([]);

  const volumeContainersList = useAppSelector(
    (state) => state.volumes.volumeContainersList
  );

  /*
  RVH = Render Volume History
  This function takes in a volumeContainerList from state
  volumeContainerList is an array of VolumeObj
  VolumeObj is an object with a vol_name and containers property
  containers is an array of objects -> NEED TO TYPE THIS
  these objs should have a Names, State, and Status property
  */

  // Initializes the volume history tab to be the list of volumes
  // let renderList = renderVolumeHistory(volumeContainersList);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const result = volumeList.filter((vol) =>
      vol['Names'].includes(volumeName)
    );

    setVolumeList(result);
  };

  const handleClickRemoveVolume = (
    volumeName: string
  ) => {
    removeVolume(volumeName);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchHolder}>
        <h2>SEARCH VOLUME HISTORY</h2>
        <input
          className={globalStyles.input}
          type="text"
          value={volumeName}
          placeholder="Search…"
          onChange={(e) => {
            setVolumeName(e.target.value);
          }}
        />
        <button
          className={globalStyles.button1}
          onClick={(e) => handleClick(e)}
        >
          FIND
        </button>
      </div>
      <div className={styles.volumesHolder}>
        <h2>VOLUMES</h2>
        <div className={styles.volumesDisplay}>
          {volumeContainersList.map((volume: VolumeObj, i: number) => {
            return (
              <div className={`${styles.volumesCard} ${styles.card}`} key={i}>
                <h3>{`${volume.vol_name.substring(0, 20)}...`}</h3>
                <div>
                  {volume.containers.length ? (
                    volume.containers.map((container) => (
                      <div key={`vol-${i}`}>
                        <strong>Container: </strong>
                        {container.Names}
                        <br />
                        <strong>Status: </strong>
                        {container.State}
                        <br />
                        <strong>Runtime: </strong>
                        {container.Status}
                      </div>
                    ))
                  ) : (
                    <div key={`index-${i}`}>
                      No container found in this volume
                    </div>
                  )}
                </div>
                <button
                  className={globalStyles.button1}
                  onClick={() => handleClickRemoveVolume(volume.vol_name)}
                >
                  Remove Volume
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VolumeHistory;
