/* eslint-disable react/prop-types */
import React from "react";
import ProcessLogsCard from "../display/ProcessLogsCard";
import { ContainerType } from "../../../types";

import { useSelector } from "react-redux";
import { StateType } from "../../../types";

// Display all running and stopped containers. Each box can be selected to view process log tables.

const ProcessLogs = () => {
  const { runningList, stoppedList } = useSelector(
    (state: StateType) => state.containersList
  );

  const renderRunningList: any[] = [];
  runningList.map((container: ContainerType, index: number) => {
    renderRunningList.push(
      <ProcessLogsCard
        key={index}
        index={index}
        container={container}
        status="Running"
      />
    );
  });

  const renderStoppedList: any[] = [];
  stoppedList.map((container: ContainerType, index: number) => {
    renderStoppedList.push(
      <ProcessLogsCard
        key={index}
        index={index}
        container={container}
        status="Stopped"
      />
    );
  });

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Process Logs</h1>
      </div>

      <h3 className="container-heading">
        Running Containers: {runningList.length}
      </h3>

      <div className="containers">{renderRunningList}</div>

      <br></br>

      <h3 className="container-heading">
        Stopped Containers: {stoppedList.length}
      </h3>

      <div className="containers">{renderStoppedList}</div>
    </div>
  );
};

export default ProcessLogs;
