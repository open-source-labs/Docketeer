import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/actions";
import * as helper from "../helper/commands";
import YmlDisplay from "../display/YmlDisplay";

const Yml = () => {
  //cant read add eventlistner of null

  // const [filepath, setFilepath] = useState("");
  // const [filename, setFilename] = useState("");

  // const dispatch = useDispatch();
  // const composeymlFiles = (data) => dispatch(actions.composeymlFiles(data));
  // const ymlList = useSelector((state) => state.lists.ymlList);

  useEffect(() => {
    // console.log("hi im here");
    // let holder = document.getElementById("drag-file");
    // holder.ondragover = () => {
    //   return false;
    // };
    // holder.ondragleave = () => {
    //   return false;
    // };
    // holder.ondragend = () => {
    //   return false;
    // };
    // ///Users/wilmersinchi/Documents/precourse/docker/node-php-volumes_something/docker-compose.yml
    // holder.ondrop = (e) => {
    //   e.preventDefault();
    //   //   application/x-yaml
    //   // for (let f of e.dataTransfer.files) {
    //   //   console.log("File(s) you dragged here: ", f.path);
    //   // }
    //   let fileName = e.dataTransfer.files;
    //   if (fileName.length > 1) return;
    //   if (fileName[0].type === "application/x-yaml") {
    //     const filteredArr = fileName[0].path.split("/");
    //     filteredArr.pop();
    //     let filteredPath = filteredArr.join("/");
    //     // helper.connectContainers(filteredPath);
    //     setFilepath(filteredPath);
    //     setFilename(fileName[0].name);
    //   }
    //   return false;
    // };
  }, []);

  const hi = () => {
    return <div>hello my name is thsi</div>;
  };

  return (
    // <div className="renderContainers">
    //   <div className="jumbotron">
    //     <h1>Drop your file below box</h1>
    //     <p className="alert alert-info" id="drag-file">
    //       file name: {filename}
    //     </p>
    //   </div>

    //   <br />
    //   <button
    //     id="btn"
    //     className="btn btn-success"
    //     onClick={() => helper.connectContainers(filepath, composeymlFiles)}
    //   >
    //     Run Yml Files
    //   </button>
    //   {/* <YmlDisplay ymlList={ymlList} /> */}
    //   <div>
    //     hello
    //     {hi}
    //   </div>
    // </div>
    <div className="renderContainers">
      I am here
      {hi}
    </div>
  );
};

export default Yml;
