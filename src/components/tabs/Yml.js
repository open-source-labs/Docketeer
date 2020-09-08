import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/actions";
import * as helper from "../helper/commands";

const Yml = () => {
  // cant read add eventlistner of null

  const [filepath, setFilepath] = useState("");
  const [fileList, setfileList] = useState("");

  const dispatch = useDispatch();
  const composeymlFiles = (data) => dispatch(actions.composeymlFiles(data));
  const networkList = useSelector((state) => state.lists.networkList);

  useEffect(() => {
    console.log("hi im here");
    let holder = document.getElementById("drag-file");
    holder.ondragover = () => {
      return false;
    };
    holder.ondragleave = () => {
      return false;
    };
    holder.ondragend = () => {
      return false;
    };
    ///Users/wilmersinchi/Documents/precourse/docker/node-php-volumes_something/docker-compose.yml
    holder.ondrop = (e) => {
      e.preventDefault();
      //   application/x-yaml
      // for (let f of e.dataTransfer.files) {
      //   console.log("File(s) you dragged here: ", f.path);
      // }
      let fileList = e.dataTransfer.files;
      console.log(fileList); 
      if (fileList.length > 1) return;
      if (fileList[0].type === "application/x-yaml") {
        //Users/wilmersinchi/Documents/precourse/docker/node-php-volumes_something/docker-compose.yml
        //console.log(fileList[0].path)
        const filteredArr = fileList[0].path.split("/");
        filteredArr.pop();
        let filteredPath = filteredArr.join("/");
        // helper.connectContainers(filteredPath);
        setFilepath(filteredPath);
        setfileList(fileList[0].name);
      }
      return false;
    };
  }, []);

  const NetworkDisplay = () => {
    if (networkList.length) {
      //["parentName": [{"cid": 1234, "name": container1}, {"cid": 5678, "name": "container2"}], "parentName2": [{"cid": 12345, "name": container12}, {"cid": 56789, "name": "container23"}],
    //"anotherparentName": [{"cid": 1234, "name": container1}, {"cid": 5678, "name": "container2"}], "parentName2": [{"cid": 12345, "name": container12}, {"cid": 56789, "name": "container23"}]
    // ]
      let newArray = [];
      // let parentName = [];
      for (let i = 0; i < networkList.length; i++) {
        let keys = Object.keys(networkList[i]); //["parentName"]
        //newArray.push(keys[0])
        let parent = keys[0];
        newArray.push(<span>Parent: {parent}</span>);
        
        for (let j = 0; j < networkList[i][keys[0]].length; j++) {
          let parents = networkList[i][keys[0]][j];
          console.log("parents: ", parents)

          for (let k = 0; k < parents.length; k++) {
            let container = networkList[i][keys[0]][j][k];
            console.log("networkList[i][key[0]][j][k][cid]: ", container["cid"]);

            //<div>networkList[i][keys[0]][j][k]["cid"]</div>
            newArray.push(
              <div>
                <span>ID: {container["cid"]}</span>
                <span>Name: {container["name"]}</span>
              </div>
            );
          }
        }
      }
      console.log("newArray: ", newArray);
      return <div>{newArray}</div>;
    } else {
      return <></>
    }

    //return <div>{networkList.length ? networkList[0] : "hi"}</div>;
  };

  return (
    <div className="renderContainers">
      <div className="jumbotron">
        <h1>Drop your file below box</h1>
        <p className="alert alert-info" id="drag-file">
          file name: {fileList}
        </p>
      </div>

      <br />
      <button
        id="btn"
        className="btn btn-success"
        onClick={() => helper.connectContainers(filepath, composeymlFiles)}
      >
        Run Yml Files
      </button>

      <NetworkDisplay />
    </div>
  );
};

export default Yml;
