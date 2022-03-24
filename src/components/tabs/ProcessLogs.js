/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

/**
 * Render Volume History
 * May need to be refactored to auto refresh
 *
 * @param {*} props
 */
const processLogs = (props) => {
  //   const [volumeName, setVolumeName] = useState("");
  //   const [volumeList, setVolumeList] = useState("");

  // Container details
  //const containerDetails = (container, i) => {
  // unique key error here, fix required
  //     return (
  //       <div
  //         className="volume-container-details"
  //         key={`vol.${container.Names}-${i}`}
  //       >
  //         <strong>Container Name: </strong>
  //         {container["Names"]}
  //         <ul>
  //           <li>
  //             <strong>Status: </strong>
  //             {container["State"]}
  //           </li>
  //           <li>
  //             <strong>Running For: </strong>
  //             {container["Status"]}
  //           </li>
  //         </ul>
  //       </div>
  //     );
  //   };

  // Creates the card components of Name and container details
  //   const renderVolumeHistory = (volumeProps) =>
  //     volumeProps.map((ele, i) => {
  //       const details = [];

  //       ele.containers.length
  //         ? ele.containers.forEach((el) => details.push(containerDetails(el, i)))
  //         : details.push(
  //             <div className="volume-container-details">
  //               No container found in this volume
  //             </div>
  //           );

  //       return (
  //         <div className="box" key={`volume${i}`}>
  //           <div className="box-label">
  //             <h3>{ele.vol_name}</h3>
  //           </div>
  //           {details}
  //         </div>
  //       );
  //     });

  //   // Initializes the volume history tab to be the list of volumes
  //   let renderList = renderVolumeHistory(props.volumeContainersList);

  //   // Search bar: Finds volume name and renders an individual card
  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     const result = volumeList.filter((vol) => vol.Name.includes(volumeName));

  //     setVolumeList(result);
  //     renderList = renderVolumeHistory(volumeList);
  //   };

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Process Logs</h1>
      </div>
    </div>
  );
};

export default processLogs;
