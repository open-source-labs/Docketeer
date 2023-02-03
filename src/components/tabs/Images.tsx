/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import * as helper from '../helper/commands';
import { type ImagesProps } from '../../../types';

/**
 * Render Images of the user has
 *
 * @param {*} props
 */
const Images = (props: ImagesProps) => {
  const [repo, setRepo] = useState('');

  const handleClick = () => {
    if (!repo) {
      alert('Please enter an image to pull!');
    } else {
      let existingRepo = false;
      if (repo.includes(':')) {
        const splitRepo = repo.split(':');
        // can't break out of a forEach, so opted to use map as temp solution
        props.imagesList.map((el) => {
          if (el.reps === splitRepo[0] && el.tag === splitRepo[1]) {
            existingRepo = true;
          }
        });
        if (existingRepo) {
          alert('This image already exists!');
        } else {
          alert('Looking for image');
          helper.pullImage(repo);
        }
      } else {
        props.imagesList.map((el) => {
          if (el.reps === repo && el.tag === 'latest') {
            existingRepo = true;
          }
        });
        if (existingRepo) {
          alert('This image already exists!');
        } else {
          alert('Looking for image');
          helper.pullImage(repo);
        }
      }
    }
  };

  const renderImagesList = props.imagesList.map((ele, i: number) => {
    return (
      <div className="box" key={`imageBox${i}`}>
        <div className="box-label">
          <h3>{ele.reps}</h3>
          <p>{ele.tag}</p>
        </div>
        <div className="stopped-info">
          <ul>
            <li>
              <strong>ID: </strong>{ele.imgid}
            </li>
            <li>
              <strong>Size: </strong>{ele.size}
            </li>
          </ul>
        </div>
        <div className="stopped-button">
          <button
            className="run-btn"
            // {props.runIm and props.removeIm could be converted to helper.runIm instead-- not sure why it is passed as props}
            onClick={() => {
              props.runIm(
                ele,
                props.refreshRunningContainers
              );
            }
            }
          >
            RUN
          </button>
          <button
            className="remove-btn"
            onClick={() => {
              props.removeIm(
                ele.imgid,
                props.imagesList,
                helper.refreshImages,
                props.refreshImagesList
              );
            }
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
      </div>
      <div className="settings-container">
        <label>Enter Image Repository <span style={{ fontSize: '10px' }}> (version defaults to latest)</span></label>
        <span>
          <input className="input-box"
            type="text"
            placeholder='image:version'
            value={repo}
            onChange={(e) => {
              setRepo(e.target.value);
            }}
          ></input>
          <button className="etc-btn" name='pull' onClick={() => { handleClick(); }}>
            PULL
          </button>
        </span>
      </div>
      <div className="containers">{renderImagesList}</div>
    </div>
  );
};

export default Images;
