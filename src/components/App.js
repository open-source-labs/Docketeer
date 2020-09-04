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
	const addRunningContainers = (data) => dispatch(actions.addRunningContainers(data));
	const removeContainer = (id) => dispatch(actions.removeContainer(id));
	const stopRunningContainer = (id) => dispatch(actions.stopRunningContainer(id));
	const addStoppedContainers = (data) => dispatch(actions.addStoppedContainers(data));
	const runStoppedContainer = (id) => dispatch(actions.runStoppedContainer(id));
	const addExistingImages = (data) => dispatch(actions.getImages(data))

	// useSelector Allows you to extract data from the Redux store state, using a selector function.

	const runningList = useSelector((state) => state.lists.runningList);
	const stoppedList = useSelector((state) => state.lists.stoppedList);
	const imagesList = useSelector((state) => state.lists.imagesList);


	// on app start-up, get the containers that are already running by calling addRunning
	const addRunning = () => {
		exec("docker stats --no-stream", (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			let value = parseContainerFormat.convert(stdout);
			let objArray = ['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids'];
			let convertedValue = parseContainerFormat.convertArrToObj(value, objArray);
			const newList = []
			for (let i = 0; i < convertedValue.length; i++) {
				let isInTheList = false
				for (let container of runningList) {
					if (container.id === convertedValue[i].id) {
						isInTheList = true
					}
				}
				if (!isInTheList) {
					newList.push(convertedValue[i])
				}
			}
			if (newList.length > 0) {
				addRunningContainers(newList)
			}
		});
	};

	const addStopped = () => {
		exec('docker ps -f "status=exited"', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			let value = parseContainerFormat.convert(stdout);
			//value => array
			const result = [];
			//tempoary we will have it as manual number
			for (let i = 0; i < value.length; i++) {
				let innerArray = [];
				innerArray.push(value[i][0]); // id
				innerArray.push(value[i][1]); // image
				if (!isNaN(parseInt(value[i][3]))) {
					innerArray.push(value[i][3] + ' days ago'); // created 
				} else {
					innerArray.push(value[i][6] + ' days ago');
				}
				result.push(innerArray);
			}
			let objArray = ['cid', 'img', 'created'];
			let convertedValue = parseContainerFormat.convertArrToObj(result, objArray);

			const newList = []
			for (let i = 0; i < convertedValue.length; i++) {
				let isInTheList = false
				for (let container of stoppedList) {
					if (container.id === convertedValue[i].id) {
						isInTheList = true
					}
				}
				if (!isInTheList) {
					newList.push(convertedValue[i])
				}
			}
			if (newList.length > 0) {
				addStoppedContainers(newList)
			}
		});
	};

	const addImages = () => {
		exec(`docker images`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			let value = parseContainerFormat.convert(stdout);
			let objArray = ['reps', 'tag', 'imgid', 'size']
			const resultImages = [];
			for (let i = 0; i < value.length; i++) {
				let innerArray = [];
				if (value[i][0] !== '<none>') {
					innerArray.push(value[i][0])
					innerArray.push(value[i][1])
					innerArray.push(value[i][2])
					innerArray.push(value[i][6])
					resultImages.push(innerArray)
				}
			}
			let convertedValue = parseContainerFormat.convertArrToObj(resultImages, objArray);
			const newList = []
			for (let i = 0; i < convertedValue.length; i++) {
				let isInTheList = false
				for (let container of imagesList) {
					if (container.id === convertedValue[i].id) {
						isInTheList = true
					}
				}
				if (!isInTheList) {
					newList.push(convertedValue[i])
				}
			}
			if (newList.length > 0) {
				addExistingImages(newList)
			}
		});
	}

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
			stopRunningContainer(id);
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
			console.log(stdout)
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

	// useEffect(() => {
	// 	addRunning();
	// }, [runningList]);

	// useEffect(() => {
	// 	addStopped();
	// }, [stoppedList]);

	// useEffect(() => {
	// 	addImages();
	// }, [imagesList]);

	useEffect(() => {
		addRunning();
		addStopped();
		addImages();
	}, [])



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
						<Stopped runStopped={runStopped} remove={remove} />
					</Route>
					<Route path="/">
						<Running stop={stop} />
					</Route>
				</Switch>
			</div>
		</Router>
	);

};

export default App;
