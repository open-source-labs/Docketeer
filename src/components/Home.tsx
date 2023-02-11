// Module imports
import React, { useEffect, useState } from "react";
import { useSelector /* , useDispatch  */ } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import useSurvey from "./helper/dispatch";

// Static imports
import * as helper from "./helper/commands";
import * as history from "./helper/volumeHistoryHelper";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from "../../assets/docketeer-title.png";

// Tab component imports
import Metrics from "./tabs/Metrics";
import Images from "./tabs/Images";
import Yml from "./tabs/Yml";
import Containers from "./tabs/Containers";
import Settings from "./tabs/Settings";
import UserList from "./tabs/Users"; //* Feature only for SysAdmin
import VolumeHistory from "./tabs/VolumeHistory";
import ProcessLogs from "./tabs/ProcessLogs";
import ProcessLogsTable from "./display/ProcessLogsTable";

// Helper function imports
import startNotificationRequester from "./helper/notificationsRequester";
import initDatabase from "./helper/initDatabase";

// Types and Interface
import { StateType } from "../../types";

// Container component that has all redux logic along with react router
const Home = () => {
  // Initialize `navigate` & `dispatch` for use within Home component
  const navigate = useNavigate();

  // State access
  const { session, volumeList } = useSelector((state: StateType) => state);
  const userInfo = session;
  const { arrayOfVolumeNames } = volumeList;

  // Local state
  const [selected, setSelected] = useState("/");

  // Deconstructs dispatch functions from useSurvey memo
  const {
    updateSession,
    logoutUser,
    refreshHostData,
    refreshRunningContainers,
    refreshStoppedContainers,
    refreshImagesList,
    updateUserList,
    getVolumeContainersList,
    getNetworkContainers,
    getVolumeList,
  } = useSurvey();

  // Handles logout of client
  const handleLogout = () => {
    updateSession();
    logoutUser();
    fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    navigate("/login");
  };

  // Initial refresh
  useEffect(() => {
    initDatabase();
    helper.getHostStats(refreshHostData);
    helper.refreshRunning(refreshRunningContainers);
    helper.refreshStopped(refreshStoppedContainers);
    helper.refreshImages(refreshImagesList);
    helper.writeToDb();
    helper.networkContainers(getNetworkContainers);
    helper.setDbSessionTimeZone();
    helper.getAllDockerVolumes(getVolumeList);
  }, []);

  // Changes in arrayOfVolumeNames will run history.volumeByName
  useEffect(() => {
    history.volumeByName(
      helper.getVolumeContainers,
      arrayOfVolumeNames,
      getVolumeContainersList
    );
  }, [arrayOfVolumeNames]);

  // Invoke helper functions every 5 seconds to: refresh running/stopped containers/images & notifications
  useEffect(() => {
    const interval = setInterval(() => {
      helper.getHostStats(refreshHostData);
      helper.refreshRunning(refreshRunningContainers);
      helper.refreshStopped(refreshStoppedContainers);
      helper.refreshImages(refreshImagesList);
    }, 5000);
    startNotificationRequester();
    return () => clearInterval(interval);
  }, []);

  // Pertains to sysAdmin only
  useEffect(() => {
    fetch("http://localhost:3000/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  // Define inline styling for navigation bar
  const selectedStyling = {
    background: "#e1e4e6",
    color: "#042331",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  };

  return (
    <div className="container">
      <nav className="tab">
        <header id="title">
          <img src={Docketeer} width={220} />
        </header>
        <div className="viewsAndButton">
          <ul>
            <li>
              <Link
                to="/home/"
                style={selected === "/home/" ? selectedStyling : undefined}
                onClick={() => setSelected("/home/")}
              >
                <i className="fas fa-settings"></i> Settings
              </Link>
            </li>
            <li>
              <Link
                to="/home/users"
                style={selected === "/home/users" ? selectedStyling : undefined}
                onClick={() => setSelected("/home/users")}
              >
                <i className="fas fa-users"></i> Users
              </Link>
            </li>
            <li>
              <Link
                to="/home/running"
                style={
                  selected === "/home/running" ? selectedStyling : undefined
                }
                onClick={() => setSelected(() => "/home/running")}
              >
                <i className="fas fa-box-open"></i> Containers
              </Link>
            </li>
            <li>
              <Link
                to="/home/images"
                style={
                  selected === "/home/images" ? selectedStyling : undefined
                }
                onClick={() => setSelected("/home/images")}
              >
                <i className="fas fa-database"></i> Images
              </Link>
            </li>
            <li>
              <Link
                to="/home/metrics"
                style={
                  selected === "/home/metrics" ? selectedStyling : undefined
                }
                onClick={() => setSelected("/home/metrics")}
              >
                <i className="fas fa-chart-pie"></i> Metrics
              </Link>
            </li>
            <li>
              <Link
                to="/home/yml"
                style={selected === "/home/yml" ? selectedStyling : undefined}
                onClick={() => setSelected("/home/yml")}
              >
                <i className="fas fa-file-upload"></i> Docker Compose
              </Link>
            </li>
            <li>
              <Link
                to="/home/volume"
                style={
                  selected === "/home/volume" ? selectedStyling : undefined
                }
                onClick={() => setSelected("/home/volume")}
              >
                <i className="fas fa-volume-history"></i> Volume History
              </Link>
            </li>
            <li>
              <Link
                to="/home/logs"
                style={selected === "/home/logs" ? selectedStyling : undefined}
                onClick={() => setSelected("/home/logs")}
              >
                <i className="fas fa-log"></i> Process Logs
              </Link>
            </li>
          </ul>
          <div>
            <button
              style={{ borderRadius: 5, marginBottom: 10 }}
              className="btn"
              onClick={(e) => helper.handlePruneClick(e)}
            >
              System Prune
            </button>
            <span> </span>
            <button
              style={{ borderRadius: 5, marginBottom: 10 }}
              className="btn"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/volume" element={<VolumeHistory />} />
        <Route path="/metrics" element={<Metrics key={1} />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/logs" element={<ProcessLogs key={1} />} />
        <Route path="/logTable/:containerId" element={<ProcessLogsTable />} />
        <Route path="/yml" element={<Yml />} />
        <Route path="/images" element={<Images />} />
        <Route path="/running" element={<Containers />} />
        <Route path="/" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default Home;
