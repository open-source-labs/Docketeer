import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import '../../assets/styles.css';
import * as helper from "./helper/commands";


const App = (props) => {
	const dispatch = useDispatch();
	const addRunningContainers = (data) => dispatch(actions.addRunningContainers(data));
	const addStoppedContainers = (data) => dispatch(actions.addStoppedContainers(data));
	const addExistingImages = (data) => dispatch(actions.getImages(data))


  const runningList = useSelector((state) => state.lists.runningList);
  const stoppedList = useSelector((state) => state.lists.stoppedList);
  const imagesList = useSelector((state) => state.lists.imagesList);

	useEffect(() => {
		helper.addRunning(runningList, addRunningContainers);
		helper.addStopped(stoppedList, addStoppedContainers);
		helper.addImages(imagesList, addExistingImages);
	}, [])

	return (
		<Router>
			<div className="container">
				<nav className="tab">
					<ul>
						<li>
							<Link onClick={() => helper.addRunning(runningList, addRunningContainers)} to="/">Running</Link>
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
						<Images runIm={helper.runIm} />
					</Route>
					<Route path="/stopped">
						<Stopped runStopped={helper.runStopped} remove={helper.remove} />
					</Route>
					<Route path="/">
						<Running stop={helper.stop} />
					</Route>
				</Switch>
			</div>
		</Router>
	);

};

export default App;
