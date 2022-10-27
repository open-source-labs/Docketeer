// module imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// static imports
import * as actions from '../../redux/actions/actions';
import * as helper from '../helper/commands';
import * as history from '../helper/volumeHistoryHelper';
import Docketeer from '../../../assets/docketeer-title.png';

// tab component imports
import Metrics from '../tabs/Metrics';
import Images from '../tabs/Images';
import Yml from '../tabs/Yml';
import Containers from '../tabs/Containers'; //* Different from UserView
import Settings from '../tabs/Settings';
import VolumeHistory from '../tabs/VolumeHistory';
import ProcessLogs from '../tabs/ProcessLogs';
import ProcessLogsTable from '../display/ProcessLogsTable';

// helper function imports
import startNotificationRequester from '../module/utils/notificationsRequester';
import initDatabase from '../module/utils/initDatabase';

// Container component that has all redux logic along with react router

const AdminView = () => {
  const navigate = useNavigate();
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

  // declare a local state variable called selected, initialize to '/'
  const [selected, setSelected] = useState('/');

  const handleLogout = () => {
    updateSession();
    logoutUser();
    navigate('/login');  
  };

  useEffect(() => {
    initDatabase();
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
    startNotificationRequester();
    return () => clearInterval(interval);
  }, []);

  const selectedStyling = {
    background: '#e1e4e6',
    color: '#042331',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px'
  };

  return (
    <div className='container'>
      {/* Navbar */}
      <nav className='tab'>
        <header id='title'>
          <img src={Docketeer} width={160} />
        </header>
        <div className='viewsAndButton'>
          <ul>
            <li>
              <Link
                to='/app/users/'
                style={
                  selected === '/app/users/' ? selectedStyling : null
                }
                onClick={() => setSelected('/app/users/')}
              >
                <i className='fas fa-settings'></i> Settings
              </Link>
            </li>
            <li>
              <Link
                to='/app/running'
                style={
                  selected === '/app/running'
                    ? selectedStyling
                    : null
                }
                onClick={() => setSelected(() => '/app/running')}
              >
                <i className='fas fa-box-open'></i> Containers
              </Link>
            </li>
            <li>
              <Link
                to='/app/images'
                style={
                  selected === '/app/images'
                    ? selectedStyling
                    : null
                }
                onClick={() => setSelected('/app/images')}
              >
                <i className='fas fa-database'></i> Images
              </Link>
            </li>
            <li>
              <Link
                to='/app/metrics'
                style={
                  selected === '/app/metrics'
                    ? selectedStyling
                    : null
                }
                onClick={() => setSelected('/app/metrics')}
              >
                <i className='fas fa-chart-pie'></i> Metrics
              </Link>
            </li>
            <li>
              <Link
                to='/app/yml'
                style={
                  selected === '/app/yml' ? selectedStyling : null
                }
                onClick={() => setSelected('/app/yml')}
              >
                <i className='fas fa-file-upload'></i> Docker Compose
              </Link>
            </li>
            <li>
              <Link
                to='/app/volume'
                style={
                  selected === '/app/volume'
                    ? selectedStyling
                    : null
                }
                onClick={() => setSelected('/app/volume')}
              >
                <i className='fas fa-volume-history'></i> Volume History
              </Link>
            </li>
            <li>
              <Link
                to='/app/logs'
                style={
                  selected === '/app/logs' ? selectedStyling : null
                }
                onClick={() => setSelected('/app/logs')}
              >
                <i className='fas fa-log'></i> Process Logs
              </Link>
            </li>
          </ul>
          <div>
            <button
              style={{borderRadius: 5, marginBottom: 10}}
              className='btn'
              onClick={(e) => helper.handlePruneClick(e)}
            >
              System Prune
            </button>
            <span> </span>
            <button style={{borderRadius: 5, marginBottom: 10}} className='btn' onClick={(e) => handleLogout(e)}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path='/volume'
          element={
            <VolumeHistory
              arrayOfVolumeNames={arrayOfVolumeNames}
              volumeContainersList={volumeContainersList}
            />
          }
        />
        <Route
          path='/metrics'
          element={
            <Metrics runningList={runningList} />
          }
        />
        <Route
          path='/logs'
          element={
            <ProcessLogs
              runIm={helper.runIm}
              stop={helper.stop}
              stopRunningContainer={stopRunningContainer}
              runningList={runningList}
              addRunningContainers={addRunningContainers}
              // Stopped Containers
              runStopped={helper.runStopped}
              remove={helper.remove}
              removeContainer={removeContainer}
              runStoppedContainer={runStoppedContainer}
              stoppedList={stoppedList}
            />
          }
        />
        <Route path='/logTable/:containerId' element={<ProcessLogsTable />} />
        <Route
          path='/yml'
          element={
            <Yml
              networkList={networkList}
              composeymlFiles={composeymlFiles}
            />
          }
        />
        <Route
          path='/images'
          element={
            <Images
              runIm={helper.runIm}
              removeIm={helper.removeIm}
              addRunningContainers={addRunningContainers}
              refreshImagesList={refreshImagesList}
              imagesList={imagesList}
              runningList={runningList}
            />
          }
        />
        <Route
          path='/running'
          element={
            <Containers
              runIm={helper.runIm}
              stop={helper.stop}
              stopRunningContainer={stopRunningContainer}
              runningList={runningList}
              addRunningContainers={addRunningContainers}
              // Stopped Containers
              runStopped={helper.runStopped}
              remove={helper.remove}
              removeContainer={removeContainer}
              runStoppedContainer={runStoppedContainer}
              stoppedList={stoppedList}
            />
          }
        />
        <Route
          path='/'
          element={
            <Settings
              runningList={runningList}
              stop={helper.stop}
              stopRunningContainer={stopRunningContainer}
              stoppedList={stoppedList}
              runStopped={helper.runStopped}
              refreshRunningContainers={refreshRunningContainers}
              runStoppedContainer={runStoppedContainer}
              phoneNumber={phoneNumber}
              memoryNotificationList={memoryNotificationList}
              cpuNotificationList={cpuNotificationList}
              stoppedNotificationList={stoppedNotificationList}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default AdminView;
