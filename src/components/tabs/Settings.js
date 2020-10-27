import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from '../../actions/actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as categories from '../../constants/notificationCategories';
import query from '../helper/psqlQuery';
import * as queryType from '../../constants/queryTypes';

const mapDispatchToProps = (dispatch) => ({
  addPhoneNumber: (data) => dispatch(actions.addPhoneNumber(data)),
  addMemoryNotificationSetting: (data) =>
    dispatch(actions.addMemoryNotificationSetting(data)),
  addCpuNotificationSetting: (data) =>
    dispatch(actions.addCpuNotificationSetting(data)),
  addStoppedNotificationSetting: (data) =>
    dispatch(actions.addStoppedNotificationSetting(data)),
  removeMemoryNotificationSetting: (data) =>
    dispatch(actions.removeMemoryNotificationSetting(data)),
  removeCpuNotificationSetting: (data) =>
    dispatch(actions.removeCpuNotificationSetting(data)),
  removeStoppedNotificationSetting: (data) =>
    dispatch(actions.removeStoppedNotificationSetting(data)),
});

      // HIDDENTEST IS ISED FOR RENDERING THE VERIFICATION CODE COMPONENT
      let hiddenTest = false

const Settings = (props) => {
  console.log(`*** SETTINGS RENDERED ***`)

  // handle check
  // I couldve made this a single function where queryType gets passed in
  // but the query's parameters are not the same
  const handleCheckSetting = (containerId, containerName, metricName) => {
    // add to DB
    query(
      queryType.INSERT_CONTAINER,
      [containerId, containerName],
      (err, res) => {
        if (err) {
          console.log(`Error in INSERT_CONTAINER. Error: ${err}`);
        } else {
          // if all good, call fetchNotificationSettings
          fetchNotificationSettings();
          console.log('** INSERT_CONTAINER returned: **', res);
        }
      },
    );

    query(
      queryType.INSERT_CONTAINER_SETTING,
      [containerId, metricName.toLowerCase()],
      (err, res) => {
        if (err) {
          console.log(`Error in INSERT_CONTAINER_SETTING. Error: ${err}`);
        } else {
          // if all good, call fetchNotificationSettings
          fetchNotificationSettings();
          console.log('** INSERT_CONTAINER_SETTING returned: **', res);
        }
      },
    );
  };

  // handle uncheck
  // remove from DB
  const handleUnCheckSetting = (containerId, metricName) => {
    // add to DB
    query(
      queryType.DELETE_CONTAINER_SETTING,
      [containerId, metricName.toLowerCase()],
      (err, res) => {
        if (err) {
          console.log(`Error in DELETE_CONTAINER_SETTING. Error: ${err}`);
        } else {
          // if all good, call fetchNotificationSettings
          fetchNotificationSettings();
          console.log('** DELETE_CONTAINER_SETTING returned: **', res);
        }
      },
    );
  };

  const fetchNotificationSettings = () => {
    return query(queryType.GET_NOTIFICATION_SETTINGS, [], (err, res) => {
      if (err) {
        console.log(`Error getting settings. Error: ${err}`);
      } else {
        // find a way to set the three lists here
        // iterate through res.row
        // if the metric_name = "memory"
        let tempMemory = [];
        let tempCPU = [];
        let tempStopped = [];

        res.rows.forEach((el, i) => {
          switch (el.metric_name) {
            case categories.MEMORY.toLowerCase():
              tempMemory.push(el.container_id);
              break;
            case categories.CPU.toLowerCase():
              tempCPU.push(el.container_id);
              break;
            case categories.STOPPED.toLowerCase():
              tempStopped.push(el.container_id);
              break;
            default:
              break;
          }
        });

        // replace state with new data from database
        props.addMemoryNotificationSetting(tempMemory);
        props.addCpuNotificationSetting(tempCPU);
        props.addStoppedNotificationSetting(tempStopped);

        console.log('** Settings returned: **', res.rows);
      }
    });

    console.log(`*** Settings returned: ${res} ***`);
  };

  // fetch on component mount only because of empty dependency array
  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  // SELECT cs.container_id, metric_name, triggering_value FROM container_settings  as cs INNER JOIN notification_settings as ns ON cs. notification_settings.id = ns.id;
  /**
   * alerts if phone not entered on Test click
   */
  const handlePhoneNumberSubmit = () => {
    // console.log('Hidden test value: ' hiddenTest)
    if (!props.phoneNumber) alert('Please enter phone number');
    else {
      let phoneNumber = parseInt(props.phoneNumber); // WHEN I TYPE 'ABC' IT DOES NOT SHOW AN ERROR
      if (typeof phoneNumber !== 'number')
        alert('Please enter phone number in numerical format. ex: 123456789');
      else {
        // test query out
        hiddenTest=true
        query(queryType.INSERT_USER, ['anton', phoneNumber], (err, res) => {
          if (err) {
            console.log(`Error in insert user. Error: ${err}`);
          } else {
            console.log(`*** Inserted ${res} into users table. ***`);
          }
        });
      }
    }

    fetch('http://localhost:5000/mobile', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        mobileNumber: props.phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data from nofication service: ', data);
      })
      .catch((err) =>
        console.log('handlePhoneNumberSubmit fetch ERROR: ', err),
      );

    let isValidPhone = false;
    // TODO: send test notification to phone to check if valid phone
    // do something if valid phone or if invalid phone
    alert(`Phone: ${props.phoneNumber} is valid`);
  };

  // VERIFICATION OF THE CODE TYPED IN BY USER FROM SMS
  // const verifCodeForm = () => {
    const [formData, updateFormData] = useState('');
    const handleChange = (value) => {
      updateFormData(value);
      console.log(formData)
    };
    
    const handleSubmit = (e) => {
      console.log('handleSubmit sent');     // KILL AFTER TESTING
      console.log(props.phoneNumber);       // KILL AFTER TESTING
      fetch('http://localhost:5000/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          code: formData, 
          mobileNumber: props.phoneNumber, // Check at the server level that receive data in the right format
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Code verification status: ', data);
          if (data==='approved') hiddenTest=false
          else alert('Please try verification code again')
         })
        .catch((err) => console.log('handleCodeSubmit fetch ERROR: ', err));
  };

  /**
   * Checks to see if the containerId is in the array
   * @param {array} array the notification settings array (ex: memoryNotificationList)
   * @param {string} containerId the container's ID
   * @returns {number} -1 or the index of the container ID within the array
   */
  // general function to check if a container is in a notification setting list
  const isSelected = (set, containerId) => set.has(containerId);

  const renderRunningList = props.runningList.map((container, i) => {
    let isMemorySelected = isSelected(
      props.memoryNotificationList,
      container.cid,
    );
    let isCpuSelected = isSelected(props.cpuNotificationList, container.cid);
    let isStoppedSelected = isSelected(
      props.stoppedNotificationList,
      container.cid,
    );

    return (
      <TableRow key={i}>
        <TableCell>{container.name}</TableCell>
        <TableCell>{container.cid}</TableCell>
        <TableCell>{container.img}</TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.cid,
                    container.name,
                    categories.MEMORY,
                  )
                : handleUnCheckSetting(container.cid, categories.MEMORY)
            }
            role="checkbox"
            key={container.cid}
            checked={isMemorySelected}
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.cid,
                    container.name,
                    categories.CPU,
                  )
                : handleUnCheckSetting(container.cid, categories.CPU)
            }
            role="checkbox"
            key={container.cid}
            checked={isCpuSelected}
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.cid,
                    container.name,
                    categories.STOPPED,
                  )
                : handleUnCheckSetting(container.cid, categories.STOPPED)
            }
            role="checkbox"
            key={container.cid}
            checked={isStoppedSelected}
          />
        </TableCell>
        <TableCell align="center">
          <button
            className="stop-btn"
            onClick={() =>
              props.stop(container.cid, props.stopRunningContainer)
            }
          >
            STOP
          </button>
        </TableCell>
      </TableRow>
    );
  });

  // TODO: concat runningList with stoppedList if container can have
  const renderStoppedList = props.stoppedList.map((container, i) => {
    let isMemorySelected = isSelected(
      props.memoryNotificationList,
      container.cid,
    );
    let isCpuSelected = isSelected(props.cpuNotificationList, container.cid);
    let isStoppedSelected = isSelected(
      props.stoppedNotificationList,
      container.cid,
    );

    return (
      <TableRow key={i}>
        <TableCell>{container.name}</TableCell>
        <TableCell>{container.cid}</TableCell>
        <TableCell>{container.img}</TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.cid,
                    container.name,
                    categories.MEMORY,
                  )
                : handleUnCheckSetting(container.cid, categories.MEMORY)
            }
            role="checkbox"
            key={container.cid}
            checked={isMemorySelected}
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.cid,
                    container.name,
                    categories.CPU,
                  )
                : handleUnCheckSetting(container.cid, categories.CPU)
            }
            role="checkbox"
            key={container.cid}
            checked={isCpuSelected}
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.cid,
                    container.name,
                    categories.STOPPED,
                  )
                : handleUnCheckSetting(container.cid, categories.STOPPED)
            }
            role="checkbox"
            key={container.cid}
            checked={isStoppedSelected}
          />
        </TableCell>
        <TableCell align="center">
          <button
            className="run-btn"
            onClick={() =>
              props.runStopped(container.cid, props.runStoppedContainer)
            }
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
            <TextField
              required
              id="phone-number"
              label="Phone Number"
              variant="filled"
              value={props.phoneNumber}
              onChange={(e) => {
                props.addPhoneNumber(e.target.value);
                console.log(props.phoneNumber);
              }}
            />
            <Button
              size="small"
              color="default"
              variant="outlined"
              onClick={(e) => handlePhoneNumberSubmit(e)}
            >
              Test
            </Button>
          </span>
        </div>

{ hiddenTest ? 
        <div className="verification-code">
          <label>Enter verification code</label>
          <span>
            <TextField
              required
              id="verification-code"
              label="Verification code"
              variant="filled"
              onChange={(e) => {
                handleChange(e.target.value);
                console.log(props.phoneNumber);
              }}
            />
            <Button
              size="small"
              color="default"
              variant="outlined"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </span>
        </div>
        : null
}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Container Name</TableCell>
                <TableCell>Container ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="center">Memory > 80%</TableCell>
                <TableCell align="center">CPU > 80%</TableCell>
                <TableCell align="center">Container Stops</TableCell>
                <TableCell align="center">Actions</TableCell>
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
  );
};

export default connect(null, mapDispatchToProps)(Settings);
