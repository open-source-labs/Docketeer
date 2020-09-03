import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "../functions";
import * as actions from "../actions/actions";
import { exec } from "child_process";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Metrics from "./tabs/Metrics";
import Images from "./tabs/Images";
import Yml from "./tabs/Yml";
import Running from "./tabs/Running";
import Stopped from "./tabs/Stopped";
import { stderr } from "process";
import parseContainerFormat from './helper/parseContainerFormat';

const App = (props) => {
  const dispatch = useDispatch();
  const addRunningContainer = (data) =>
    dispatch(actions.addRunningContainer(data));
  const removeContainer = (id) => dispatch(actions.removeContainer(id));
  const stopContainer = (id) => dispatch(actions.stopContainer(id));
  const addStoppedContainer = (data) =>
    dispatch(actions.addStoppedContainer(data));
  const runStoppedContainer = (id) => dispatch(actions.runStoppedContainer(id));
  const getImages = (data) => dispatch(actions.getImages(data))
  const getRunningContainers = (data) => dispatch(actions.getRunningContainers(data));
  // const getRunningContainers = (data) => dispatch(actions.getRunningContainers(data))

  // useSelector Allows you to extract data from the Redux store state, using a selector function.

  const runningList = useSelector((state) => state.lists.runningList);
  const stoppedList = useSelector((state) => state.lists.stoppedList);
  const imagesList = useSelector((state) => state.lists.imagesList);


  // on app start-up, get the containers that are already running by calling initialAdd
  const initialRunning = () => {
    exec("docker stats --no-stream", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      //console.log(stdout);
      let value = parseContainerFormat.convert(stdout);
      let objArray = ['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids'];
      let convertedValue = parseContainerFormat.convertArrToObj(value, objArray);
      //console.log(convertedValue);
      
      //getRunningContainers(convertedValue);

      for(let i = 0; i < convertedValue.length; i++) {
        addRunningContainer(convertedValue[i]);
      }

      //console.log(data);

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

  const initialStopped = () => {
    exec('docker ps -f "status=exited"', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
      let value = parseContainerFormat.convert(stdout);
      //value => array
      console.log(value)
      const result = [];
      //tempoary we will have it as manual number
      for(let i = 0; i < value.length; i++) {
        let innerArray = [];
        innerArray.push(value[i][0]); // id
        innerArray.push(value[i][1]); // image
        if(!isNaN(parseInt(value[i][3]))) {
          innerArray.push(value[i][3] + ' days ago'); // created 
        } else {
          innerArray.push(value[i][6] + ' days ago');
        }
        result.push(innerArray);       
      }
      let objArray = ['cid', 'img', 'created'];
      let convertedValue = parseContainerFormat.convertArrToObj(result, objArray);
      
      console.log(convertedValue);
      
      for (let i = 0; i < convertedValue.length; i++) {
        addStoppedContainer(convertedValue[i]);
      }
      // do some operations here to create a container with the information retrieved from stdout
      // then, for each container created, call StopContainer by passing in the created container as argument
      //addStoppedContainer(stdout);
    });
  };

  const runStopped = (id) => {
    exec(`docker start ${id}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      runStoppedContainer(id);
    });
  };

	const runIm = (id) => {
		exec(`docker run ${id}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			runImage(id);
		});
	}

	const removeIm = (id) => {
		exec(`docker rmi -f ${id}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			removeImage(id);
		});
	}

  const getIm = () => {
		exec(`docker images`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
      }
      //console.log(stdout)
      let value = parseContainerFormat.convert(stdout);
      //console.log(value)
      let objArray = ['reps', 'tag', 'imgid', 'size'] 
      // let convertedValue = parseContainerFormat.convertArrToObj(value, objArray);
      //console.log('this is convertedValue for images ' + convertedValue)
      const resultImages = [];
      for(let i = 0; i < value.length; i++) {
        let innerArray = [];
        if(value[i][0] !== '<none>') {
          innerArray.push(value[i][0])
          innerArray.push(value[i][1])
          innerArray.push(value[i][2])
          innerArray.push(value[i][6])
          resultImages.push(innerArray)
        }
      }
      // console.log(resultImages);
      let convertedImagesValue = parseContainerFormat.convertArrToObj(resultImages, objArray);
      // console.log(convertedImagesValue)
      // for (let i = 0; i < convertedImagesValue.length; i++) {
      //   getImages(convertedImagesValue[i]);
      // }

			getImages(convertedImagesValue);
		});
	}

  const getContainers = () => {
    exec("docker stats --no-stream", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      //console.log(stdout);
      let value = parseContainerFormat.convert(stdout);
      let objArray = ['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids'];
      let convertedValue = parseContainerFormat.convertArrToObj(value, objArray);
      //console.log('Here: ', convertedValue);
      
      getRunningContainers(convertedValue);
    });
  }

  //It is commented out for now due to fixing infinite loop error
  useEffect(() => {
    initialRunning();
    initialStopped();
    getIm();
    
  }, []);
  // getContainers();

  // useEffect(() => {
    
  // }, [runningList]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Running</Link>
            </li>
            <li>
              <Link to="/stopped">Stopped</Link>
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
          <Route path="/stopped">
            <Stopped />
          </Route>
          <Route path="/">
            <Running stop={stop}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
	
};

export default App;
