/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import * as helper from '../module/utils/commands';

/**
 * Render Images of the user has
 */
const Images = ({
  imagesList,
  runIm,
  removeIm,
  runningList,
  addRunningContainers,
  refreshImagesList,
}) => {
  const [repo, setRepo] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    helper.pullImage(repo);
  };

  const renderImagesList = imagesList.map((ele, i) => {
    return (
      <div className="box" key={`imageBox${i}`}>
        <div className="box-label">
          <h3>{ele['reps']}</h3>
          <p>{ele['tag']}</p>
        </div>
        <div className="stopped-info">
          <ul>
            <li>
              <strong>ID: </strong>
              {ele['imgid']}
            </li>
            <li>
              <strong>Size: </strong>
              {ele['size']}
            </li>
          </ul>
        </div>
        <div className="stopped-button">
          <button
            className="run-btn"
            onClick={() =>
              runIm(
                ele['imgid'],
                runningList,
                helper.addRunning,
                addRunningContainers
              )
            }
          >
            RUN
          </button>
          <button
            className="stop-btn"
            onClick={() =>
              removeIm(
                ele['imgid'],
                imagesList,
                helper.refreshImages,
                refreshImagesList
              )
            }
          >
            REMOVE
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Images</h1>
        <div className="runByButton">
          <label>Enter Image Repo</label>
          <span>
            <input
              type="text"
              value={repo}
              onChange={(e) => {
                setRepo(e.target.value);
              }}
            ></input>
          </span>
          <button className="run-btn" onClick={(e) => handleClick(e)}>
            Pull
          </button>
        </div>
      </div>
      <div className="containers">{renderImagesList}</div>
    </div>
  );
};

export default Images;
