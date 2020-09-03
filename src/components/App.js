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
import w from '../willbedeleted';

const App = (props) => {
	const dispatch = useDispatch();
	const addRunningContainer = (data) => dispatch(actions.addRunningContainer(data));
	const addStoppedContainer = (data) => dispatch(actions.addStoppedContainer(data));
	const removeContainer = (id) => dispatch(actions.removeContainer(id));
	const stopContainer = (id) => dispatch(actions.stopContainer(id));
	const runStoppedContainer = (id) => dispatch(actions.runStoppedContainer(id));
	const getImages = (data) => dispatch(actions.getImages(data));
	const runImage = (id) => dispatch(actions.runImage(id));
	const removeImage = (id) => dispatch(actions.removeImage(id));

	// const getRunningContainers = (data) => dispatch(actions.getRunningContainers(data))

	// useSelector Allows you to extract data from the Redux store state, using a selector function.
	const runningList = useSelector((state) => state.lists.runningList);

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
			let value = w.convert(stdout);
			let convertedValue = w.convertArrToObj(value);
			//console.log(convertedValue);

			for (let i = 0; i < convertedValue.length; i++) {
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
			// do some operations here to create a container with the information retrieved from stdout
			// then, for each container created, call StopContainer by passing in the created container as argument
			addStoppedContainer(stdout);
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

	const initialImages = () => {
		exec('docker images', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			// do some operation on stdout
			getImages();
		})
	}

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

	useEffect(() => {
		initialRunning();
	}, []);

	// useEffect(() => {

	// }, [data]);
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
					<Route path="/">
						<Running runningList={runningList} />
					</Route>
					<Route path="/stopped">
						<Stopped />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
