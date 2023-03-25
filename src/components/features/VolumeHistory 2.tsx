/* eslint-disable react/prop-types */
// we import Dispatch and SetStateAction to type declare the result of invoking useState
import React, { useState, Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '../../reducers/hooks';
import { VolumeObj } from '../../../types';

/**
 * @module | VolumeHistory.js
 * @description | Provides information regarding volumes
 **/

const VolumeHistory = (): JSX.Element => {
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

  // TODO container needs a more specific type
  const containerDetails = (container: object, i: number): JSX.Element => {
    // TODO change bracket notation to dot notation ?
    {
      console.log('what is this', container);
    }
    return (
      <div className="volume-container-details" key={`vol-${i}`}>
        <strong>Container: </strong>
        {container['Names']}
        <br />
        <strong>Status: </strong>
        {container['State']}
        <br />
        <strong>Runtime: </strong>
        {container['Status']}
      </div>
    );
  };

  /*
  RVH = Render Volume History
  This function takes in a volumeContainerList from state
  volumeContainerList is an array of VolumeObj
  VolumeObj is an object with a vol_name and containers property
  containers is an array of objects -> NEED TO TYPE THIS
  these objs should have a Names, State, and Status property
  */

  const renderVolumeHistory = (volumeProps: VolumeObj[]): JSX.Element[] =>
    volumeProps.map((volume: VolumeObj, i: number) => {
      const details = [];

      volume.containers.length
        ? volume.containers.forEach((el) =>
            details.push(containerDetails(el, i))
          )
        : details.push(
            <div className="volume-container-details" key={`index-${i}`}>
              No container found in this volume
            </div>
          );

      return (
        <div className="card w-96 glass" key={i}>
          <div className="card-body">
            <h2 className="card-title">{`${volume.vol_name.substring(
              0,
              20
            )}...`}</h2>
            <div className="divider py-1"></div>
            <div className="flex flex-col space-y-1">{details}</div>
          </div>
        </div>
      );
    });

  // Initializes the volume history tab to be the list of volumes
  let renderList = renderVolumeHistory(volumeContainersList);

  const handleClick = (e) => {
    e.preventDefault();
    const result = volumeList.filter((vol) =>
      vol['Names'].includes(volumeName)
    );

    setVolumeList(result);
    renderList = renderVolumeHistory(volumeList);
  };

  return (
    <>
      <div className="h-3"></div>
      <div className="usersFlex flex flex-col gap-3">
        <div className="card bg-neutral text-neutral-content rounded-lg flex-1">
          <div className="card-body space-y-2">
            <div className="flex flex-col justify-between items-left">
              <h2 className="card-title text-sm">SEARCH VOLUME HISTORY</h2>
              <div className="divider py-8"></div>
              <div className="form-control">
                <div className="flex items-left input-group">
                  <input
                    type="text"
                    value={volumeName}
                    placeholder="Search…"
                    className="w-96 input input-bordered"
                    onChange={(e) => {
                      setVolumeName(e.target.value);
                    }}
                  />
                  <button
                    className="btn-primary w-20 btn-square font-bold text-primary-content text-xs"
                    onClick={(e) => handleClick(e)}
                  >
                    FIND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content rounded-lg flex-1">
          <div className="card-body space-y-2">
            <h2 className="card-title text-sm">VOLUMES</h2>
            <div className="divider py-8"></div>
            <div className="containerFlex flex flex-wrap gap-3">
              {renderList}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolumeHistory;
