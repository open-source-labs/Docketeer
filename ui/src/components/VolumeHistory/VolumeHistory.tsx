/* eslint-disable react/prop-types */
// we import Dispatch and SetStateAction to type declare the result of invoking useState
import React, { useState, Dispatch, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { VolumeObj } from '../../../ui-types';

import globalStyles from '../global.module.scss';
import styles from './VolumeHistory.module.scss';
import { createAlert } from '../../reducers/alertReducer';
import { removeVolume } from '../../reducers/volumeReducer';
import Client from '../../models/Client';
/**
 * @module | VolumeHistory.js
 * @description | Provides information regarding volumes
 **/

const VolumeHistory = (): JSX.Element => {
  const [volumeName, setVolumeName]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState('');
  const [filterVolumeList, setFilterVolumeList]: [
    VolumeObj[],
    Dispatch<SetStateAction<VolumeObj[]>>
  ] = useState<VolumeObj[]>([]);

  const volumeContainersList = useAppSelector(
    (state) => state.volumes.volumeContainersList
  );

  const [disableShowAll, setDisableShowAll] = useState(false);

  const dispatch = useAppDispatch();

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
    if (volumeName === '') return;
    e.preventDefault();

    console.log(volumeContainersList);

    const result = volumeContainersList.filter((volObj) => {
      return volObj['vol_name'].includes(volumeName);
    });
  
    if (result.length > 0) {
      setFilterVolumeList(result);
      setVolumeName('');
      setDisableShowAll(true);
    } else {
      setVolumeName('');
    }
  };

  const handleClickRemoveVolume = async (volumeName: string): Promise<void> => {
    const volObject = { volumeName: volumeName }
    try {
      const isSuccess = await Client.VolumeService.removeVolume(volumeName);

        // const dataFromBackend: DataFromBackend = response;
      
      if (isSuccess) {
        dispatch(removeVolume(volumeName))
      } else {
        dispatch(
          createAlert(
            `Error from docker Volumes: ${volumeName} Could not be removed`,
            4,
            'warning'
          )
        );
        return;
      }
    } catch (err) {
      dispatch(
        createAlert(
          'An error occurred while removing a volume: ' + err,
          4,
          'error'
        )
      );
    }
  };

  const handleShowAllClick = () => {
    setFilterVolumeList([]);
    setDisableShowAll(false);
    setVolumeName('');
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
        <div className={styles.buttonHolder}>
          <button
            className={globalStyles.button1}
            onClick={(e) => handleClick(e)}
          >
            FIND
          </button>
          <button
            className={`${globalStyles.button2} ${disableShowAll ? '' : globalStyles.disabledButton}`}
            disabled={!disableShowAll}
            onClick={handleShowAllClick}
          >
          SHOW ALL
          </button>
        </div>
      </div>
      <div className={styles.volumesHolder}>
        <h2>VOLUMES</h2>
        <div className={styles.volumesDisplay}>
          {(filterVolumeList.length > 0 ? filterVolumeList : volumeContainersList).map((volume: VolumeObj, i: number) => {
            return (
              <div className={`${styles.volumesCard} ${styles.card}`} key={i}>
                <h3>{`${volume.vol_name.substring(0, 20)}...`}</h3>
                <div>
                  {volume.containers.length ? (
                    volume.containers.map((container, j) => (
                      <div key={`vol-${j}`}>
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