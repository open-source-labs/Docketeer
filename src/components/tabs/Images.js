/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import * as helper from '../helper/commands';

/**
 * Render Images of the user has
 * 
 * @param {*} props 
 */
const Images = (props) => {
  const [repo, setRepo] = useState('');

  const handleClick = (e) => {
    if (!repo) {
      alert('Please enter an image to pull!');
      return;
    }
    else {
      let existingRepo = false;
      if(repo.includes(':')){
        const splitRepo = repo.split(':');
        // can't break out of a forEach, so opted to use map as temp solution
        props.imagesList.map((el)=>{
          if(el.reps === splitRepo[0] && el.tag === splitRepo[1]){
            existingRepo = true;
            return;
          }
        });
        if (existingRepo === true) {
          alert('This image already exists!');
          return;
        }
        else {
          alert('Looking for image');
          helper.pullImage(repo);
          return;
        }
      } 
      
      else {
        props.imagesList.map((el)=>{
          if (el.reps === repo && el.tag === 'latest'){
            existingRepo = true;
            return;
          }
        });
        if (existingRepo === true){
          alert('This image already exists!');
          return;
        }        
        else {
          alert('Looking for image');
          helper.pullImage(repo);
          return;
        }
      }
    }
  };

  const renderImagesList = props.imagesList.map((ele, i) => {
    return (
      <div className="box" key={`imageBox${i}`}>
        <div className="box-label">
          <h3>{ele['reps']}</h3>
          <p>{ele['tag']}</p>
        </div>
        <div className="stopped-info">
          <ul>
            <li>
              <strong>ID: </strong>{ele['imgid']}
            </li>
            <li>
              <strong>Size: </strong>{ele['size']}
            </li>
          </ul>
        </div>
        <div className="stopped-button">
          <button
            className="run-btn"
            onClick={() =>
              props.runIm(
                ele['imgid'],
                props.runningList,
                helper.addRunning,
                props.addRunningContainers
              )
            }
          >
            RUN
          </button>
          <button
            className="stop-btn"
            onClick={() =>
              props.removeIm(
                ele['imgid'],
                props.imagesList,
                helper.refreshImages,
                props.refreshImagesList
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
          <label>Enter Image Repo<span style={{fontSize:'10px'}}>(version defaults to latest)</span></label>
          <span>
            <input
              type="text"
              placeholder='image:version'
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
