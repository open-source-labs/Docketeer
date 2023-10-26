/* eslint-disable react/prop-types */
// we import Dispatch and SetStateAction to type declare the result of invoking useState
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { VolumeObj } from '../../../ui-types';
import globalStyles from '../global.module.scss';
import styles from './VolumeHistory.module.scss';
import { createAlert } from '../../reducers/alertReducer';
import { fetchAllContainersOnVolumes, getAllContainersOnVolumes, removeVolume } from '../../reducers/volumeReducer';
import Client from '../../models/Client'
import SingleVolume from './SingleVolume';
/**
 * @module | VolumeHistory.js
 * @description | Provides information regarding volumes
 **/

const VolumeHistory = (props:any): JSX.Element => {
  const [volumeName, setVolumeName]  = useState('');
  const [filterVolumeList, setFilterVolumeList] = useState<VolumeObj[]>([]);

  const volumeContainersList = useAppSelector(
    (state) => state.volumes.volumeContainersList
  );


  useEffect(() => {
    dispatch(fetchAllContainersOnVolumes());
    // console.log(props.volumeContainersList)
    setFilterVolumeList(volumeContainersList);
  }, []);

  // const [disableShowAll, setDisableShowAll] = useState(false);

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
    
    e.preventDefault();
    if (volumeName === '') {
      // Show all volumes;
      setFilterVolumeList(volumeContainersList);

    }
    const result = volumeContainersList.filter((volObj) => {
      return volObj['volName'].toLowerCase().includes(volumeName.toLowerCase());
    });
    
    setFilterVolumeList(result);

  };

  const handleClickRemoveVolume = async (volumeName: string): Promise<void> => {
    try {
      const isSuccess = await Client.VolumeService.removeVolume(volumeName);
      if (isSuccess) {
        dispatch(removeVolume(volumeName));
        setFilterVolumeList(await getAllContainersOnVolumes());
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
    setFilterVolumeList(volumeContainersList);
    // setDisableShowAll(false);
    setVolumeName('');
  };

  const displayFullName = () => {
    //
  }

  const volumeComponents: React.JSX.Element[] = [];
  filterVolumeList.forEach((element, index) => {
    volumeComponents.push(
      <SingleVolume
        key={`vol_${index}`}
        containers={element.containers}
        volName={element.volName}
        onHover={displayFullName}
        removeClick={handleClickRemoveVolume}
      />
    )
  })


  return (
    <div className={styles.wrapper}>
      <div className={styles.searchHolder}>
        <h2>SEARCH VOLUMES</h2>
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
            className={`${globalStyles.button2}`}
            // disabled={!disableShowAll}
            onClick={handleShowAllClick}
          >
          SHOW ALL
          </button>
        </div>
      </div>
      <div className={styles.volumesHolder}>
        <h2>VOLUMES</h2>
        <div className={styles.volumesDisplay}>
          {
          volumeComponents
          /* {(filterVolumeList.length > 0 ? filterVolumeList : volumeContainersList).map((volume: VolumeObj, i: number) => {
            return (
              <div className={`${styles.volumesCard} ${styles.card}`} key={i}>
                <div onMouseOver={displayFullName}>
                  <h3>{`${volume.vol_name.substring(0, 20)}...`}</h3>
                </div>
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
          })} */}
        </div>
      </div>
    </div>
  );
};

export default VolumeHistory;