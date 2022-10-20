/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/actions';
import PropTypes from 'prop-types';
import * as categories from '../../redux/constants/notificationCategories';
// import query from '../../../server/models/psqlQuery';
// import * as queryType from '../../redux/constants/queryTypes';

// React Component Imports
import AccountDisplay from '../display/AccountDisplay';

// Material UI Imports
// import { makeStyles } from '@mui/material/styles';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import SendIcon from '@mui/icons-material/Send';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const mapDispatchToProps = (dispatch) => ({
  addPhoneNumber: (data) => dispatch(actions.addPhoneNumber(data)),
  addNotificationFrequency: (data) =>
    dispatch(actions.addNotificationFrequency(data)),
  addMonitoringFrequency: (data) =>
    dispatch(actions.addMonitoringFrequency(data)),
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
    dispatch(actions.removeStoppedNotificationSetting(data))
});

// const theme = createTheme({
//   root: {
//     '& .MuiTextField-root': {
//       marginLeft: 5,
//       marginBottom: 15,
//       width: 220,
//       verticalAlign: 'middle'
//     }
//   },
//   button: {
//     '& > *': {
//       pointerEvents: 'none'
//     },
//     marginLeft: 5,
//     width: 100,
//     verticalAlign: 'top'
//   },
//   verifiedIcon: {
//     verticalAlign: 'top',
//     color: 'green'
//   },
//   description: {
//     marginLeft: 5,
//     marginBottom: 30
//   }
// });

// showVerificationInput IS USED FOR RENDERING THE VERIFICATION CODE COMPONENT
let showVerificationInput = false;
let isVerified = false;

const Settings = (props) => {
  const [mobileNumber, setMobileNumber] = useState('');

  // Similar to TypeScript, we can use propTypes to explicit declare a type for a prop. This enables type checking and allows for catching of bugs.
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  Settings.propTypes = {
    addMonitoringFrequency: PropTypes.func.isRequired,
    addMemoryNotificationSetting: PropTypes.func.isRequired,
    addCpuNotificationSetting: PropTypes.func.isRequired,
    addStoppedNotificationSetting: PropTypes.func.isRequired,
    addPhoneNumber: PropTypes.func.isRequired,
    addNotificationFrequency: PropTypes.func.isRequired,
    runningList: PropTypes.array.isRequired,
    stoppedList: PropTypes.array.isRequired,
    memoryNotificationList: PropTypes.object.isRequired,
    cpuNotificationList: PropTypes.object.isRequired,
    stoppedNotificationList: PropTypes.object.isRequired
  };

  // handle check
  // insert all container information performs two database calls on the backend
  const handleCheckSetting = (containerId, containerName, metricName) => {
    fetch('http://localhost:3000/settings/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        container: containerId,
        name: containerName,
        metric: metricName.toLowerCase()
      })
    })
    .then((data) => data.json())
    .then((response) => {
      fetchNotificationSettings();
      console.log('Insert container and settings completed: ', response)
    })
    .catch((err) => {
      console.log(err);
    })
  };

  // handle uncheck
  // remove container/metric from DB
  const handleUnCheckSetting = (containerId, metricName) => {
    fetch('http://localhost:3000/settings/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        container: containerId,
        metric: metricName.toLowerCase()
      })
    })
    .then((data) => data.json())
    .then((response) => {
      fetchNotificationSettings();
      console.log('Delete container settings completed: ', response)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  /**
   * @title NOTIFICATION PREFERENCES
   */

  //updates state as to which boxes are checked
  const fetchNotificationSettings = async () => {
    fetch('http://localhost:3000/settings/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((data) => data.json())
    .then((response) => {
      props.addMemoryNotificationSetting(response.memory);
      props.addCpuNotificationSetting(response.cpu);
      props.addStoppedNotificationSetting(response.stopped);
    })
  }

  /**
   * @title COMMUNICATION
   */

  const verifyMobileNumber = async () => {
    await window.nodeMethod.rendInvoke('verify-number', mobileNumber);
  };

  // fetch on component mount only because of empty dependency array
  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  /**
   * alerts if phone not entered on Test click
   */

  const handlePhoneNumberSubmit = () => {
    if(!mobileNumber) alert('Please enter phone number');
    else {
      if (isNaN(Number(mobileNumber)))
        alert('Please enter phone number in numerical format. ex: 123456789');
      else {
        alert(`Phone: ${mobileNumber} is valid`);
        fetch('http://localhost:3000/settings/phone', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            admin: 'admin',
            number: mobileNumber,
            digits: [5, 2]
          })
        })
        .then((data) => data.json())
        .then((response) => {
          console.log(`Inserted ${response} into users table.`)
          props.addPhoneNumber(mobileNumber)
          showVerificationInput = true;
          verifyMobileNumber();
        })
        .catch((err) => {
          console.log('handlePhoneNumberSubmit: ', err);
        })
      }
    }
  }

  // SAVING USER INPUTS: NOTIFICATION AND MEMORY CYCLE
  // 1. GET DATA FROM THE FORM
  // 2. MAKE SURE THAT IT HAS THE RIGHT FORMAT
  // 3. SEND IT TO DATABASE
  // 4. THEN UPDATE THE STATE
  const [tempNotifFreq, setTempNotifFreq] = useState('');

  const notificationFrequency = () => {
    let frequency = 5;
    if (isNaN(Number(tempNotifFreq)))
      alert('Please enter notification frequency in numerical format. ex: 15');
    else {
      if (tempNotifFreq) frequency = tempNotifFreq;
      fetch('http://localhost:3000/settings/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 'admin',
          phoneNumber: undefined,
          notification: frequency, 
          monitoring: undefined
        })
      })
      .then((data) => data.json())
      .then((response) => {
        console.log(`Inserted ${frequency} minutes into users table.`);
        props.addNotificationFrequency(frequency);
      })
      .catch((err) => {
        console.log('NoficationFrequency: ', err);
      })
    }
  }

  const [tempMonitoringFrequency, setTempMonitoringFrequency] = useState('');

  const monitoringFrequency = () => {
    let frequency = 2;
    if (isNaN(Number(tempMonitoringFrequency)))
      alert('Please enter monitoring frequency in numerical format. ex: 15');
    else {
      if (tempMonitoringFrequency) frequency = tempMonitoringFrequency;
      fetch('http://localhost:3000/settings/monitoring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 'admin',
          phoneNumber: undefined,
          notification: undefined, 
          monitoring: frequency
        })
      })
      .then((data) => data.json())
      .then((response) => {
        console.log(`Inserted ${frequency} minutes into users table.`)
        props.addMonitoringFrequency(frequency)
      })
      .catch((err) => {
        console.log('MonitoringFrequency: ', err);
      })
    }
  }

  // VERIFICATION OF THE CODE TYPED IN BY USER FROM SMS
  const [formData, updateFormData] = useState('');
  const handleChange = (value) => {
    updateFormData(value);
  };

  // Verify code
  const handleSubmit = async () => {
    const body = {
      code: formData,
      mobileNumber: mobileNumber
    };

    const result = await window.nodeMethod.rendInvoke('verify-code', body);
    console.log('RESULT: ', result);
    if (result === 'approved') {
      showVerificationInput = false;
      isVerified = result === 'approved' ? true : false;
    } else alert('Please try verification code again');
  };

  /**
   * Checks to see if the containerId is in the array
   * @param {array} array the notification settings array (ex: memoryNotificationList)
   * @param {string} containerId the container's ID
   * @returns {number} -1 or the index of the container ID within the array
   */
  // general function to check if a container is in a notification setting list
  const isSelected = (set, containerId) => set.has(containerId);

  const allContainersList = props.runningList.concat(props.stoppedList); // INSTEAD OF CREATING A NEW STATE IN THE REDUCER CONCATENATED 2 ALREADY EXISTING STATES

  // GITHUB URL FORM
  // 1. CREATE AN OBJECT STATE WITH LIST OF CONTAINERS AS KEYS AND EMPTY ARRAYS AS VALUES
  const stateObject = {};
  allContainersList.forEach((el) => {
    if (!stateObject[el.ID]) stateObject[el.ID] = '';
  });

  //!Not sure if this area is even needed. Looks like they abandoned it for the function below(githubLink);
  // 2. MAKE A DB REQUEST TO GET EXISTING DATA ABOUT GITHUB URL LINKS AND UPDATE THE STATE WITH THIS INFORMATION
  const getData = () => {
    fetch('http://localhost:3000/settings/gitcontainers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((data) => data.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    // return query(queryType.GET_CONTAINERS, []);
  };
  //! updateState is not being called anywhere...so not really sure if this is actually happening.
  const updateState = async () => {
    const output = await getData();
    output.forEach((el) => {
      stateObject[el.id] = el.github_url;
    });
  };
  
  const [tempGithubLink, setTempGithubLink] = useState(stateObject);

  const githubLink = (event) => {
    if (!tempGithubLink)
      alert('Please provide a link in accordance with provided example');
    if (!event.target.id) alert('Please provide a container ID');
    else {
      const github_url = tempGithubLink[event.target.id];
      fetch('http://localhost:3000/settings/gitLinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: event.target.id,
          name: event.target.name,
          url: github_url
        })
      })
      .then((data) => data.json())
      .then((response) => {
        console.log('githubLink: ', response);
        return response;
      })
      .catch((err) => {
        console.log('githubLink: ', err);
      })
    }
  }

  // Redux: Map state to props
  const _id = useSelector((state) => state.session._id);
  const mem_threshold = useSelector((state) => state.session.mem_threshold);
  const cpu_threshold = useSelector((state) => state.session.cpu_threshold);
  const container_stops = useSelector((state) => state.session.container_stops);
  const contact_pref = useSelector((state) => state.session.contact_pref);
  const phone = useSelector((state) => state.session.phone);

  // Local state variables to hold cpuThreshold, memThreshold, stoppedContainers, however should move to Redux session state variables
  const [cpuThreshold, setCpuThreshold] = useState(cpu_threshold);
  const [memThreshold, setMemThreshold] = useState(mem_threshold);
  const [stoppedContainers, setStoppedContainers] = useState(container_stops);
  const [value, setValue] = useState(contact_pref);

  const dispatch = useDispatch();
  const updateUser = (userInfo) => dispatch(actions.updateUser(userInfo));

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleRadioSubmit = (value) => {
    fetch('http://localhost:3000/account/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        contact_pref: value
      })
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

  const handleCpuChange = (event) => {
    setCpuThreshold(document.getElementById('cpu-threshold-input').value);
  };

  const handleCpuSubmit = (value) => {
    fetch('http://localhost:3000/account/cpu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        cpu_threshold: value
      })
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

  const handleMemSubmit = (value) => {
    fetch('http://localhost:3000/account/memory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        mem_threshold: value
      })
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

  const handleStoppedContainersSubmit = (value) => {
    fetch('http://localhost:3000/account/stops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        container_stops: value
      })
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

  const handleMemChange = (event) => {
    setMemThreshold(document.getElementById('mem-threshold-input').value);
  };

  const handleStoppedContainersChange = (event) => {
    setStoppedContainers(
      document.getElementById('stopped-containers-input').checked
    );
  };

  const renderAllContainersList = allContainersList.map((container, i) => {
    const isMemorySelected = isSelected(
      props.memoryNotificationList,
      container.ID
    );
    const isCpuSelected = isSelected(props.cpuNotificationList, container.ID);
    const isStoppedSelected = isSelected(
      props.stoppedNotificationList,
      container.ID
    );

    return (
      <TableRow key={i} id='settings-row'>
        <TableCell>
          <span className='container-name'>
            {container.Names ? container.Names : container.Name}
            {/* Stopped containers have a .Names key. Running containers have a .Name key */}
          </span>
        </TableCell>
        <TableCell>
          <span className='container-id'>{container.ID}</span>
        </TableCell>
        <TableCell>{container.Image}</TableCell>
        <TableCell align='center'>
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.ID,
                    container.Name,
                    categories.MEMORY
                  )
                : handleUnCheckSetting(container.ID, categories.MEMORY)
            }
            role='checkbox'
            key={container.ID}
            checked={isMemorySelected}
          />
        </TableCell>
        <TableCell align='center'>
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.ID,
                    container.Name,
                    categories.CPU
                  )
                : handleUnCheckSetting(container.ID, categories.CPU)
            }
            role='checkbox'
            key={container.ID}
            checked={isCpuSelected}
          />
        </TableCell>
        <TableCell align='center'>
          <Checkbox
            onClick={(event) =>
              event.target.checked
                ? handleCheckSetting(
                    container.ID,
                    container.Names ? container.Names : container.Name, // Stopped containers have a .Names key. Running containers have a .Name key
                    categories.STOPPED
                  )
                : handleUnCheckSetting(container.ID, categories.STOPPED)
            }
            role='checkbox'
            key={container.ID}
            checked={isStoppedSelected}
          />
        </TableCell>
        <TableCell align='center'>
          <TextField
            // className={classes.textfield}
            // theme={root}
            id='textfield'
            label='Main repository url'
            helperText='* e.g.: https://api.github.com/repos/oslabs-beta/Docketeer/commits?'
            variant='outlined'
            value={tempGithubLink[container.ID]}
            onChange={(e) => {
              stateObject[container.ID] = e.target.value;
              setTempGithubLink(stateObject);
            }}
            size='small'
          />
        </TableCell>
        <TableCell>
          <Button
            // className={classes.button}
            size='medium'
            variant='contained'
            name={container.Names ? container.Names : container.Name}
            id={container.ID}
            //!need to reset the field when button is clicked
            onClick={(e) => githubLink(e)}
          >
            Confirm
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div className='renderContainers'>
      <div className='header'>
        <h1 className='tabTitle'>Settings</h1>
      </div>

      {/* Account Display */}
      <AccountDisplay />

      <div className='metric-section-title'>
        <h3>Communication</h3>
      </div>
      <div className='settings-container'>
        <p>
          Allows you to (i) connect a mobile phone to your account, and (ii)
          choose your preferred method of communication.
        </p>
        <br />
        <p>1. Verify your mobile phone number on Twilio</p>
        <br />
        {/* First Form */}
        <form
          // className={classes.root}
          theme={root}
          autoComplete='off'
        >
          <div>
            <TextField
              required
              id='textfield'
              label={phone}
              helperText='* use country code (+1)'
              variant='outlined'
              onChange={(e) => {
                setMobileNumber(e.target.value);
                isVerified = false;
              }}
              size='small'
            />
            {!isVerified ? (
              <Button
                // className={classes.button}
                size='medium'
                variant='contained'
                onClick={(e) => handlePhoneNumberSubmit(e)}
                endIcon={<SendIcon />}
              >
                Verify
              </Button>
            ) : (
              <CheckCircleIcon
                fontSize='large'
                // className={classes.verifiedIcon}
              />
            )}
          </div>
        </form>

        {/* Verification Input */}
        {showVerificationInput ? (
          <form
            // className={classes.root}
            autoComplete='off'
          >
            <div className='verification-code'>
              <TextField
                required
                id='verification-code'
                label='Verification code'
                variant='outlined'
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
                size='small'
              />
              <Button
                // className={classes.button}
                size='medium'
                // color='secondary'
                variant='contained'
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
        <FormControl component='fieldset'>
          <RadioGroup
            aria-label='Contact Preferences'
            name='contact_pref'
            value={value}
            onChange={handleRadioChange}
          >
            <FormControlLabel value='email' control={<Radio />} label='Email' />
            <FormControlLabel value='phone' control={<Radio />} label='Phone' />
          </RadioGroup>
          <br />
          <Button
            // className={classes.button}
            size='medium'
            variant='contained'
            name='submit-contact-pref'
            id='submit-contact-pref'
            onClick={() => handleRadioSubmit(value)}
          >
            Submit
          </Button>
        </FormControl>
      </div>

      <div className='metric-section-title'>
        <h3>Notification preferences</h3>
      </div>
      <div className='settings-container'>
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
          <form
            // className={classes.root}
            autoComplete='off'
          >
            <TextField
              id='textfield'
              label='Notification frequency, min'
              helperText='* 5 min is recommended'
              variant='outlined'
              value={tempNotifFreq}
              onChange={(e) => {
                setTempNotifFreq(e.target.value);
              }}
              size='small'
            />
            <Button
              // className={classes.button}
              size='medium'
              variant='contained'
              onClick={(e) => notificationFrequency(e)}
            >
              Confirm
            </Button>
          </form>
        </div>

        <div>
          <form
            // className={classes.root}
            autoComplete='off'
          >
            <TextField
              // className={classes.textfield}
              id='textfield'
              label='Monitoring frequency, min'
              helperText='* 2 min is recommended'
              variant='outlined'
              value={tempMonitoringFrequency}
              onChange={(e) => {
                setTempMonitoringFrequency(e.target.value);
              }}
              size='small'
            />
            <Button
              // className={classes.button}
              size='medium'
              variant='contained'
              onClick={(e) => monitoringFrequency(e)}
            >
              Confirm
            </Button>
          </form>
        </div>

        <br />
        <p>2. Configure notification thresholds</p>
        <br />
        <form
          // className={classes.root}
          autoComplete='off'
        >
          Current CPU Threshold: {`>${cpu_threshold}%`}
          <div>
            <TextField
              required
              id='cpu-threshold-input'
              label='CPU Threshold'
              helperText='* 80% CPU usage recommended'
              variant='outlined'
              // value="80" set this later
              onChange={handleCpuChange}
              placeholder={`${cpu_threshold}`}
              size='small'
            />
            <Button
              // className={classes.button}
              size='medium'
              variant='contained'
              onClick={() => handleCpuSubmit(cpuThreshold)}
            >
              Confirm
            </Button>
            <br />
            Current Memory Threshold: {`>${mem_threshold}%`}
            <br />
            <TextField
              required
              id='mem-threshold-input'
              label='Memory Threshold'
              helperText='* 80% memory recommended'
              variant='outlined'
              onChange={handleMemChange}
              placeholder={`${mem_threshold}`}
              // value="80" set this later
              size='small'
            />
            <Button
              // className={classes.button}
              size='medium'
              variant='contained'
              onClick={() => handleMemSubmit(memThreshold)}
            >
              Confirm
            </Button>
            <br />
            <p>2. Receive notification if container stops</p>
            <FormControlLabel value={true} control={<Checkbox />} label='' />
            <br />
            <br />
            <p>3. Stopped containers:</p>
            <FormControlLabel
              value={true}
              control={
                <Checkbox
                  id='stopped-containers-input'
                  onChange={handleStoppedContainersChange}
                />
              }
              label='Receive notification when a container stops'
            />
          </div>
          <Button
            // className={classes.button}
            size='medium'
            variant='contained'
            onClick={() => handleStoppedContainersSubmit(stoppedContainers)}
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </form>
      </div>

      <div className='metric-section-title'>
        <h3>GitHub commits</h3>
      </div>
      <div className='settings-container'>
        <p>
          Allows you to get access to latest GitHub commits in your project
          repository on "Metrics" tab for selected containers
        </p>
        <br />
        <p>1. Add GitHub repositories url in Containers settings table below</p>
      </div>

      <div className='metric-section-title'>
        <h3> Containers setting table</h3>
        <p></p>
      </div>

      <div className='settings-container'>
        <div
          id='description'
          // className={classes.description}
        ></div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Container Name</TableCell>
                <TableCell>Container ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align='center'>
                  Memory {`>${mem_threshold}%`}
                </TableCell>
                <TableCell align='center'>CPU {`>${cpu_threshold}%`}</TableCell>
                <TableCell align='center'>Container Stops</TableCell>
                <TableCell align='center'>GitHub repository url</TableCell>
                <TableCell align='center'>Apply settings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderAllContainersList}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Settings);
