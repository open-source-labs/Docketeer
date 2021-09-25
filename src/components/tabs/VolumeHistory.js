/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as helper from '../helper/commands';

/**
 *
 * @param {*} props
 * Render Volume History
 */
const volumeHistory = (props) => {
  // set state for volume history cards
  const [volumeName, setVolumeName] = useState('');
  const [volumeList, setVolumeList] = useState(props.arrayOfVolumeNames);

  let renderList = renderVolumeHistory(volumeList);

  // Creates the card components of Name and container details
  const renderVolumeHistory = (volumeProps) => volumeProps.map((ele, i) => {
    return (
      <div className="box" key={`volume${i}`}>
        <div className="box-label">
          <h3>{ele.Name}</h3>
        </div>
        <div className="volume-details">
          <li>
            <strong>Container Names: </strong>
            {props.volumeContainers[i]['Names']}
          </li>
          <li>
            <strong>Status: </strong>
            {props.volumeContainers[i]['Status']}
          </li>
          <li>
            <strong>Running For: </strong>
            {props.volumeContainers[i]['RunningFor']}
          </li>
        </div>
      </div>
    );
  });

  /** FUNCTIONALITY FOR SEARCH BAR
   * 
   * this function takes the value of the searched name and renders an individual card with the stats that we are looking for (container names, status, running for)
   * 
   */
  const handleClick = (e) => {
    e.preventDefault();
    const result = props.arrayOfVolumeNames.filter(vol => vol.Name.includes(volumeName));
    
    setVolumeList(result);
    renderList = renderVolumeHistory(volumeList);
  };

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Volume History</h1>
        <div className="runByButton">
          <label>Search Volume</label>
          <span>
            <input
              type="text"
              value={volumeName}
              onChange={(e) => {
                setVolumeName(e.target.value);
              }}
            />
          </span>
          <button className="run-btn" onClick={(e) => handleClick(e)}>
            Find
          </button>
        </div>
      </div>
      <div className="containers">{renderList}</div> 
    </div>
  );
};

export default volumeHistory;

