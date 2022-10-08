/* eslint-disable react/prop-types */
import React from 'react';

/**
 * Display all stopped containers with functionality
 *
 * @param {*} props
 */
const Stopped = (props) => {
  const renderStoppedList = props.stoppedList.map((container, i) => {
    return (
      <div className="box" key={`stoppedBox${i}`}>
        <div className="box-label">
          <h3>{container.Names}</h3>
          <p>{container.ID}</p>
        </div>

        <div className="stopped-info">
          <li>Img: {container.Image}</li>
          <li>Created: {container.RunningFor}</li>
          <li>name: {container.Names}</li>
        </div>
        <div className="stopped-button">
          <button
            className="run-btn"
            onClick={() =>
              props.runStopped(container['ID'], props.runStoppedContainer)
            }
          >
            RUN
          </button>
          <button
            className="stop-btn"
            onClick={() => props.remove(container['ID'], props.removeContainer)}
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
        <h1 className="tabTitle">Exited Containers</h1>
      </div>
      <div className="containers">{renderStoppedList}</div>
    </div>
  );
};

export default Stopped;
