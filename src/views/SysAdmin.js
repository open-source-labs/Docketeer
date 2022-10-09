// module imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

// static imports
import * as actions from '../actions/actions';
import * as helper from '../module/utils/commands';
import * as history from '../module/utils/helper/volumeHistoryHelper';
import Docketeer from '../assets/images/docketeer-title.png';

// tab component imports
import Metrics from '../tabs/Metrics';
import Images from '../tabs/Images';
import Yml from '../tabs/Yml';
import Containers from '../tabs/Containers';
import Settings from '../tabs/Settings';
import UserList from '../tabs/Users';
import VolumeHistory from '../tabs/VolumeHistory';
import ProcessLogs from '../tabs/ProcessLogs';
import ProcessLogsTable from '../components/display/ProcessLogsTable';

// helper function imports
import startNotificationRequester from '../module/utils/notificationsRequester';
import initDatabase from '../module/utils/initDatabase';

// Container component that has all redux logic along with react router
const SysAdmin = () => {
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
  const updateUserList = (data) => dispatch(actions.updateUserList(data));
  // const updateUserRole = (data) => dispatch(actions.updateUserRole(data));
  const getVolumeList = (data) => dispatch(actions.getVolumeList(data));
  const getVolumeContainersList = (data) =>
    dispatch(actions.getVolumeContainersList(data));

  // map state to props
  const runningList = useSelector((state) => state.containersList.runningList);
  const stoppedList = useSelector((state) => state.containersList.stoppedList);
  const imagesList = useSelector((state) => state.images.imagesList);
  const networkList = useSelector((state) => state.networkList.networkList);
  const userInfo = useSelector((state) => state.session);
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

  // Local state for routers
  const [selected, setSelected] = useState('/');

  const handleLogout = () => {
    updateSession();
    logoutUser();
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userInfo.username,
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        return console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
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

  useEffect(() => {
    fetch('http://localhost:3000/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: userInfo.token,
        username: userInfo.username,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateUserList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectedStyling = {
    background: '#e1e4e6',
    color: '#042331',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  };

  return (
    <Router>
      <div className="container">
        <nav className="tab">
          <header id="title">
            <img src={Docketeer} width={160} />
          </header>
          <div className="viewsAndButton">
            <ul>
              <li>
                <Link
                  to="/app"
                  style={selected === '/' ? selectedStyling : null}
                  onClick={() => setSelected('/')}
                >
                  <i className="fas fa-settings"></i> Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/users"
                  style={selected === '/users' ? selectedStyling : null}
                  onClick={() => setSelected('/users')}
                >
                  <i className="fas fa-users"></i> Users
                </Link>
              </li>
              <li>
                <Link
                  to="/running"
                  style={selected === '/running' ? selectedStyling : null}
                  onClick={() => setSelected(() => '/running')}
                >
                  <i className="fas fa-box-open"></i> Containers
                </Link>
              </li>
              <li>
                <Link
                  to="/images"
                  style={selected === '/images' ? selectedStyling : null}
                  onClick={() => setSelected('/images')}
                >
                  <i className="fas fa-database"></i> Images
                </Link>
              </li>
              <li>
                <Link
                  to="/metrics"
                  style={selected === '/metrics' ? selectedStyling : null}
                  onClick={() => setSelected('/metrics')}
                >
                  <i className="fas fa-chart-pie"></i> Metrics
                </Link>
              </li>
              <li>
                <Link
                  to="/yml"
                  style={selected === '/yml' ? selectedStyling : null}
                  onClick={() => setSelected('/yml')}
                >
                  <i className="fas fa-file-upload"></i> Docker Compose
                </Link>
              </li>
              <li>
                <Link
                  to="/volume"
                  style={selected === '/volume' ? selectedStyling : null}
                  onClick={() => setSelected('/volume')}
                >
                  <i className="fas fa-volume-history"></i> Volume History
                </Link>
              </li>
              <li>
                <Link
                  to="/logs"
                  style={selected === '/logs' ? selectedStyling : null}
                  onClick={() => setSelected('/logs')}
                >
                  <i className="fas fa-log"></i> Process Logs
                </Link>
              </li>
            </ul>
            <div>
              <button
                className="btn"
                onClick={(e) => helper.handlePruneClick(e)}
              >
                System Prune
              </button>
              <span> </span>
              <button className="btn" onClick={(e) => handleLogout(e)}>
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/volume">
            <VolumeHistory
              arrayOfVolumeNames={arrayOfVolumeNames}
              volumeContainersList={volumeContainersList}
            />
          </Route>
          <Route path="/metrics">
            <Metrics runningList={runningList} />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/logs">
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
          </Route>

          <Route path="/logTable/:containerId">
            <ProcessLogsTable />
          </Route>

          <Route path="/yml">
            <Yml networkList={networkList} composeymlFiles={composeymlFiles} />
          </Route>
          <Route path="/images">
            <Images
              runIm={helper.runIm}
              removeIm={helper.removeIm}
              addRunningContainers={addRunningContainers}
              refreshImagesList={refreshImagesList}
              imagesList={imagesList}
              runningList={runningList}
            />
          </Route>
          <Route path="/running">
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
          </Route>

          <Route path="/">
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
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default SysAdmin;
