/* eslint-disable react/prop-types */
import React, { useState } from 'react';

/**
 * Render Volume History
 * 
 * @param {*} props
 */

const volumeHistory = (props) => {
  const [volumeName, setVolumeName] = useState('');
  const [volumeList, setVolumeList] = useState('');
  // Container details
  const containerDetails = (container, i) => {
    return (
      <div
        className="volume-container-details"
        key={`vol-${i}`}
      >
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

  // Creates the card components of Name and container details
  const renderVolumeHistory = (volumeProps) => volumeProps.map((ele, i) => {
    const details = [];

    ele.containers.length
      ? ele.containers.forEach(el => details.push(containerDetails(el, i)))
      : details.push(
        <div className='volume-container-details' key={`index-${i}`}>
          No container found in this volume
        </div>
      );

    return (
      <div className="box" key={`vol_${i}`}>
        <div className="volume-box-label">
          <h3>{ele.vol_name}</h3>
        </div>
        {details}
      </div>
    );
  });

  // Initializes the volume history tab to be the list of volumes
  let renderList = renderVolumeHistory(props.volumeContainersList);

  // Search bar: Finds volume name and renders an individual card
  const handleClick = (e) => {
    e.preventDefault();
    const result = volumeList.filter(vol => vol.Name.includes(volumeName));

    setVolumeList(result);
    renderList = renderVolumeHistory(volumeList);
  };

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Volume History</h1>
      </div>
      <div className="settings-container">
        <label>Search Volume</label>
        <span>
          <input className="input-box"
            type="text"
            value={volumeName}
            onChange={(e) => {
              setVolumeName(e.target.value);
            }}
          />
          <button className="etc-btn" onClick={(e) => handleClick(e)}>
            FIND
          </button>
        </span>
      </div>
      <div className="containers">{renderList}</div>
    </div>
  );
};

export default volumeHistory;