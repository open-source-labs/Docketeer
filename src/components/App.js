import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "../functions";
import * as actions from "../actions/actions";
import { exec } from "child_process";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Metrics from "./tabs/Metrics";
import Images from "./tabs/Images";
import Yml from "./tabs/Yml";
import RunningStopped from "./tabs/RunningStopped";
import { stderr } from "process";
const App = (props) => {
  const dispatch = useDispatch();
  const addContainer = (data) => dispatch(actions.addContainer(data));
  const removeContainer = (id) => dispatch(actions.removeContainer(id));
  const stopContainer = (id) => dispatch(actions.stopContainer(id));

  // const getRunningContainers = (data) => dispatch(actions.getRunningContainers(data))

  // useSelector Allows you to extract data from the Redux store state, using a selector function.
  const data = useSelector((state) => state.containers.containerList);

  // on app start-up, get the containers that are already running by calling initialAdd
  const initialAdd = () => {
    exec("docker stats --no-stream", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
      // do some operations here to create a container with the information retrieved from stdout
      // then, for each container created, call addContainer by passing in the created container as argument
      return addContainer(stdout.split("\n")[1]);
    });
  };

  const remove = (id) => {
    exec(`docker rm --force ${id}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      removeContainer(id);
    });
  };

  const stop = (id) => {
    exec(`docker stop ${id}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      stopContainer(id);
    });
  };

  //CREATE

  useEffect(() => {
    initialAdd();
  }, []);

  // useEffect(() => {

  // }, [data]);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Running/Stop</Link>
            </li>
            <li>
              <Link to="/images">Images</Link>
            </li>
            <li>
              <Link to="/metrics">Metrics</Link>
            </li>
            <li>
              <Link to="/yml">+</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/metrics">
            <Metrics />
          </Route>
          <Route path="/yml">
            <Yml />
          </Route>
          <Route path="/images">
            <Images />
          </Route>
          <Route path="/">
            <RunningStopped runningContainers={data} />
            {data}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
