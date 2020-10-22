import React, { useEffect, useState } from "react";
import { connect, useSelector } from 'react-redux';
import * as actions from '../../actions/actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import * as categories from '../../constants/notificationCategories';

const mapDispatchToProps = dispatch => ({
  addPhoneNumber: (data) => dispatch(actions.addPhoneNumber(data)),
  addMemoryNotificationSetting: (data) => dispatch(actions.addMemoryNotificationSetting(data)),
  addCpuNotificationSetting: (data) => dispatch(actions.addCpuNotificationSetting(data)),
  addStoppedNotificationSetting: (data) => dispatch(actions.addStoppedNotificationSetting(data)),
  removeMemoryNotificationSetting: (data) => dispatch(actions.removeMemoryNotificationSetting(data)),
  removeCpuNotificationSetting: (data) => dispatch(actions.removeCpuNotificationSetting(data)),
  removeStoppedNotificationSetting: (data) => dispatch(actions.removeStoppedNotificationSetting(data)),
});

const Settings = (props) => {

  /**
   * alerts if phone not entered on Test click
   */
  const handlePhoneNumberSubmit = () => {
    if (!props.phoneNumber) alert('Please enter phone number');

    let isValidPhone = false;
    // TODO: send test notification to phone to check if valid phone
    // do something if valid phone or if invalid phone
    alert(`Phone: ${props.phoneNumber} is valid`);
  }

  /**
   * Checks to see if the containerId is in the array
   * @param {array} array the notification settings array (ex: memoryNotificationList)
   * @param {string} containerId the container's ID
   * @returns {number} -1 or the index of the container ID within the array
   */
  // general function to check if a container is in a notification setting list
  const isSelected = (array, containerId) => array.indexOf(containerId) !== -1;

  const renderRunningList = props.runningList.map((container, i) => {
    let isMemorySelected = isSelected(props.memoryNotificationList, container.cid);
    let isCpuSelected = isSelected(props.cpuNotificationList, container.cid);
    let isStoppedSelected = isSelected(props.stoppedNotificationList, container.cid);

    return (
      <TableRow key={i}>
        <TableCell>{container.name}</TableCell>
        <TableCell>{container.cid}</TableCell>
        <TableCell>{container.img}</TableCell>
        <TableCell align='center'>
          <Checkbox
            onClick={(event) => event.target.checked ? props.addMemoryNotificationSetting(container.cid) : props.removeMemoryNotificationSetting(container.cid)}
            role="checkbox"
            key={container.cid}
            checked={isMemorySelected}
          />
        </TableCell>
        <TableCell align='center'>
          <Checkbox
            onClick={(event) => event.target.checked ? props.addCpuNotificationSetting(container.cid) : props.removeCpuNotificationSetting(container.cid)}
            role="checkbox"
            key={container.cid}
            checked={isCpuSelected}
          />
        </TableCell>
        <TableCell align='center'>
          <Checkbox
            onClick={(event) => event.target.checked ? props.addStoppedNotificationSetting(container.cid) : props.removeStoppedNotificationSetting(container.cid)}
            role="checkbox"
            key={container.cid}
            checked={isStoppedSelected}
          />
        </TableCell>
        <TableCell align='center'>
          <button
            className="stop-btn"
            onClick={() => props.stop(container.cid, props.stopRunningContainer)}
          >
            STOP
          </button>
        </TableCell>
      </TableRow>
    );
  });

  // TODO: concat runningList with stoppedList if container can have 
  const renderStoppedList = props.stoppedList.map((container, i) => {

    let isMemorySelected = isSelected(props.memoryNotificationList, container.cid);
    let isCpuSelected = isSelected(props.cpuNotificationList, container.cid);
    let isStoppedSelected = isSelected(props.stoppedNotificationList, container.cid);

    return (
      <TableRow key={i}>
        <TableCell>{container.name}</TableCell>
        <TableCell>{container.cid}</TableCell>
        <TableCell>{container.img}</TableCell>
        <TableCell align='center'>
          <Checkbox
            onClick={(event) => event.target.checked ? props.addMemoryNotificationSetting(container.cid) : props.removeMemoryNotificationSetting(container.cid)}
            role="checkbox"
            key={container.cid}
            checked={isMemorySelected}
          />
        </TableCell>
        <TableCell align='center'>
          <Checkbox
            onClick={(event) => event.target.checked ? props.addCpuNotificationSetting(container.cid) : props.removeCpuNotificationSetting(container.cid)}
            role="checkbox"
            key={container.cid}
            checked={isCpuSelected}
          />
        </TableCell>
        <TableCell align='center'>
          <Checkbox
            onClick={(event) => event.target.checked ? props.addStoppedNotificationSetting(container.cid) : props.removeStoppedNotificationSetting(container.cid)}
            role="checkbox"
            key={container.cid}
            checked={isStoppedSelected}
          />
        </TableCell>
        <TableCell align='center'>
          <button
            className="run-btn"
            onClick={() => props.runStopped(container.cid, props.runStoppedContainer)}
          >
            RUN
          </button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div className="renderContainers">
      <div className="header">
        <span className="tabTitle">Settings</span>
        <span></span>
      </div>
      <div className="settings-content">
        <div className="phone-number">
          <label>Enter Phone Number for Notifications</label>
          <span>
            <TextField required id="phone-number"
              label="Phone Number"
              variant="filled"
              value={props.phoneNumber}
              onChange={(e) => {
                props.addPhoneNumber(e.target.value);
                console.log(e.target.value);
              }}
            />
            <Button
              size="small"
              color="default"
              variant="outlined"
              onClick={(e) => handlePhoneNumberSubmit(e)}>
              Test
            </Button>
          </span>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Container Name</TableCell>
                <TableCell>Container ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align='center'>Memory > 80%</TableCell>
                <TableCell align='center'>CPU > 80%</TableCell>
                <TableCell align='center'>Container Stops</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderRunningList}
              {renderStoppedList}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
};

export default connect(null, mapDispatchToProps)(Settings);
