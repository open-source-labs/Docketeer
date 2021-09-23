/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as helper from '../helper/commands';


/**
 *
 * @param {*} props
 * Render Volume History
 */

const volumeHistory = props => {
  // set state for volume history cards
  const [volumeName, setVolumeName] = useState('');
  console.log('PROPS VOLUME HIST:', props.arrayOfVolumeNames);

  // redux mapState to props


  // added to grab all of the volume history on load/after DOM finishes rendering
  useEffect(() => {
    helper.dockerVolume(props.arrayOfVolumeNames);       
  });
 
  // Searches state for specific volume
  const handleClick = (e) => {
    e.preventDefault();
    props.arrayOfVolumeNames.find(vol => vol === volumeName);
  };
  
  const renderVolumeHistory = props.arrayOfVolumeNames.map((ele, i) => {
    console.log('renderVolumeHistory console log:', ele);

    return (
      <div className="box" key={`volume${i}`}>
        <div className="box-label">
          <h3>{ele['Name']}</h3>
          {/* <p>{ele['name']}</p> */}
        </div>
        <div className="stopped-info">
          <li>
            <strong>Container Names:</strong>
            {ele['Names']}
          </li>
          <li>
            <strong>Status:</strong>
            {ele['size']}
          </li>
          <li>
            
          </li>
        </div>
      </div>
    );
  });
  
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
            ></input>
          </span>
          <button className="run-btn" onClick={(e) => handleClick(e)}>
            Find
          </button>
        </div>
      </div>
      <div className="containers">{renderVolumeHistory}</div>
    </div>
  );
};

export default volumeHistory;
// include connect method at the bottom