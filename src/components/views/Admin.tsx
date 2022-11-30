// module imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// static imports
import * as actions from '../../redux/actions/actions';
import * as helper from '../helper/commands';
import * as history from '../helper/volumeHistoryHelper';
// @ts-ignore
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
import startNotificationRequester from '../helper/notificationsRequester';
import initDatabase from '../helper/initDatabase';

// Container component that has all redux logic along with react router

const AdminView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addRunningContainers = (data: object[]) =>
    dispatch(actions.addRunningContainers(data));
  const refreshRunningContainers = (data: object[]) =>
    dispatch(actions.refreshRunningContainers(data));
  const refreshStoppedContainers = (data: object[]) =>
    dispatch(actions.refreshStoppedContainers(data));
  const refreshImagesList = (data: object[]) => dispatch(actions.refreshImages(data));
  // const composeymlFiles = (data) => dispatch(actions.composeymlFiles(data));
  const getNetworkContainers = (data: object[]) =>
    dispatch(actions.getNetworkContainers(data));
  const removeContainer = (id: number) => dispatch(actions.removeContainer(id));
  // this parameter was changed from data: object[] because in the actions file, an id argument was being requested
  const runStoppedContainer = (id: number) =>
    dispatch(actions.runStoppedContainer(id));
  const stopRunningContainer = (id: number) =>
    dispatch(actions.stopRunningContainer(id));
  const updateSession = () => dispatch(actions.updateSession());
  // originally, this function have any parameters, but typescript through an error saying it was needed. Check this out later
  const logoutUser = () => dispatch(actions.logoutUser());
  const getVolumeList = (data: object[]) => dispatch(actions.getVolumeList(data));
  const getVolumeContainersList = (data: object[]) => dispatch(actions.getVolumeContainersList(data));

  interface containersList {
    runningList: object[],
    stoppedList: object[]
  }

  interface imagesList {
    imagesList: any[]
  }

  interface volumeList {
    arrayOfVolumeNames: any[]
    volumeContainersList: any[]
  }
  
  interface notificationList {
    phoneNumber: any[],
    memoryNotificationList: any[],
    cpuNotificationList: any[],
    stoppedNotificationList: any[],
  }

  interface stateType {
    containersList: containersList,
    images: imagesList,
    volumeList: volumeList,
    notificationList: notificationList
  };

  // map state to props
  const runningList = useSelector((state: stateType) => state.containersList.runningList);
  const stoppedList = useSelector((state: stateType) => state.containersList.stoppedList);
  const imagesList = useSelector((state: stateType) => state.images.imagesList);
  // const networkList = useSelector((state: stateType) => state.networkList.networkList);

  const arrayOfVolumeNames = useSelector(
    (state: stateType) => state.volumeList.arrayOfVolumeNames
  );
  const volumeContainersList = useSelector(
    (state: stateType) => state.volumeList.volumeContainersList
  );

  // map state to props
  const phoneNumber = useSelector(
    (state: stateType) => state.notificationList.phoneNumber
  );
  const memoryNotificationList = useSelector(
    (state: stateType) => state.notificationList.memoryNotificationList
  );
  const cpuNotificationList = useSelector(
    (state: stateType) => state.notificationList.cpuNotificationList
  );
  const stoppedNotificationList = useSelector(
    (state: stateType) => state.notificationList.stoppedNotificationList
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
                  selected === '/app/users/' ? selectedStyling : undefined
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
                    : undefined
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
                    : undefined
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
                    : undefined
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
                  selected === '/app/yml' ? selectedStyling : undefined
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
                    : undefined
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
                  selected === '/app/logs' ? selectedStyling : undefined
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
            <button style={{borderRadius: 5, marginBottom: 10}} className='btn' onClick={() => handleLogout()}>
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
            //the below properties for the Yml component were throwing errors. The Yml component file didn't seem to be using these so they have been marked out for now
              // networkList={networkList}
              // composeymlFiles={composeymlFiles}
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
//adding comment to commit
export default AdminView;
