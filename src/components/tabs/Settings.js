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
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
      marginLeft: 5,
      marginBottom: 15,
      width: 220,
      verticalAlign: 'middle',
    },
  },
  button: {
    marginLeft: 5,
    width: 100,
    verticalAlign: 'top',
  },
  verifiedIcon: {
    verticalAlign: 'top',
    //marginTop: 8,
    color: 'green',
  },
  description: {
    marginLeft: 5,
    marginBottom: 30,
  },
}));

// showVerificationInput IS ISED FOR RENDERING THE VERIFICATION CODE COMPONENT
let showVerificationInput = false;
let isVerified = false;

const Settings = (props) => {
  const [tempPhoneNumber, setTempPhoneNumber] = useState('');

  // styling
  const classes = useStyles();

  // console.log('runningList', props.runningList);
  // console.log('stoppedList', props.stoppedList);

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
          console.log("** INSERT_CONTAINER returned: **", res);
        }
      }
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
          console.log("** INSERT_CONTAINER_SETTING returned: **", res);
        }
      }
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
          console.log("** DELETE_CONTAINER_SETTING returned: **", res);
        }
      }
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

        console.log("** Settings returned: **", res.rows);
      }
    });
  };

  const fetchVerificationCode = async () => {
    await ipcRenderer.invoke("verify-number", tempPhoneNumber);
  };

  // const fetchVerificationCode = () => {
  //   fetch('http://localhost:5000/mobile', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'Application/JSON',
  //     },
  //     body: JSON.stringify({
  //       mobileNumber: tempPhoneNumber,
  //     }),
  //   })
  //     .then((response) => {
  //       console.log('phone sent to verification: ', tempPhoneNumber);

  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('Data from nofication service: ', data);
  //     })
  //     .catch((err) =>
  //       console.log('handlePhoneNumberSubmit fetch ERROR: ', err),
  //     );
  // };

  // fetch on component mount only because of empty dependency array
  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  // SELECT cs.container_id, metric_name, triggering_value FROM container_settings  as cs INNER JOIN notification_settings as ns ON cs. notification_settings.id = ns.id;
  /**
   * alerts if phone not entered on Test click
   */
  const handlePhoneNumberSubmit = () => {
    // console.log('Hidden test value: ' showVerificationInput)
    if (!tempPhoneNumber) alert('Please enter phone number');
    else {
      // alert if input is not a number
      if (isNaN(Number(tempPhoneNumber)))
        alert('Please enter phone number in numerical format. ex: 123456789');
      else {
        alert(`Phone: ${tempPhoneNumber} is valid`);
        query(
          queryType.INSERT_USER,
          ['admin', props.phoneNumber],
          (err, res) => {
            if (err) {
              console.log(`Error in insert user. Error: ${err}`);
            } else {
              console.log(`*** Inserted ${res} into users table. ***`);
              props.addPhoneNumber(tempPhoneNumber);
              showVerificationInput = true;
              // ask SMS service for a verification code
              fetchVerificationCode();
            }
          },
        );
      }
    }
  };

// SAVING USER INPUTS: NOTIFICATION AND MEMORY CYCLE 
  // 1. GET DATA FROM THE FORM
  // 2. MAKE SURE THAT IT HAS THE RIGHT FORMAT
  // 3. SEND IT TO DATABASE
  // 4. THEN UPDATE THE STATE
const [tempNotifFreq, setTempNotifFreq] = useState('');
const notificationFrequency = () => {
              // default value for Notification Frequency
              let frequency = 5
              // alert if input is not a number
              if (isNaN(Number(tempNotifFreq))) alert('Please enter notification frequency in numerical format. ex: 15');
              else {
                if (tempNotifFreq) frequency = tempNotifFreq
                console.log("notificationFrequency: ", frequency)                                             //DELETE AFTER INTEGRATION TESTS WILL BE PASSED
                  // query(
                  //   queryType.INSERT_USER,    // CHANGE DB QUERY
                  //   ['admin', props.phoneNumber],
                  //   (err, res) => {
                  //     if (err) {
                  //       console.log(`Error in insert user. Error: ${err}`);
                  //     } else {
                  //       console.log(`*** Inserted ${res} into users table. ***`);
                  //       props.addNotificationFrequency(tempNotifFreq);
                  //     }
                  //   },
                  // );
              }
              // }
};

const [tempMonitoringFrequency, setTempMonitoringFrequency] = useState('');
const monitoringFrequency = () => {
              // default value for Monitoring Frequency
              let frequency = 2
              // alert if input is not a number
              if (isNaN(Number(tempMonitoringFrequency))) alert('Please enter monitoring frequency in numerical format. ex: 15');
              else {
                if (tempMonitoringFrequency) frequency = tempMonitoringFrequency
                console.log("monitoringFrequency: ", frequency)                                             //DELETE AFTER INTEGRATION TESTS WILL BE PASSED
                  // query(
                  //   queryType.INSERT_USER,    // CHANGE DB QUERY
                  //   ['admin', props.phoneNumber],
                  //   (err, res) => {
                  //     if (err) {
                  //       console.log(`Error in insert user. Error: ${err}`);
                  //     } else {
                  //       console.log(`*** Inserted ${res} into users table. ***`);
                  //       props.addNotificationFrequency(tempNotifFreq);
                  //     }
                  //   },
                  // );
              }
              // }
};

  // VERIFICATION OF THE CODE TYPED IN BY USER FROM SMS
  const [formData, updateFormData] = useState("");
  const handleChange = (value) => {
    updateFormData(value);
    console.log(formData);
  };

  const handleSubmit = (e) => {
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
        // verification code approved so hide verification code input
        if (data === 'approved') {
          showVerificationInput = false;
          isVerified = data === 'approved' ? true : false;
        } else alert('Please try verification code again');
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
      container.cid
    );
    let isCpuSelected = isSelected(props.cpuNotificationList, container.cid);
    let isStoppedSelected = isSelected(
      props.stoppedNotificationList,
      container.cid
    );

    return (
      <TableRow key={i}>
        <TableCell><span className="container-name">{container.name}</span></TableCell>
        <TableCell><span className="container-id">{container.cid}</span></TableCell>
        <TableCell>{container.img}</TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.cid,
                    container.name,
                    categories.MEMORY
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
                    categories.CPU
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
                    categories.STOPPED
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
      container.cid
    );
    let isCpuSelected = isSelected(props.cpuNotificationList, container.cid);
    let isStoppedSelected = isSelected(
      props.stoppedNotificationList,
      container.cid
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
                    categories.MEMORY
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
                    categories.CPU
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
                    categories.STOPPED
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
        <h1 className="tabTitle">Settings</h1>
      </div>
      
      <div className="metric-section-title">
        <h3>Notifications</h3>
      </div>
      <div className="settings-container">
          <p>Allows you (i) to customize monitoring and notification frequency and (ii) to define alert conditions for sms notifications when your container meets a condition</p>
          <br></br>
          <p>1. Link mobile phone to your account</p> 
          <br></br>
          <form className={classes.root} autoComplete="off">
              <div>
                <TextField
                  required
                  id="textfield"
                  label="Phone Number"
                  helperText="* use country code (+1)"
                  variant="outlined"
                  value={tempPhoneNumber}
                  onChange={(e) => {
                    setTempPhoneNumber(e.target.value);
                    console.log(tempPhoneNumber);
                    isVerified = false;
                  }}
                  size="small"
                />
                {!isVerified ? (
                  <Button
                    className={classes.button}
                    size="medium"
                    variant="contained"
                    onClick={(e) => handlePhoneNumberSubmit(e)}
                    endIcon={<SendIcon />}
                  >
                    Verify
                  </Button>
                ) : (
                  <CheckCircleIcon
                    fontSize="large"
                    className={classes.verifiedIcon}
                  />
                )}
              </div>
            </form>

            {showVerificationInput ? (
          <form className={classes.root} autoComplete="off">
            <div className="verification-code">
              <TextField
                required
                id="verification-code"
                label="Verification code"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e.target.value);
                  console.log(props.phoneNumber);
                }}
                size="small"
              />
              <Button
                className={classes.button}
                size="medium"
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </div>
          </form>
        ) : null}

          <p>2. Setup / update notification criteria. Recommended values will be used by default </p> 
          <br></br>
          <div>
            <form className={classes.root} autoComplete="off">
              <TextField
                id="textfield"
                label="Notification frequency, min"
                helperText="* 5 min is recommended"
                variant="outlined"
                value={tempNotifFreq}
                  onChange={(e) => {
                    setTempNotifFreq(e.target.value);
                    console.log(tempNotifFreq);
                  }}
                  size="small"
              />
              <Button
                className={classes.button}
                size="medium"
                variant="contained"
                onClick={(e) => notificationFrequency(e)}
              >
                Confirm
              </Button>
            </form>
          </div>

          <div>
            <form className={classes.root} autoComplete="off">
              <TextField
                className={classes.textfield}
                id="textfield"
                label="Monitoring frequency, min"
                helperText="* 2 min is recommended"
                variant="outlined"
                value={tempMonitoringFrequency}
                  onChange={(e) => {
                    setTempMonitoringFrequency(e.target.value);
                    console.log(tempMonitoringFrequency);
                  }}
                  size="small"
              />
              <Button
                className={classes.button}
                size="medium"
                variant="contained"
                onClick={(e) => monitoringFrequency(e)}
              >
                Confirm
              </Button>
            </form>
          </div>

          <br></br>
          <p>3. Setup / update attribute values for notification triggers in Containers settings table below. Recommended values will be used by default </p> 
          <br></br>

      </div>

      <div className="metric-section-title">
        <h3>GitHub commits</h3>
      </div>
      <div className="settings-container">
          <p>Allows you to get access to latest GitHub commits in your project repository on "Metrics" tab for selected containers</p>
          <br></br>
          <p>1. Add GitHub repositories url in Containers settings table below</p>
      </div>


      <div className="metric-section-title">
        <h3> Containers setting table</h3>
        <p></p>
      </div>

      <div className="settings-container">
        <div id="description" className={classes.description}>
        </div>

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
