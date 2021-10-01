/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

/**
 *
 * @param {*} props
 * Render Volume History
 */
const volumeHistory = (props) => {
  // set state for volume history cards
  const [volumeName, setVolumeName] = useState('');
  const [volumeList, setVolumeList] = useState(props.arrayOfVolumeNames);

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

  // Initializes the volume history tab to be the list of volumes
  let renderList = renderVolumeHistory(volumeList);

  // Search bar: Finds volume name and renders an individual card
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
