import React, { useEffect, useState } from "react";
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
import parseContainerFormat from "./helper/parseContainerFormat";
import "../css/styles.css";
import * as helper from "./helper/commands";

const App = (props) => {
	const dispatch = useDispatch();
	const addRunningContainers = (data) =>
		dispatch(actions.addRunningContainers(data));
	const addStoppedContainers = (data) =>
		dispatch(actions.addStoppedContainers(data));
	const addExistingImages = (data) => dispatch(actions.getImages(data));
	const refreshRunningContainers = (data) =>
		dispatch(actions.refreshRunningContainers(data));
	const refreshStoppedContainers = (data) =>
		dispatch(actions.refreshStoppedContainers(data));
	const refreshImagesList = (data) => dispatch(actions.refreshImages(data));
	//Added
	const composeymlFiles = (data) => dispatch(actions.composeymlFiles(data));
	const getComposeYmlFiles = (data) => dispatch(actions.getComposeYmlFiles(data));

	//Stopped Added
	const removeContainer = (id) => dispatch(actions.removeContainer(id));
	const runStoppedContainer = (data) => dispatch(actions.runStoppedContainer(data));

	const runningList = useSelector((state) => state.lists.runningList);
	const stoppedList = useSelector((state) => state.lists.stoppedList);
	const imagesList = useSelector((state) => state.lists.imagesList);
	//Added
	const networkList = useSelector((state) => state.lists.networkList);

	//Images


	const [selected, setSelected] = useState('/');

	useEffect(() => {
		// helper.addRunning(runningList, addRunningContainers);
		// helper.addStopped(stoppedList, addStoppedContainers);
		// helper.addImages(imagesList, addExistingImages);
		const interval = setInterval(() => {
			helper.refreshRunning(refreshRunningContainers, runningList);
			helper.refreshStopped(refreshStoppedContainers);
			helper.refreshImages(refreshImagesList)
		}, 3000);

		helper.displayNetwork(getComposeYmlFiles);


		return () => clearInterval(interval);
	}, [])
	const selectedStyling = {
		background: "#e1e4e6",
		color: "#042331",
		borderTopRightRadius: "10px",
		borderBottomRightRadius: "10px",
	}
	return (
		<Router>
			<div className="container">
				<nav className="tab">
					<header id="title">Docketeer</header>
					<div className="viewsAndButton">
						<ul>
							<li >
								<Link to="/" style={selected === "/" ? selectedStyling : {}} onClick={() => { setSelected((sel) => '/') }}>
									<i className="fas fa-box-open"></i> Running Containers
                </Link>
							</li>
							<li >
								<Link to="/stopped" style={selected === "/stopped" ? selectedStyling : {}} onClick={() => setSelected('/stopped')}>
									<i className="fas fa-archive"></i> Exited Containers
                </Link>
							</li>
							<li >
								<Link to="/images" style={selected === "/images" ? selectedStyling : {}} onClick={() => setSelected('/images')} >
									<i className="fas fa-database"></i> Images
                </Link>
							</li>
							<li >
								<Link to="/metrics" style={selected === "/metrics" ? selectedStyling : {}} onClick={() => setSelected('/metrics')} >
									<i className="fas fa-chart-pie"></i> Metrics
                </Link>
							</li>
							<li >
								<Link to="/yml" style={selected === "/yml" ? selectedStyling : {}} onClick={() => setSelected('/yml')} >
									<i className="fas fa-file-upload"></i> Docker Compose
                </Link>
							</li>
						</ul>
						<div>
							<button className="btn" onClick={(e) => helper.handlePruneClick(e)}>
								System Prune
              </button>
						</div>
					</div>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/metrics">
						<Metrics showGeneralMetrics={helper.showGeneralMetrics} runningList={runningList} />
					</Route>
					<Route path="/yml">
						<Yml networkList={networkList} composeymlFiles={composeymlFiles} />
					</Route>
					<Route path="/images">
						<Images runIm={helper.runIm} removeIm={helper.removeIm} addRunningContainers={addRunningContainers} refreshImagesList={refreshImagesList} imagesList={imagesList} runnningList={runningList} />
					</Route>
					<Route path="/stopped">
						<Stopped runStopped={helper.runStopped} remove={helper.remove} removeContainer={removeContainer} runStoppedContainer={runStoppedContainer} stoppedList={stoppedList} />
					</Route>
					<Route path="/">
						<Running runIm={helper.runIm} stop={helper.stop} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
