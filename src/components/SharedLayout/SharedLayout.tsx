import React from "react";
import { Outlet, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../reducers/hooks";
import { createAlert, createPrompt } from "../../reducers/alertReducer";

// Importing helpers
import useHelper from "../helpers/commands";
import useSurvey from "../helpers/dispatch";

function SharedLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handlePruneClick } = useHelper();

  const { sessions } = useAppSelector((state) => state);
  const userData = sessions;

  const { updateSession, logoutUser } = useSurvey();

  const logOut = async (): Promise<void> => {
    updateSession();
    logoutUser();

    // what is this try block doing?
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
        }),
      });
      const parsedData = await response.json();
      console.log(parsedData);
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };

  const handleLogOut = () => {
    {
      dispatch(
        createPrompt(
          // prompt (first argument in createPrompt)
          "Are you sure you want to log out of Docketeer?",
          // handleAccept (second argument in createPrompt)
          () => {
            logOut();
            dispatch(createAlert("Logging out...", 5, "success"));
          },
          // handleDeny (third argument in createPrompt)
          () => {
            dispatch(
              createAlert(
                "The request to logout has been cancelled.",
                5,
                "warning"
              )
            );
          }
        )
      );
    }
  };

  const systemPrune = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    {
      dispatch(
        createPrompt(
          // prompt (first argument in createPrompt)
          "Are you sure you want to run system prune? This will remove all unused containers, networks, images (both dangling and unreferenced).",
          // handleAccept (second argument in createPrompt)
          () => {
            handlePruneClick(e);
            dispatch(createAlert("Performing system prune...", 5, "success"));
          },
          // handleDeny (third argument in createPrompt)
          () => {
            dispatch(
              createAlert(
                "The request to perform system prune has been cancelled.",
                5,
                "warning"
              )
            );
          }
        )
      );
    }
  };

  return (
    <div>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/home/">Settings</Link>
            </li>

            <li>
              <Link to="/home/users">Users</Link>
            </li>
            <li>
              <Link to="/home/running">Containers</Link>
            </li>
            <li>
              <Link to="/home/images">Images</Link>
            </li>
            <li>
              <Link to="/home/metrics">Metrics</Link>
            </li>
            <li>
              <Link to="/home/yml">Docker Compose</Link>
            </li>
            <li>
              <Link to="/home/volume">Volume History</Link>
            </li>
            <li>
              <Link to="/home/logs">Process Logs</Link>
            </li>
            <li>
              <a onClick={(e) => systemPrune(e)}>System Prune</a>
            </li>
          </ul>
        </div>
        <Link to="/home/" className="btn btn-ghost normal-case text-xl">
          docketeer
        </Link>
      </div>
      <div className="navbar-center hidden xl:flex">
        <ul className="menu menu-horizontal px-1 text-xs">
          <li>
            <Link to="/home/">SETTINGS</Link>
          </li>

          <li>
            <Link to="/home/users">USERS</Link>
          </li>
          <li>
            <Link to="/home/running">CONTAINERS</Link>
          </li>
          <li>
            <Link to="/home/images">IMAGES</Link>
          </li>
          <li>
            <Link to="/home/metrics">METRICS</Link>
          </li>
          <li>
            <Link to="/home/yml">DOCKER COMPOSE</Link>
          </li>
          <li>
            <Link to="/home/volume">VOLUME HISTORY</Link>
          </li>
          <li>
            <Link to="/home/logs">PROCESS LOGS</Link>
          </li>
          <li>
            <a onClick={(e) => systemPrune(e)}>SYSTEM PRUNE</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {userData.username && (
          <span className="btn btn-primary btn-md lowercase font-bold text-sm">{`${userData.username}`}</span>
        )}
        <a className="btn" onClick={() => handleLogOut()}>
          Logout
        </a>
      </div>
      <Outlet />
    </div>
  );
}

export default SharedLayout;
