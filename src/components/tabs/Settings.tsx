/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/reducers/hooks';

import useSurvey from '../helper/dispatch';
import * as categories from '../../redux/constants/notificationCategories';

import { WindowType } from '../../../types';

// React Component Imports
import AccountDisplay from '../display/AccountDisplay';

const Settings = () => {
  const [mobileNumber, setMobileNumber] = useState('');

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
    fetch('http://localhost:3000/settings/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    fetch('http://localhost:3000/settings/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    fetch('http://localhost:3000/settings/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
    await window.nodeMethod.rendInvoke('verify-number', mobileNumber);
  };

  // fetch on component mount only because of empty dependency array
  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  /**
   * alerts if phone not entered on Test click
   */
  // const handlePhoneNumberSubmit = () => {
  //   if (!mobileNumber) alert('Please enter phone number');
  //   else {
  //     if (isNaN(Number(mobileNumber)))
  //       alert('Please enter phone number in numerical format. ex: 123456789');
  //     else {
  //       alert(`Phone: ${mobileNumber} is valid`);
  //       fetch('http://localhost:3000/settings/phone', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           admin: 'admin',
  //           number: mobileNumber,
  //           digits: [5, 2],
  //         }),
  //       })
  //         .then((data) => data.json())
  //         .then((response) => {
  //           addPhoneNumber(mobileNumber);
  //           showVerificationInput = true;
  //           verifyMobileNumber();
  //           const field = document.getElementById('textfield');
  //           if (field) (field as HTMLInputElement).value = '';
  //         })
  //         .catch((err) => {
  //           console.log('handlePhoneNumberSubmit: ', err);
  //         });
  //     }
  //   }
  // };

  const [tempNotifFreq, setTempNotifFreq] = useState('');

  const notificationFrequency = () => {
    let frequency: string | number = 5;
    if (isNaN(Number(tempNotifFreq)))
      alert('Please enter notification frequency in numerical format. ex: 15');
    else {
      if (tempNotifFreq) frequency = tempNotifFreq;
      fetch('http://localhost:3000/settings/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'admin',
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
          console.log('response', response);
          // addNotificationFrequency(frequency);
          setTempNotifFreq('');
        })
        .catch((err) => {
          console.log('NoficationFrequency: ', err);
        });
    }
  };

  const [tempMonitoringFrequency, setTempMonitoringFrequency] = useState('');

  const monitoringFrequency = () => {
    let frequency: string | number = 2;
    if (isNaN(Number(tempMonitoringFrequency)))
      alert('Please enter monitoring frequency in numerical format. ex: 15');
    else {
      if (tempMonitoringFrequency) frequency = tempMonitoringFrequency;
      fetch('http://localhost:3000/settings/monitoring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'admin',
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
          console.log('response', response);
          // addMonitoringFrequency(frequency);
          setTempMonitoringFrequency('');
        })
        .catch((err) => {
          console.log('MonitoringFrequency: ', err);
        });
    }
  };

  // Verification of the user-typed code (provided to use through SMS for secondary authentication)
  // const [formData, updateFormData] = useState('');

  // const handleChange = (value: string) => {
  //   updateFormData(value);
  // };
  //
  const handleSubmit = () => {
    console.log('This feature has not been implemented yet.');
    // const body = {
    //   code: formData,
    //   mobileNumber: mobileNumber,
    // };
    //
    // const result = await window.nodeMethod.rendInvoke('verify-code', body);
    //
    // if (result === 'approved') {
    //   showVerificationInput = false;
    //   isVerified = result === 'approved' ? true : false;
    // } else alert('Please try verification code again');
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
      (stateObject as Record<typeof el.ID, typeof el.ID>)[el.ID] = '';
  });

  // 2. MAKE A DB REQUEST TO GET EXISTING DATA ABOUT GITHUB URL LINKS AND UPDATE THE STATE WITH THIS INFORMATION
  // const getData = () => {
  //   fetch('http://localhost:3000/settings/gitcontainers', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((data) => data.json())
  //     .then((response) => {
  //       console.log(response);
  //       return response;
  //     });
  // };

  const [tempGithubLink, setTempGithubLink] = useState(stateObject);

  // Check if `githubLinks` are in the correct format, then, save them to database
  const githubLink = (event: any) => {
    const example = 'https://api.github.com';
    if (
      !tempGithubLink[event.target.id as keyof typeof tempGithubLink] ||
      (
        tempGithubLink as Record<typeof event.target.id, typeof event.target.id>
      )[event.target.id].slice(0, 22) != example
    )
      return alert(
        'Please provide a link in accordance with provided example.'
      );
    if (!event.target.id) return alert('Please provide a container ID.');
    else {
      const github_url =
        tempGithubLink[event.target.id as keyof typeof tempGithubLink];
      fetch('http://localhost:3000/settings/gitLinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: event.target.id,
          name: event.target.name,
          url: github_url,
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          const field = document.getElementById('gittext');
          if (field) (field as HTMLInputElement).value = '';
          return response;
        })
        .catch((err) => {
          console.log('githubLink: ', err);
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
  const [cpuThreshold, setCpuThreshold] = useState('');
  const [memThreshold, setMemThreshold] = useState('');
  const [stoppedContainers, setStoppedContainers] = useState(container_stops);
  const [value, setValue] = useState(contact_pref);
  const { updateUser } = useSurvey();

  // const updateUser = (userInfo: UserInfo) =>
  //   dispatch(actions.updateUser(userInfo));

  // const handleRadioChange = (event: any) => {
  //   setValue(event.target.value);
  // };

  const handleRadioSubmit = (value: string) => {
    fetch('http://localhost:3000/account/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    const field = document.getElementById('cpu-threshold-input');
    if (field) setCpuThreshold((field as HTMLInputElement).value);
  };

  const handleCpuSubmit = (value: string) => {
    fetch('http://localhost:3000/account/cpu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        setCpuThreshold('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMemSubmit = (value: string) => {
    fetch('http://localhost:3000/account/memory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        setMemThreshold('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStoppedContainersSubmit = (value: string) => {
    fetch('http://localhost:3000/account/stops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    const field = document.getElementById('mem-threshold-input');
    if (field) setMemThreshold((field as HTMLInputElement).value);
  };

  const handleStoppedContainersChange = () => {
    const ele = document.getElementById('stopped-containers-input');
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
        <tbody key={i}>
          <tr id='settings-row'>
            <td>
              <span className='container-name font-bold'>
                {container.Names ? container.Names : container.Name}
              </span>
            </td>

            <td>
              <span className='container-id'>{container.ID}</span>
            </td>

            <td align='center'>
              <input
                type='checkbox'
                checked={isMemorySelected}
                className='checkbox'
                onChange={(event: any) =>
                  event.target.checked
                    ? handleCheckSetting(
                        container.ID,
                        container.Name,
                        categories.MEMORY
                      )
                    : handleUnCheckSetting(container.ID, categories.MEMORY)
                }
                key={container.ID}
              />
            </td>

            <td align='center'>
              <input
                type='checkbox'
                checked={isCpuSelected}
                className='checkbox'
                onChange={(event: any) =>
                  event.target.checked
                    ? handleCheckSetting(
                        container.ID,
                        container.Name,
                        categories.CPU
                      )
                    : handleUnCheckSetting(container.ID, categories.CPU)
                }
                key={container.ID}
              />
            </td>

            <td align='center'>
              <input
                type='checkbox'
                checked={isStoppedSelected}
                className='checkbox'
                onChange={(event: any) =>
                  event.target.checked
                    ? handleCheckSetting(
                        container.ID,
                        container.Names ? container.Names : container.Name,
                        categories.STOPPED
                      )
                    : handleUnCheckSetting(container.ID, categories.STOPPED)
                }
                key={container.ID}
              />
            </td>

            <td>
              <div className='form-control w-full max-w-xs'>
                <input
                  id='gittext'
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full max-w-xs'
                  onChange={(e) => {
                    (
                      stateObject as Record<
                        typeof container.ID,
                        typeof container.ID
                      >
                    )[container.ID] = e.target.value;
                    setTempGithubLink(stateObject);
                  }}
                />
              </div>
            </td>

            <td>
              <button
                className='btn'
                name={container.Names ? container.Names : container.Name}
                id={container.ID}
                onClick={(e) => githubLink(e)}
              >
                Confirm
              </button>
            </td>
          </tr>
        </tbody>
      );
    }
  );

  return (
    <div className='space-y-5'>
      <div className='h-3'></div>
      <AccountDisplay />

      <div className='card w-11/14 bg-neutral text-neutral-content rounded-lg'>
        <div className='card-body text-left space-y-2'>
          <h2 className='card-title text-sm pb-2'>COMMUNICATION</h2>
          <p className='text-sm'>
            This panel will allow you to connect a mobile phone to your account
            and/or choose your preferred method of communication.
          </p>
          <div className='divider py-8'></div>
          <div className='items-center'>
            <label className='label'>
              <span className='label-text text-xs'>
                Enter phone number to enable Twilio
              </span>
            </label>
            <input
              type='text'
              placeholder='+12224448888'
              className='input input-bordered w-full max-w-xs'
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
            />
            <button className='btn btn-primary ml-7' onClick={handleSubmit}>
              Enable
            </button>
          </div>
          <div className='divider py-8'></div>
          <h2 className='card-title text-sm pb-2'>CONTACT PREFERENCES</h2>
          <div className='items-center'>
            <div className='input-group'>
              <select
                defaultValue='Choose preference'
                className='select select-bordered'
              >
                <option value='email' label='Email'>
                  Email
                </option>
                <option value='phone' label='Phone'>
                  Phone
                </option>
              </select>
              <button
                className='btn btn-primary'
                onClick={() => handleRadioSubmit(value)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='card w-11/14 bg-neutral text-neutral-content rounded-lg'>
        <div className='card-body text-left space-y-2'>
          <h2 className='card-title text-sm pb-2'>NOTIFICATION PREFERENCES</h2>
          <p className='text-sm'>
            This panel allows you to (i) customize monitoring and notification
            frequency, and (ii) define container conditions that will trigger
            notifications. When a container hits a threshold, an alert is sent
            via your preferred method of communication. Recommended values will
            be used by default.
          </p>
          <div className='divider py-8'></div>
          <div className='items-center'>
            <p>Update Notification Frequencie(s)</p>
            <label className='label'>
              <span className='label-text text-xs'>
                (Suggested frequency: 5 minutes)
              </span>
            </label>
            <input
              type='text'
              placeholder='frequency (minutes)'
              className='input input-bordered w-full max-w-xs'
              value={tempNotifFreq}
              onChange={(e) => {
                setTempNotifFreq(e.target.value);
              }}
            />
            <button
              className='btn btn-primary ml-7'
              onClick={() => notificationFrequency()}
            >
              Confirm
            </button>
            <label className='label'>
              <span className='label-text text-xs'>
                (Suggested frequency: 2 minutes)
              </span>
            </label>
            <input
              type='text'
              placeholder='frequency (minutes)'
              className='input input-bordered w-full max-w-xs'
              value={tempMonitoringFrequency}
              onChange={(e) => {
                setTempMonitoringFrequency(e.target.value);
              }}
            />
            <button
              className='btn btn-primary ml-7'
              onClick={() => monitoringFrequency()}
            >
              Confirm
            </button>
          </div>
          <div className='divider py-8'></div>
          <div className='items-center'>
            <p>Configure Notification Thresholds</p>
            <label className='label'>
              <span className='label-text text-xs'>
                Current CPU Threshold: {`>${cpu_threshold}%`}
              </span>
            </label>
            <input
              type='text'
              placeholder='frequency (minutes)'
              className='input input-bordered w-full max-w-xs'
              value={cpuThreshold}
              onChange={handleCpuChange}
            />
            <button
              className='btn btn-primary ml-7'
              onClick={() => handleCpuSubmit(cpuThreshold)}
            >
              Confirm
            </button>
            <label className='label'>
              <span className='label-text text-xs'>
                Current Memory Threshold: {`>${mem_threshold}%`}
              </span>
            </label>
            <input
              type='text'
              placeholder='frequency (minutes)'
              className='input input-bordered w-full max-w-xs'
              value={memThreshold}
              onChange={handleMemChange}
            />
            <button
              className='btn btn-primary ml-7'
              onClick={() => handleMemSubmit(memThreshold)}
            >
              Confirm
            </button>
          </div>
          <div className='divider py-8'></div>
          <div className='items-center'>
            <p>Stopped Containers</p>
            <label className='label cursor-pointer'>
              <span className='label-text'>
                Receive notification when a container stops
              </span>
              <input
                id='stopped-containers-input'
                type='checkbox'
                className='checkbox'
                onChange={handleStoppedContainersChange}
              />
              <button
                className='btn btn-primary'
                onClick={() => handleStoppedContainersSubmit(stoppedContainers)}
              >
                Submit
              </button>
            </label>
          </div>
        </div>
      </div>

      <div className='card w-11/14 bg-neutral text-neutral-content rounded-lg'>
        <div className='card-body text-left space-y-2'>
          <h2 className='card-title text-sm pb-2'>GITHUB CONFIGURATION</h2>
          <p className='text-sm'>
            This panel allows you to get access to latest GitHub commits in your
            project repository on "Metrics" tab for selected containers.
          </p>
          <div className='divider py-8'></div>
          <div className='items-center'>
            <p>
              This feature is currently in development. Please check back in
              later.
            </p>
          </div>
        </div>
      </div>

      <div className='card w-11/14 bg-neutral text-neutral-content rounded-lg'>
        <div className='card-body text-left space-y-2'>
          <h2 className='card-title text-sm pb-2'>CONTAINER CONFIGURATION</h2>
          <div className='divider py-8'></div>
          <div className='items-center'>
            <div className='overflow-x-auto'>
              <table className='table w-full'>
                {/* head */}
                <thead>
                  <tr>
                    <th className='text-xs'>CONTAINER NAME</th>
                    <th className='text-xs'>CONTAINER ID</th>
                    <th className='text-xs'>MEMORY {`>${mem_threshold}%`}</th>
                    <th className='text-xs'>CPU {`>${cpu_threshold}%`}</th>
                    <th className='text-xs'>CONTAINER STOPS</th>
                    <th className='text-xs'>GITHUB REPOSITORY</th>
                    <th className='text-xs'>APPLY SETTINGS</th>
                  </tr>
                </thead>
                {renderAllContainersList}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
