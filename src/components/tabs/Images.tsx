import React, { useState } from "react";
import { StateType } from "../../../types";

import useHelper from "../helper/commands";
// import * as helper from "../helper/commands";
import { useSelector } from "react-redux";

/**
 * Render Images of the user
 **/

const Images = () => {
  const imagesList = useSelector((state: StateType) => state.images.imagesList);
  const [repo, setRepo] = useState("");

  const { runIm, removeIm, pullImage } = useHelper();

  const handleClick = () => {
    if (!repo) {
      alert("Please enter an image to pull!");
      return;
    } else {
      let existingRepo = false;
      if (repo.includes(":")) {
        const splitRepo = repo.split(":");
        // can't break out of a forEach, so opted to use map as temp solution
        imagesList.map((el) => {
          if (el.reps === splitRepo[0] && el.tag === splitRepo[1]) {
            existingRepo = true;
            return;
          }
        });
        // ingore was used below because Typescript says the condition will never be true, but this is not an accurate error
        // @ts-ignore
        if (existingRepo === true) {
          alert("This image already exists!");
          return;
        } else {
          alert("Looking for image");
          pullImage(repo);
          return;
        }
      } else {
        imagesList.map((el) => {
          if (el.reps === repo && el.tag === "latest") {
            existingRepo = true;
            return;
          }
        });
        // ignore was used below because Typescript says the codition will never be true, but this is not an accurate error
        // @ts-ignore
        if (existingRepo === true) {
          alert("This image already exists!");
          return;
        } else {
          alert("Looking for image");
          pullImage(repo);
          return;
        }
      }
    }
  };

  const renderImagesList = imagesList.map((ele, i: number) => {
    return (
      <div className="box" key={`imageBox${i}`}>
        <div className="box-label">
          <h3>{ele["reps"]}</h3>
          <p>{ele["tag"]}</p>
        </div>
        <div className="stopped-info">
          <ul>
            <li>
              <strong>ID: </strong>
              {ele["imgid"]}
            </li>
            <li>
              <strong>Size: </strong>
              {ele["size"]}
            </li>
          </ul>
        </div>
        <div className="stopped-button">
          <button className="run-btn" onClick={() => runIm(ele)}>
            RUN
          </button>
          <button className="remove-btn" onClick={() => removeIm(ele["imgid"])}>
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
        <label>
          Enter Image Repository{" "}
          <span style={{ fontSize: "10px" }}>
            {" "}
            (version defaults to latest)
          </span>
        </label>
        <span>
          <input
            className="input-box"
            type="text"
            placeholder="image:version"
            value={repo}
            onChange={(e) => {
              setRepo(e.target.value);
            }}
          ></input>
          <button className="etc-btn" name="pull" onClick={() => handleClick()}>
            PULL
          </button>
        </span>
      </div>
      <div className="containers">{renderImagesList}</div>
    </div>
  );
};

export default Images;
