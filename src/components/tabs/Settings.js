import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { ipcRenderer } from "electron";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as categories from "../../constants/notificationCategories";
import query from "../helper/psqlQuery";
import * as queryType from "../../constants/queryTypes";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import store from '../../renderer/store';

const mapDispatchToProps = (dispatch) => ({
  addPhoneNumber: (data) => dispatch(actions.addPhoneNumber(data)),
  addNotificationFrequency: (data) => dispatch(actions.addNotificationFrequency(data)),
  addMonitoringFrequency: (data) => dispatch(actions.addMonitoringFrequency(data)),
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
<<<<<<< HEAD
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
      marginLeft: 5,
      marginBottom: 15,
      width: 220,
      verticalAlign: 'middle',
=======
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      marginLeft: 5,
      marginBottom: 15,
      width: 200,
      verticalAlign: "middle",
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
    },
  },
  button: {
    marginLeft: 5,
    width: 100,
<<<<<<< HEAD
    verticalAlign: 'top',
  },
  verifiedIcon: {
    verticalAlign: 'top',
    //marginTop: 8,
    color: 'green',
=======
    verticalAlign: "top",
  },
  verifiedIcon: {
    verticalAlign: "top",
    //marginTop: 8,
    color: "green",
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
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
  const [mobileNumber, setMobileNumber] = useState("");
  const classes = useStyles();
<<<<<<< HEAD
=======
  let state = store.getState();
  let runningContainers = state.containersList.runningList;
  let stoppedContainers = state.containersList.stoppedList;
  console.log('RUNNING CONTAINERS: ', runningContainers);
  console.log('STOPPED CONTAINERS: ', stoppedContainers);
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
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

  const verifyMobileNumber = async () => {
    await ipcRenderer.invoke("verify-number", mobileNumber);
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
    if (!mobileNumber) alert("Please enter phone number");
    else {
      // alert if input is not a number
      if (isNaN(Number(mobileNumber)))
        alert("Please enter phone number in numerical format. ex: 123456789");
      else {
        alert(`Phone: ${mobileNumber} is valid`);
        // ask SMS service for a verification code
<<<<<<< HEAD
        query(queryType.INSERT_USER, ["admin", mobileNumber, 5, 2], (err, res) => {     // ADDED 2 COMMAS AFTER MOBILENUMBER -> MAKE SURE THAT IT WORKS
=======
        query(queryType.INSERT_USER, ["admin", mobileNumber], (err, res) => {
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
          if (err) {
            console.log(`Error in insert user. Error: ${err}`);
          } else {
            console.log(`*** Inserted ${res} into users table. ***`);
            props.addPhoneNumber(mobileNumber);
            showVerificationInput = true;
            // ask SMS service for a verification code
            verifyMobileNumber();
          }
        });
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
                console.log("notificationFrequency: ", frequency)                                               //DELETE AFTER INTEGRATION TESTS WILL BE PASSED
                  query(
                    queryType.INSERT_NOTIFICATION_FREQUENCY,    // CHANGE DB QUERY
                    ['admin', , frequency, ,],
                    (err, res) => {
                      if (err) {
                        console.log(`INSERT_NOTIFICATION_FREQUENCY. Error: ${err}`);
                      } else {
                        console.log(`*** Inserted ${res} into users table. ***`);
                        console.log("global state before state update: ", props.notificationFrequency)          // CHECK HOW THE STATE HAS CHANGED
                        props.addNotificationFrequency(frequency);                                              // ADDING TO GLOBAL STATE
                        console.log("global state after state update: ", props.notificationFrequency)           // CHECK HOW THE STATE HAS CHANGED
                      }
                    },
                  );
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
                query(
                  queryType.INSERT_MONITORING_FREQUENCY,    // CHANGE DB QUERY
                  ['admin', , , frequency,],
                  (err, res) => {
                    if (err) {
                      console.log(`INSERT_MONITORING_FREQUENCY. Error: ${err}`);
                    } else {
                      console.log(`*** Inserted ${res} into users table. ***`);
                      console.log("global state before state update: ", props.monitoringFrequency)          // CHECK HOW THE STATE HAS CHANGED
                      props.addMonitoringFrequency(frequency);                                         // ADDING TO GLOBAL STATE
                      console.log("global state after state update: ", props.monitoringFrequency)           // CHECK HOW THE STATE HAS CHANGED
                    }
                  },
                );
              }
              // }
};

  // VERIFICATION OF THE CODE TYPED IN BY USER FROM SMS
  const [formData, updateFormData] = useState("");
  const handleChange = (value) => {
    updateFormData(value);
  };

  // Verify code
  const handleSubmit = async () => {
    console.log("submitted code");

    const body = {
      code: formData,
      mobileNumber: mobileNumber,
    };

    const result = await ipcRenderer.invoke("verify-code", body);

    console.log("successfully verified code", result);

    if (result === "approved") {
      showVerificationInput = false;
      isVerified = result === "approved" ? true : false;
    } else alert("Please try verification code again");
  };

  /**
   * Checks to see if the containerId is in the array
   * @param {array} array the notification settings array (ex: memoryNotificationList)
   * @param {string} containerId the container's ID
   * @returns {number} -1 or the index of the container ID within the array
   */
  // general function to check if a container is in a notification setting list
  const isSelected = (set, containerId) => set.has(containerId);

  // INSTEAD OF CREATING A NEW STATE IN THE REDUCER CONCATENATED 2 ALREADY EXISTING STATES
  let allContainersList = props.runningList.concat(props.stoppedList)
  const renderAllContainersList = allContainersList.map((container, i) => {
  //////////////////DISCUSS BEFORE DELETING EVERYTHING FROM THE STATE  
    let isMemorySelected = isSelected(
      props.memoryNotificationList,
<<<<<<< HEAD
      container.cid
=======
      container.ID
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
    );
    let isCpuSelected = isSelected(props.cpuNotificationList, container.ID);
    let isStoppedSelected = isSelected(
      props.stoppedNotificationList,
<<<<<<< HEAD
      container.cid
=======
      container.ID
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
    );

    return (
      <TableRow key={i}>
        <TableCell>
<<<<<<< HEAD
          <span className="container-name">{container.name}</span>
        </TableCell>
        <TableCell>
          <span className="container-id">{container.cid}</span>
=======
          <span className="container-name">{container.Name}</span>
        </TableCell>
        <TableCell>
          <span className="container-id">{container.ID}</span>
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
        </TableCell>
        <TableCell>{container.img}</TableCell>
        <TableCell align="center">
          {/* <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
<<<<<<< HEAD
                    container.cid,
                    container.name,
=======
                    container.ID,
                    container.Name,
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
                    categories.MEMORY
                  )
                : handleUnCheckSetting(container.ID, categories.MEMORY)
            }
            role="checkbox"
            key={container.ID}
            checked={isMemorySelected}
          /> */}
          <TextField
                className={classes.textfield}
                id="textfield"
                label="Attribute value, %"
                helperText="* 80% is recommended"
                variant="outlined"
                value={tempMonitoringFrequency}
                  onChange={(e) => {
                    setTempMonitoringFrequency(e.target.value);
                    console.log(tempMonitoringFrequency);
                  }}
                  size="small"
              />
        </TableCell>
        <TableCell align="center">
          {/* <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
<<<<<<< HEAD
                    container.cid,
                    container.name,
=======
                    container.ID,
                    container.Name,
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
                    categories.CPU
                  )
                : handleUnCheckSetting(container.ID, categories.CPU)
            }
            role="checkbox"
            key={container.ID}
            checked={isCpuSelected}
          /> */}
                    <TextField
                className={classes.textfield}
                id="textfield"
                label="Hurdle rate, %"
                helperText="* 80% is recommended"
                variant="outlined"
                value={tempMonitoringFrequency}
                  onChange={(e) => {
                    setTempMonitoringFrequency(e.target.value);
                    console.log(tempMonitoringFrequency);
                  }}
                  size="small"
              />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
<<<<<<< HEAD
                    container.cid,
                    container.name,
=======
                    container.ID,
                    container.Name,
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
                    categories.STOPPED
                  )
                : handleUnCheckSetting(container.ID, categories.STOPPED)
            }
            role="checkbox"
            key={container.ID}
            checked={isStoppedSelected}
          />
        </TableCell>
        <TableCell align="center">
          {/* <button
            className="stop-btn"
            onClick={() =>
              props.stop(container.ID, props.stopRunningContainer)
            }
          >
            STOP
          </button> */}
                    <TextField
                className={classes.textfield}
                id="textfield"
                label="Main repository url"
                helperText="* e.g.: https://github.com/companyRepo/projectRepo"
                variant="outlined"
                value={tempMonitoringFrequency}
                  onChange={(e) => {
                    setTempMonitoringFrequency(e.target.value);
                    console.log(tempMonitoringFrequency);
                  }}
                  size="small"
              />
        </TableCell>
        <TableCell>
          <Button
            className={classes.button}
            size="medium"
            variant="contained"
            onClick={(e) => monitoringFrequency(e)}
          >
            Confirm
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  // TODO: concat runningList with stoppedList if container can have
<<<<<<< HEAD
  // const renderStoppedList = props.stoppedList.map((container, i) => {
  //   let isMemorySelected = isSelected(
  //     props.memoryNotificationList,
  //     container.cid
  //   );
  //   let isCpuSelected = isSelected(props.cpuNotificationList, container.cid);
  //   let isStoppedSelected = isSelected(
  //     props.stoppedNotificationList,
  //     container.cid
  //   );

  //   return (
  //     <TableRow key={i}>
  //       <TableCell>{container.name}</TableCell>
  //       <TableCell>{container.cid}</TableCell>
  //       <TableCell>{container.img}</TableCell>
  //       <TableCell align="center">
  //         <Checkbox
  //           onClick={(event) =>
  //             event.target.checked
  //               ? handleCheckSetting(
  //                   container.cid,
  //                   container.name,
  //                   categories.MEMORY
  //                 )
  //               : handleUnCheckSetting(container.cid, categories.MEMORY)
  //           }
  //           role="checkbox"
  //           key={container.cid}
  //           checked={isMemorySelected}
  //         />
  //       </TableCell>
  //       <TableCell align="center">
  //         <Checkbox
  //           onClick={(event) =>
  //             event.target.checked
  //               ? handleCheckSetting(
  //                   container.cid,
  //                   container.name,
  //                   categories.CPU
  //                 )
  //               : handleUnCheckSetting(container.cid, categories.CPU)
  //           }
  //           role="checkbox"
  //           key={container.cid}
  //           checked={isCpuSelected}
  //         />
  //       </TableCell>
  //       <TableCell align="center">
  //         <Checkbox
  //           onClick={(event) =>
  //             event.target.checked
  //               ? handleCheckSetting(
  //                   container.cid,
  //                   container.name,
  //                   categories.STOPPED
  //                 )
  //               : handleUnCheckSetting(container.cid, categories.STOPPED)
  //           }
  //           role="checkbox"
  //           key={container.cid}
  //           checked={isStoppedSelected}
  //         />
  //       </TableCell>
  //       <TableCell align="center">
  //         <button
  //           className="run-btn"
  //           onClick={() =>
  //             props.runStopped(container.cid, props.runStoppedContainer, props.refreshRunningContainers)
  //           }
  //         >
  //           RUN
  //         </button>
  //       </TableCell>
  //     </TableRow>
  //   );
  // });
=======
  const renderStoppedList = props.stoppedList.map((container, i) => {
    let isMemorySelected = isSelected(
      props.memoryNotificationList,
      container.ID
    );
    let isCpuSelected = isSelected(props.cpuNotificationList, container.ID);
    let isStoppedSelected = isSelected(
      props.stoppedNotificationList,
      container.ID
    );

    return (
      <TableRow key={i}>
        <TableCell>{container.Names}</TableCell>
        <TableCell>{container.ID}</TableCell>
        <TableCell>{container.Image}</TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.ID,
                    container.Names,
                    categories.MEMORY
                  )
                : handleUnCheckSetting(container.ID, categories.MEMORY)
            }
            role="checkbox"
            key={container.ID}
            checked={isMemorySelected}
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.ID,
                    container.Names,
                    categories.CPU
                  )
                : handleUnCheckSetting(container.ID, categories.CPU)
            }
            role="checkbox"
            key={container.ID}
            checked={isCpuSelected}
          />
        </TableCell>
        <TableCell align="center">
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.ID,
                    container.Names,
                    categories.STOPPED
                  )
                : handleUnCheckSetting(container.ID, categories.STOPPED)
            }
            role="checkbox"
            key={container.ID}
            checked={isStoppedSelected}
          />
        </TableCell>
        <TableCell align="center">
          <button
            className="run-btn"
            onClick={() =>
              props.runStopped(container.ID, props.runStoppedContainer, props.refreshRunningContainers)
            }
          >
            RUN
          </button>
        </TableCell>
      </TableRow>
    );
  });
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Settings</h1>
      </div>
<<<<<<< HEAD
      
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
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                    console.log(mobileNumber);
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
=======

      <div className="metric-section-title">
        <h3>Account</h3>
      </div>

      <div className="settings-container">
        <form className={classes.root} autoComplete="off">
          <div>
            <TextField
              required
              id="phone-number"
              label="Phone Number"
              helperText="* use country code (+1)"
              variant="outlined"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
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
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
          <form className={classes.root} autoComplete="off">
            <div className="verification-code">
              <TextField
                required
                id="verification-code"
                label="Verification code"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
                size="small"
              />
              <Button
                className={classes.button}
                size="medium"
<<<<<<< HEAD
                color="default"
=======
                color="primary"
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c
                variant="contained"
                onClick={handleSubmit}
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </div>
          </form>
        ) : null}
<<<<<<< HEAD
            
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
          <p>1. Add GitHub repositories url in Containers settingss table below</p>
      </div>


      <div className="metric-section-title">
        <h3> Containers setting table</h3>
        <p></p>
      </div>

      <div className="settings-container">
        <div id="description" className={classes.description}>
        </div>
=======
      </div>

      <div className="metric-section-title">
        <h3> Notifications</h3>
        <p>
          Allows you to define alert conditions and receive text notifications
          when your containers meet a condition
        </p>
      </div>

      <div className="settings-container">
        <div id="description" className={classes.description}></div>
>>>>>>> e64a55f1dfb276b379a14ee14c01de108e50f32c

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Container Name</TableCell>
                <TableCell>Container ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="center">Memory exceeds attribute value</TableCell>
                <TableCell align="center">CPU exceeds attribute value</TableCell>
                <TableCell align="center">Container Stops</TableCell>
                <TableCell align="center">GitHub repository url</TableCell>
                <TableCell align="center">Apply settings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderAllContainersList}
              {/* {renderRunningList} */}
              {/* {renderStoppedList} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};


export default connect(null, mapDispatchToProps)(Settings);
