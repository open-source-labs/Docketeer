// module imports
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

// static imports
import * as actions from '../../redux/actions/actions';
import * as helper from '../helper/commands';
import * as history from '../helper/volumeHistoryHelper';
import Docketeer from '../../../assets/docketeer-title.png';

// Navbar Import
// import Navbar from './Navbar';

// tab component imports
import Metrics from '../tabs/Metrics';
import ImagesUser from '../tabs/ImagesUser';
import Yml from '../tabs/Yml';
import ContainersUser from '../tabs/ContainersUser';
import Settings from '../tabs/Settings'; //! Issue with loading frontend -> Path.join is not a functions * Possibly fixed with preload script rendInvoke
import VolumeHistory from '../tabs/VolumeHistory';
import ProcessLogs from '../tabs/ProcessLogs';
import ProcessLogsTable from '../display/ProcessLogsTable';

// helper function imports
import startNotificationRequester from '../helper/notificationsRequester'; //! Issue with loading frontend -> Path.join is not a functions
import initDatabase from '../helper/initDatabase'; //! Issue with loading frontend -> Path.join is not a functions

// Container component that has all redux logic along with react router
const UserView = (props) => {
  const dispatch = useDispatch();
  const addRunningContainers = (data) =>
    dispatch(actions.addRunningContainers(data));
  const refreshRunningContainers = (data) =>
    dispatch(actions.refreshRunningContainers(data));
  const refreshStoppedContainers = (data) =>
    dispatch(actions.refreshStoppedContainers(data));
  const refreshImagesList = (data) => dispatch(actions.refreshImages(data));
  const composeymlFiles = (data) => dispatch(actions.composeymlFiles(data));
  const getNetworkContainers = (data) =>
    dispatch(actions.getNetworkContainers(data));
  const removeContainer = (id) => dispatch(actions.removeContainer(id));
  const runStoppedContainer = (data) =>
    dispatch(actions.runStoppedContainer(data));
  const stopRunningContainer = (id) =>
    dispatch(actions.stopRunningContainer(id));
  const updateSession = () => dispatch(actions.updateSession());
  const logoutUser = () => dispatch(actions.logoutUser());
  const getVolumeList = (data) => dispatch(actions.getVolumeList(data));
  const getVolumeContainersList = (data) =>
    dispatch(actions.getVolumeContainersList(data));

  // map state to props
  const runningList = useSelector((state) => state.containersList.runningList);
  const stoppedList = useSelector((state) => state.containersList.stoppedList);
  const imagesList = useSelector((state) => state.images.imagesList);
  const networkList = useSelector((state) => state.networkList.networkList);
  const arrayOfVolumeNames = useSelector(
    (state) => state.volumeList.arrayOfVolumeNames
  );
  const volumeContainersList = useSelector(
    (state) => state.volumeList.volumeContainersList
  );

  // map state to props
  const phoneNumber = useSelector(
    (state) => state.notificationList.phoneNumber
  );
  const memoryNotificationList = useSelector(
    (state) => state.notificationList.memoryNotificationList
  );
  const cpuNotificationList = useSelector(
    (state) => state.notificationList.cpuNotificationList
  );
  const stoppedNotificationList = useSelector(
    (state) => state.notificationList.stoppedNotificationList
  );

  // declare a local state variable called selected, initialize to "/"
  const [selected, setSelected] = useState('/');
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogout = (e) => {
    updateSession();
    logoutUser();
    // props.setLoggedIn(false);
  };

  useEffect(() => {
    // initDatabase();
    helper.refreshRunning(refreshRunningContainers);
    helper.refreshStopped(refreshStoppedContainers);
    helper.refreshImages(refreshImagesList);
    helper.writeToDb();
    helper.networkContainers(getNetworkContainers);
    helper.setDbSessionTimeZone();
    helper.getAllDockerVolumes(getVolumeList);
  }, []);

  useEffect(() => {
    history.volumeByName(
      helper.getVolumeContainers,
      arrayOfVolumeNames,
      getVolumeContainersList
    );
  }, [arrayOfVolumeNames]);

  // every 5 seconds invoke helper functions to refresh running, stopped and images, as well as notifications
  useEffect(() => {
    const interval = setInterval(() => {
      helper.refreshRunning(refreshRunningContainers);
      helper.refreshStopped(refreshStoppedContainers);
      helper.refreshImages(refreshImagesList);
    }, 5000);
    // startNotificationRequester(); //! Issue with loading frontend -> Path.join is not a functions
    return () => clearInterval(interval);
  }, []);

  const selectedStyling = {
    background: '#e1e4e6',
    color: '#042331',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px'
  };

  return (
    <Fragment>
      <div className='container'>
        {/* <Navbar /> */}

        <nav className='tab'>
          <header id='title'>
            <img src={Docketeer} width={160} />
          </header>
          <div className='viewsAndButton'>
            <ul>
              <li>
                <Link
                  to='/app/UserView/'
                  // style={selected === '/' ? selectedStyling : null}
                  // onClick={() => setSelected('/')}
                >
                  <i className='fas fa-settings'></i> Settings
                </Link>
              </li>
              <li>
                <Link
                  to='/app/UserView/running'
                  // style={selected === '/running' ? selectedStyling : null}
                  // onClick={() => setSelected(() => '/running')}
                >
                  <i className='fas fa-box-open'></i> Containers
                </Link>
              </li>
              <li>
                <Link
                  to='/app/UserView/images'
                  // style={selected === '/images' ? selectedStyling : null}
                  // onClick={() => setSelected('/images')}
                >
                  <i className='fas fa-database'></i> Images
                </Link>
              </li>
              <li>
                <Link
                  to='/app/UserView/metrics'
                  // style={selected === '/metrics' ? selectedStyling : null}
                  // onClick={() => setSelected('/metrics')}
                >
                  <i className='fas fa-chart-pie'></i> Metrics
                </Link>
              </li>
              <li>
                <Link
                  to='/app/UserView/yml'
                  // style={selected === '/yml' ? selectedStyling : null}
                  // onClick={() => setSelected('/yml')}
                >
                  <i className='fas fa-file-upload'></i> Docker Compose
                </Link>
              </li>
              <li>
                <Link
                  to='/app/UserView/volume'
                  // style={selected === '/volume' ? selectedStyling : null}
                  // onClick={() => setSelected('/volume')}
                >
                  <i className='fas fa-volume-history'></i> Volume History
                </Link>
              </li>
              <li>
                <Link
                  to='/app/UserView/logs'
                  // style={selected === '/logs' ? selectedStyling : null}
                  // onClick={() => setSelected('/logs')}
                >
                  <i className='fas fa-log'></i> Process Logs
                </Link>
              </li>
            </ul>
            <div>
              <button
                className='btn'
                // onClick={(e) => helper.handlePruneClick(e)}
              >
                System Prune
              </button>
              <span> </span>
              <button
                className='btn'
                // onClick={(e) => handleLogout(e)}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <Routes>
          <Route
            path='volume'
            element={
              // <VolumeHistory
              //   arrayOfVolumeNames={arrayOfVolumeNames}
              //   volumeContainersList={volumeContainersList}
              // />
              <h2>I'm Volume History!</h2>
            }
          />
          <Route
            path='metrics'
            element={
              // <Metrics runningList={runningList}/>
              <h2>I'm Metrics!</h2>
            }
          />

          <Route
            path='logs'
            element={
              // <ProcessLogs
              //   runIm={helper.runIm}
              //   stop={helper.stop}
              //   stopRunningContainer={stopRunningContainer}
              //   runningList={runningList}
              //   addRunningContainers={addRunningContainers}
              //   // Stopped Containers
              //   runStopped={helper.runStopped}
              //   remove={helper.remove}
              //   removeContainer={removeContainer}
              //   runStoppedContainer={runStoppedContainer}
              //   stoppedList={stoppedList}
              // />
              <h2>I'm Logs!</h2>
            }
          />
          <Route
            path='logTable/:containerId'
            element={
              // <ProcessLogsTable />
              <h2>I'm Process Logs</h2>
            }
          />
          <Route
            path='yml'
            element={
              // <Yml
              //   networkList={networkList}
              //   composeymlFiles={composeymlFiles}
              // />
              <h2>I'm YML!</h2>
            }
          />
          <Route
            path='images'
            element={
              // <ImagesUser
              //   runIm={helper.runIm}
              //   removeIm={helper.removeIm}
              //   addRunningContainers={addRunningContainers}
              //   refreshImagesList={refreshImagesList}
              //   imagesList={imagesList}
              //   runningList={runningList}
              // />
              <h2>I'm Images!</h2>
            }
          />
          <Route
            path='running'
            element={
              // <ContainersUser
              //   runIm={helper.runIm}
              //   stop={helper.stop}
              //   stopRunningContainer={stopRunningContainer}
              //   runningList={runningList}
              //   addRunningContainers={addRunningContainers}
              //   // Stopped Containers
              //   runStopped={helper.runStopped}
              //   remove={helper.remove}
              //   removeContainer={removeContainer}
              //   runStoppedContainer={runStoppedContainer}
              //   stoppedList={stoppedList}
              // />
              <h2>I'm Running!</h2>
            }
          />
          <Route
            path='/'
            element={
              // <Settings
              //   runningList={runningList}
              //   stop={helper.stop}
              //   stopRunningContainer={stopRunningContainer}
              //   stoppedList={stoppedList}
              //   runStopped={helper.runStopped}
              //   refreshRunningContainers={refreshRunningContainers}
              //   runStoppedContainer={runStoppedContainer}
              //   phoneNumber={phoneNumber}
              //   memoryNotificationList={memoryNotificationList}
              //   cpuNotificationList={cpuNotificationList}
              //   stoppedNotificationList={stoppedNotificationList}
              // />
              <h2>I'm Settings!</h2>
            }
          />
        </Routes>
      </div>
    </Fragment>
  );
};

export default UserView;
