/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/reducers/hooks";

import useSurvey from "../helper/dispatch";
import * as categories from "../../redux/constants/notificationCategories";

import { WindowType, StateType } from "../../../types";

// React Component Imports
import AccountDisplay from "../display/AccountDisplay";

// Material UI Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// showVerificationInput is used for rendering the verification code component
let showVerificationInput = false;
let isVerified = false;

const Settings = () => {
  // Component local state (i.e. useState)
  // const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");

  const {
    addPhoneNumber,
    addMemoryNotification,
    addCpuNotification,
    addStopNotification,
  } = useSurvey();

  // State from store
  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );

  const {
    memoryNotificationList,
    cpuNotificationList,
    stoppedNotificationList,
  } = useAppSelector((state) => state.notifications);

  // Handle check - insert all container information + performs two database calls on the backend
  const handleCheckSetting = (
    containerId: string,
    containerName: string,
    metricName: string
  ) => {
    fetch("http://localhost:3000/settings/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        container: containerId,
        name: containerName,
        metric: metricName.toLowerCase(),
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        fetchNotificationSettings();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handle uncheck
  // remove container/metric from DB
  const handleUnCheckSetting = (containerId: string, metricName: string) => {
    fetch("http://localhost:3000/settings/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        container: containerId,
        metric: metricName.toLowerCase(),
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        fetchNotificationSettings();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * @title NOTIFICATION PREFERENCES
   */

  // updates state as to which boxes are checked
  const fetchNotificationSettings = async () => {
    fetch("http://localhost:3000/settings/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => {
        addMemoryNotification(response.memory);
        addCpuNotification(response.cpu);
        addStopNotification(response.stopped);
      });
  };

  /**
   * @title COMMUNICATION
   */
  // have to declare window for TypeScript compatibility
  let window: WindowType;

  const verifyMobileNumber = async () => {
    await window.nodeMethod.rendInvoke("verify-number", mobileNumber);
  };

  // fetch on component mount only because of empty dependency array
  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  /**
   * alerts if phone not entered on Test click
   */
  const handlePhoneNumberSubmit = () => {
    if (!mobileNumber) alert("Please enter phone number");
    else {
      if (isNaN(Number(mobileNumber)))
        alert("Please enter phone number in numerical format. ex: 123456789");
      else {
        alert(`Phone: ${mobileNumber} is valid`);
        fetch("http://localhost:3000/settings/phone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin: "admin",
            number: mobileNumber,
            digits: [5, 2],
          }),
        })
          .then((data) => data.json())
          .then((response) => {
            addPhoneNumber(mobileNumber);
            showVerificationInput = true;
            verifyMobileNumber();
            const field = document.getElementById("textfield");
            if (field) (field as HTMLInputElement).value = "";
          })
          .catch((err) => {
            console.log("handlePhoneNumberSubmit: ", err);
          });
      }
    }
  };

  // Saving User Inputs — Notification & Memory Cycle
  // 1. Get data from the form
  // 2. Make sure that it has the right format
  // 3. Send it to database
  // 4. Then update the state
  const [tempNotifFreq, setTempNotifFreq] = useState("");

  const notificationFrequency = () => {
    let frequency: string | number = 5;
    if (isNaN(Number(tempNotifFreq)))
      alert("Please enter notification frequency in numerical format. ex: 15");
    else {
      if (tempNotifFreq) frequency = tempNotifFreq;
      fetch("http://localhost:3000/settings/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "admin",
          phoneNumber: undefined,
          notification: frequency,
          monitoring: undefined,
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          // This is not setup at all. The backend endpoint exists for settings/notification
          // The users table in our database does have a notification frequency attribute that can be updated
          // Disabling for now but we should discuss what this is at a high-level so we can implement the feature as it is intended
          console.log("response", response);
          // addNotificationFrequency(frequency);
          setTempNotifFreq("");
        })
        .catch((err) => {
          console.log("NoficationFrequency: ", err);
        });
    }
  };

  const [tempMonitoringFrequency, setTempMonitoringFrequency] = useState("");

  const monitoringFrequency = () => {
    let frequency: string | number = 2;
    if (isNaN(Number(tempMonitoringFrequency)))
      alert("Please enter monitoring frequency in numerical format. ex: 15");
    else {
      if (tempMonitoringFrequency) frequency = tempMonitoringFrequency;
      fetch("http://localhost:3000/settings/monitoring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "admin",
          phoneNumber: undefined,
          notification: undefined,
          monitoring: frequency,
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          // This is not setup at all. The backend endpoint exists for settings/notification
          // The users table in our database does have a notification frequency attribute that can be updated
          // Disabling for now but we should discuss what this is at a high-level so we can implement the feature as it is intended
          console.log("response", response);
          // addMonitoringFrequency(frequency);
          setTempMonitoringFrequency("");
        })
        .catch((err) => {
          console.log("MonitoringFrequency: ", err);
        });
    }
  };

  // Verification of the user-typed code (provided to use through SMS for secondary authentication)
  const [formData, updateFormData] = useState("");
  const handleChange = (value: string) => {
    updateFormData(value);
  };

  const handleSubmit = async () => {
    const body = {
      code: formData,
      mobileNumber: mobileNumber,
    };

    const result = await window.nodeMethod.rendInvoke("verify-code", body);

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

  // General function to check if a container is within a notification setting list
  // The `any` TypeScript type was used as a result of predicted continiously changing parameters
  const isSelected = (set: any, containerId: string) => set.has(containerId);

  // Concat two existing states (as opposed to creating new state in the reducer)
  const allContainersList = runningList.concat(stoppedList);

  // GitHub URL Form

  // `stateObject` will contain a list of containers (as keys) and empty arrays as values
  const stateObject = {};
  allContainersList.forEach((el) => {
    if (!stateObject[el.ID as keyof typeof tempGithubLink])
      (stateObject as Record<typeof el.ID, typeof el.ID>)[el.ID] = "";
  });

  // 2. MAKE A DB REQUEST TO GET EXISTING DATA ABOUT GITHUB URL LINKS AND UPDATE THE STATE WITH THIS INFORMATION
  const getData = () => {
    fetch("http://localhost:3000/settings/gitcontainers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        return response;
      });
  };

  const [tempGithubLink, setTempGithubLink] = useState(stateObject);

  // Check if `githubLinks` are in the correct format, then, save them to database
  const githubLink = (event: any) => {
    const example = "https://api.github.com";
    if (
      !tempGithubLink[event.target.id as keyof typeof tempGithubLink] ||
      (
        tempGithubLink as Record<typeof event.target.id, typeof event.target.id>
      )[event.target.id].slice(0, 22) != example
    )
      return alert(
        "Please provide a link in accordance with provided example."
      );
    if (!event.target.id) return alert("Please provide a container ID.");
    else {
      const github_url =
        tempGithubLink[event.target.id as keyof typeof tempGithubLink];
      fetch("http://localhost:3000/settings/gitLinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: event.target.id,
          name: event.target.name,
          url: github_url,
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          const field = document.getElementById("gittext");
          if (field) (field as HTMLInputElement).value = "";
          return response;
        })
        .catch((err) => {
          console.log("githubLink: ", err);
        });
    }
  };

  const {
    mem_threshold,
    cpu_threshold,
    container_stops,
    contact_pref,
    phone,
    _id,
  } = useAppSelector((state) => state.sessions);

  // Local state variables to hold cpuThreshold, memThreshold, stoppedContainers, however should move to Redux session state variables
  const [cpuThreshold, setCpuThreshold] = useState("");
  const [memThreshold, setMemThreshold] = useState("");
  const [stoppedContainers, setStoppedContainers] = useState(container_stops);
  const [value, setValue] = useState(contact_pref);
  const { updateUser } = useSurvey();

  // const updateUser = (userInfo: UserInfo) =>
  //   dispatch(actions.updateUser(userInfo));

  const handleRadioChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleRadioSubmit = (value: string) => {
    fetch("http://localhost:3000/account/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        contact_pref: value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCpuChange = () => {
    const field = document.getElementById("cpu-threshold-input");
    if (field) setCpuThreshold((field as HTMLInputElement).value);
  };

  const handleCpuSubmit = (value: string) => {
    fetch("http://localhost:3000/account/cpu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        cpu_threshold: value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateUser(data);
        setCpuThreshold("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMemSubmit = (value: string) => {
    fetch("http://localhost:3000/account/memory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        mem_threshold: value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateUser(data);
        setMemThreshold("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStoppedContainersSubmit = (value: string) => {
    fetch("http://localhost:3000/account/stops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        container_stops: value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMemChange = () => {
    const field = document.getElementById("mem-threshold-input");
    if (field) setMemThreshold((field as HTMLInputElement).value);
  };

  const handleStoppedContainersChange = () => {
    const ele = document.getElementById("stopped-containers-input");
    // if (ele) setStoppedContainers((ele as HTMLInputElement).checked);
    if (ele) setStoppedContainers((ele as HTMLInputElement).value);
  };

  const renderAllContainersList = allContainersList.map(
    (container: any, i: number) => {
      const isMemorySelected = isSelected(memoryNotificationList, container.ID);
      const isCpuSelected = isSelected(cpuNotificationList, container.ID);
      const isStoppedSelected = isSelected(
        stoppedNotificationList,
        container.ID
      );

      return (
        <TableRow key={i} id="settings-row">
          <TableCell>
            <span className="container-name">
              {container.Names ? container.Names : container.Name}
              {/* Stopped containers have a .Names key. Running containers have a .Name key */}
            </span>
          </TableCell>
          <TableCell>
            <span className="container-id">{container.ID}</span>
          </TableCell>
          <TableCell align="center">
            <Checkbox
              onClick={(event: any) =>
                event.target.checked
                  ? handleCheckSetting(
                      container.ID,
                      container.Name,
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
              onClick={(event: any) =>
                event.target.checked
                  ? handleCheckSetting(
                      container.ID,
                      container.Name,
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
              onClick={(event: any) =>
                event.target.checked
                  ? handleCheckSetting(
                      container.ID,
                      container.Names ? container.Names : container.Name, // Stopped containers have a .Names key. Running containers have a .Name key
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
            <TextField
              sx={{
                ml: 5,
                mb: 15,
                width: 220,
              }}
              id="gittext"
              label="Main repository url"
              helperText="* e.g.: https://api.github.com/repos/oslabs-beta/Docketeer/commits?"
              variant="outlined"
              onChange={(e) => {
                (
                  stateObject as Record<
                    typeof container.ID,
                    typeof container.ID
                  >
                )[container.ID] = e.target.value;
                setTempGithubLink(stateObject);
              }}
              size="small"
            />
          </TableCell>
          <TableCell>
            <Button
              sx={{
                ml: 1,
                width: 100,
              }}
              size="medium"
              variant="contained"
              name={container.Names ? container.Names : container.Name}
              id={container.ID}
              onClick={(e) => githubLink(e)}
            >
              Confirm
            </Button>
          </TableCell>
        </TableRow>
      );
    }
  );

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Settings</h1>
      </div>

      {/* Account Display */}
      <AccountDisplay />

      <div className="metric-section-title">
        <h3>Communication</h3>
      </div>
      <div className="settings-container">
        <p>
          Allows you to (i) connect a mobile phone to your account, and (ii)
          choose your preferred method of communication.
        </p>
        <br />
        <p>1. Verify your mobile phone number on Twilio</p>
        <br />
        {/* First Form */}
        <form className="settingsForm" autoComplete="off">
          <div>
            <TextField
              required
              id="textfield"
              label={phone}
              helperText="* use country code (+1)"
              variant="outlined"
              onChange={(e) => {
                setMobileNumber(e.target.value);
                isVerified = false;
              }}
              size="small"
            />
            {!isVerified ? (
              <Button
                sx={{
                  ml: 1,
                  width: 100,
                }}
                size="medium"
                variant="contained"
                onClick={() => handlePhoneNumberSubmit()}
                endIcon={<SendIcon />}
              >
                Verify
              </Button>
            ) : (
              <CheckCircleIcon fontSize="large" />
            )}
          </div>
        </form>

        {/* Verification Input */}
        {showVerificationInput ? (
          <form className="settingsForm" autoComplete="off">
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
                sx={{
                  ml: 1,
                  width: 100,
                }}
                size="medium"
                variant="contained"
                onClick={handleSubmit}
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </div>
          </form>
        ) : null}

        <p>2. Contact preference:</p>
        <br />
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="Contact Preferences"
            name="contact_pref"
            value={value}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="phone" control={<Radio />} label="Phone" />
          </RadioGroup>
          <br />
          <Button
            sx={{
              ml: 1,
              width: 100,
            }}
            size="medium"
            variant="contained"
            name="submit-contact-pref"
            id="submit-contact-pref"
            onClick={() => handleRadioSubmit(value)}
          >
            Submit
          </Button>
        </FormControl>
      </div>

      <div className="metric-section-title">
        <h3>Notification preferences</h3>
      </div>
      <div className="settings-container">
        <p>
          Allows you to (i) customize monitoring and notification frequency, and
          (ii) define container conditions that will trigger notifications. When
          a container hits a threshold, an alert is sent via your preferred
          method of communication. Recommended values will be used by default.
        </p>

        <br />
        <p>1. Setup / update notification criteria</p>
        <br />
        <div>
          <form className="settingsForm" autoComplete="off">
            <TextField
              id="freqtext"
              label="Notification frequency, min"
              helperText="* 5 min is recommended"
              variant="outlined"
              value={tempNotifFreq}
              onChange={(e) => {
                setTempNotifFreq(e.target.value);
              }}
              size="small"
            />
            <Button
              sx={{
                ml: 1,
                width: 100,
              }}
              size="medium"
              variant="contained"
              onClick={() => notificationFrequency()}
            >
              Confirm
            </Button>
          </form>
        </div>

        <div>
          <form className="settingsForm" autoComplete="off">
            <TextField
              id="monitortext"
              label="Monitoring frequency, min"
              helperText="* 2 min is recommended"
              variant="outlined"
              value={tempMonitoringFrequency}
              onChange={(e) => {
                setTempMonitoringFrequency(e.target.value);
              }}
              size="small"
            />
            <Button
              sx={{
                ml: 1,
                width: 100,
              }}
              size="medium"
              variant="contained"
              onClick={() => monitoringFrequency()}
            >
              Confirm
            </Button>
          </form>
        </div>

        <br />
        <p>2. Configure notification thresholds</p>
        <br />
        <form autoComplete="off">
          Current CPU Threshold: {`>${cpu_threshold}%`}
          <div>
            <TextField
              required
              id="cpu-threshold-input"
              label="CPU Threshold"
              helperText="* 80% CPU usage recommended"
              variant="outlined"
              value={cpuThreshold}
              onChange={handleCpuChange}
              size="small"
            />
            <Button
              sx={{
                ml: 1,
                width: 100,
              }}
              size="medium"
              variant="contained"
              onClick={() => handleCpuSubmit(cpuThreshold)}
            >
              Confirm
            </Button>
            <br />
            Current Memory Threshold: {`>${mem_threshold}%`}
            <br />
            <TextField
              required
              id="mem-threshold-input"
              label="Memory Threshold"
              helperText="* 80% memory recommended"
              variant="outlined"
              value={memThreshold}
              onChange={handleMemChange}
              size="small"
            />
            <Button
              sx={{
                ml: 1,
                width: 100,
              }}
              size="medium"
              variant="contained"
              onClick={() => handleMemSubmit(memThreshold)}
            >
              Confirm
            </Button>
            <br />
            <br />
            <p>3. Stopped containers:</p>
            <FormControlLabel
              value={true}
              control={
                <Checkbox
                  id="stopped-containers-input"
                  onChange={handleStoppedContainersChange}
                />
              }
              label="Receive notification when a container stops"
            />
          </div>
          <Button
            sx={{
              ml: 1,
              width: 100,
            }}
            size="medium"
            variant="contained"
            onClick={() => handleStoppedContainersSubmit(stoppedContainers)}
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </form>
      </div>

      <div className="metric-section-title">
        <h3>GitHub commits</h3>
      </div>
      <div className="settings-container">
        <p>
          Allows you to get access to latest GitHub commits in your project
          repository on "Metrics" tab for selected containers
        </p>
      </div>

      <div className="metric-section-title">
        <h3> Containers setting table</h3>
        <p></p>
      </div>

      <div className="settings-container">
        <div id="description" className="settingsDescription"></div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Container Name</TableCell>
                <TableCell>Container ID</TableCell>
                <TableCell align="center">
                  Memory {`>${mem_threshold}%`}
                </TableCell>
                <TableCell align="center">CPU {`>${cpu_threshold}%`}</TableCell>
                <TableCell align="center">Container Stops</TableCell>
                <TableCell align="center">GitHub repository url</TableCell>
                <TableCell align="center">Apply settings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderAllContainersList}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Settings;
