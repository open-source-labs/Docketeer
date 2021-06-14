// module imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

// static imports
import * as actions from "../../actions/actions";
import * as helper from "../helper/commands";
import Docketeer from "../../../assets/docketeer-title.png";

import Settings from "../tabs/Settings";

const SettingsRoute = (props) => {
  return (
    <Route path="/">
      <Settings
        runningList={props.runningList}
        stop={props.stop}
        stopRunningContainer={props.stopRunningContainer}
        stoppedList={props.stoppedList}
        runStopped={props.runStopped}
        refreshRunningContainers={props.refreshRunningContainers}
        runStoppedContainer={props.runStoppedContainer}
        phoneNumber={props.phoneNumber}
        memoryNotificationList={props.memoryNotificationList}
        cpuNotificationList={props.cpuNotificationList}
        stoppedNotificationList={props.stoppedNotificationList}
      />
  </Route>
  )
}

export default SettingsRoute;

