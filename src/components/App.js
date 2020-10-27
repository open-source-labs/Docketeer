import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/actions';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Metrics from './tabs/Metrics';
import Images from './tabs/Images';
import Yml from './tabs/Yml';
import Running from './tabs/Running';
import Stopped from './tabs/Stopped';
import LTMetrics from './tabs/LTMetrics';
import * as helper from './helper/commands';
import Docketeer from '../../assets/docketeer-title.png';
import Settings from './tabs/Settings';

/**
 *
 * @param {*} props
 * Container component that has all redux logic along with react router
 */
const App = (props) => {
  const dispatch = useDispatch();
  const addRunningContainers = (data) =>
    dispatch(actions.addRunningContainers(data));
  const refreshRunningContainers = (data) =>
    dispatch(actions.refreshRunningContainers(data));
  const refreshStoppedContainers = (data) =>
    dispatch(actions.refreshStoppedContainers(data));
  const refreshImagesList = (data) => dispatch(actions.refreshImages(data));
  const composeymlFiles = (data) => dispatch(actions.composeymlFiles(data));
  const getComposeYmlFiles = (data) =>
    dispatch(actions.getComposeYmlFiles(data));
  const removeContainer = (id) => dispatch(actions.removeContainer(id));
  const runStoppedContainer = (data) =>
    dispatch(actions.runStoppedContainer(data));
  const stopRunningContainer = (id) =>
    dispatch(actions.stopRunningContainer(id));

  const runningList = useSelector((state) => state.lists.runningList);
  const stoppedList = useSelector((state) => state.lists.stoppedList);
  const imagesList = useSelector((state) => state.lists.imagesList);
  const networkList = useSelector((state) => state.lists.networkList);

  // map state to props
  const phoneNumber = useSelector((state) => state.lists.phoneNumber);
  const memoryNotificationList = useSelector(
    (state) => state.lists.memoryNotificationList
  );
  const cpuNotificationList = useSelector(
    (state) => state.lists.cpuNotificationList
  );
  const stoppedNotificationList = useSelector(
    (state) => state.lists.stoppedNotificationList
  );

  const [selected, setSelected] = useState('/');
  const [color, setColor] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      helper.refreshRunning(refreshRunningContainers, runningList);
      helper.refreshStopped(refreshStoppedContainers);
      helper.refreshImages(refreshImagesList);
    }, 5000);

    helper.displayNetwork(getComposeYmlFiles);
    return () => clearInterval(interval);
  }, [runningList]);
  
  useEffect(() => {
    helper.writeToDb();
  }, [])

  const selectedStyling = {
    background: '#e1e4e6',
    color: '#042331',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  };

  

  return (
    <Router>
      <div className='container'>
        <nav className='tab'>
          <header id='title'>
            <img src={Docketeer} width={140} />
          </header>
          <div className='viewsAndButton'>
            <ul>
              <li>
                <Link
                  to='/'
                  style={selected === '/' ? selectedStyling : {}}
                  onClick={() => setSelected('/')}
                >
                  <i className='fas fa-settings'></i>Settings
                </Link>
              </li>
              <li>
                <Link
                  to='/running'
                  style={selected === '/running' ? selectedStyling : {}}
                  onClick={() => {
                    setSelected((sel) => '/running');
                  }}
                >
                  <i className='fas fa-box-open'></i> Running Containers
                </Link>
              </li>
              <li>
                <Link
                  to='/stopped'
                  style={selected === '/stopped' ? selectedStyling : {}}
                  onClick={() => setSelected('/stopped')}
                >
                  <i className='fas fa-archive'></i> Exited Containers
                </Link>
              </li>
              <li>
                <Link
                  to='/images'
                  style={selected === '/images' ? selectedStyling : {}}
                  onClick={() => setSelected('/images')}
                >
                  <i className='fas fa-database'></i> Images
                </Link>
              </li>
              <li>
                <Link
                  to='/metrics'
                  style={selected === '/metrics' ? selectedStyling : {}}
                  onClick={() => setSelected('/metrics')}
                >
                  <i className='fas fa-chart-pie'></i> Metrics
                </Link>
              </li>
              <li>
                <Link
                  to='/LTMetrics'
                  style={selected === '/LTMetrics' ? selectedStyling : {}}
                  onClick={() => setSelected('/LTMetrics')}
                >
                  <i className='fas fa-chart-pie'></i> Long Term Metrics
                </Link>
              </li>
              <li>
                <Link
                  to='/yml'
                  style={selected === '/yml' ? selectedStyling : {}}
                  onClick={() => setSelected('/yml')}
                >
                  <i className='fas fa-file-upload'></i> Docker Compose
                </Link>
              </li>
            </ul>
            <div>
              <button
                className='btn'
                onClick={(e) => helper.handlePruneClick(e)}
              >
                System Prune
              </button>
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/metrics'>
            <Metrics
              showGeneralMetrics={helper.showGeneralMetrics}
              runningList={runningList}
            />
          </Route>
          <Route path='/LTMetrics'>
            <LTMetrics
              showGeneralMetrics={helper.showGeneralMetrics}
              runningList={runningList}
              stoppedList={stoppedList}
            />
          </Route>
          <Route path='/yml'>
            <Yml networkList={networkList} composeymlFiles={composeymlFiles} />
          </Route>
          <Route path='/images'>
            <Images
              runIm={helper.runIm}
              removeIm={helper.removeIm}
              addRunningContainers={addRunningContainers}
              refreshImagesList={refreshImagesList}
              imagesList={imagesList}
              runnningList={runningList}
            />
          </Route>
          <Route path='/stopped'>
            <Stopped
              runStopped={helper.runStopped}
              remove={helper.remove}
              removeContainer={removeContainer}
              runStoppedContainer={runStoppedContainer}
              stoppedList={stoppedList}
            />
          </Route>
          <Route path='/running'>
            <Running
              runIm={helper.runIm}
              stop={helper.stop}
              stopRunningContainer={stopRunningContainer}
              runningList={runningList}
              addRunningContainers={addRunningContainers}
            />
          </Route>
          <Route path='/'>
            <Settings
              runningList={runningList}
              stop={helper.stop}
              stopRunningContainer={stopRunningContainer}
              stoppedList={stoppedList}
              runStopped={helper.runStopped}
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

export default App;
