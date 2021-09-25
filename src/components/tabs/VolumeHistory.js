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

  let renderList = renderVolumeHistory(volumeList);

 // Searches state for specific volume
    const handleClick = (e) => {
      console.log('volume name: ', volumeName);
      e.preventDefault();
      const result = props.arrayOfVolumeNames.filter(vol => vol.Name.includes(volumeName));
      console.log('result :', result);
      
      // need to match the container details with the volume result
      setVolumeList(result);
      renderList = renderVolumeHistory(volumeList);
    };
    // renderVolumeHistory must be initialized first, and then once we find a volume, we reassign the value of renderVolumeHistory
    // when a user wants the whole list back, the whole list has to render back again 
    // populate based on what's typed in the search bar WHILE it's being typed, so if the search bar is empty the page will be "reset", having the whole list back
  
    // Whatever contains that substring, needs to be in the new array that we render

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

