import React, { useState } from 'react';
import RunningContainers from "../display/RunningContainers";
import { useSelector, useDispatch } from "react-redux";
import * as helper from "../helper/commands"


import * as actions from "../../actions/actions";
//import * as actions from "../../actions/actions";



const Running = (props) => {
	const dispatch = useDispatch();
	const stopRunningContainer = (id) => dispatch(actions.stopRunningContainer(id));
	const runningList = useSelector((state) => state.lists.runningList);
	const [run, setRun] = useState('');
	const addRunningContainers = (data) => dispatch(actions.addRunningContainers(data));

	const handleClick = (e) => {
		e.preventDefault();
		props.runIm(run, runningList, helper.addRunning, addRunningContainers)
	}

	//['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids']
	const renderRunningList = runningList.map((ele, i) => {
		return (
			<div className="box" key={`runningBox${i}`}>
				<div className="box-label">
					<h4><i className="far fa-window-maximize"></i> Name: {ele['name']}</h4>
					<h4>ContainerId : {ele['cid']}</h4>
				</div>
				<div className="box-info">
					<li>CPU %: {ele['cpu']}</li>
					<li>Mem Usage / Limit: {ele['mul']}</li>
					<li>Mem %: {ele['mp']}</li>
					<li>Net I/O: {ele['net']}</li>
					<li>Block I/O: {ele['block']}</li>
					<li>PIDS: {ele['pids']}</li>
				</div>
				<div className="box-button">
					<button onClick={() => props.stop(ele['cid'], stopRunningContainer)}>STOP</button>
				</div>
			</div>
		)
	});

	return (
		<div className="renderContainers">
			<div className="header">
				<h1>Running Containers</h1>
				<div className="runByButton">
					<label>Enter Image ID or Repo</label>
					<span><input type="text" value={run} onChange={(e) => { setRun(e.target.value) }}></input></span>
					<button onClick={(e) => handleClick(e)}>Run</button>
				</div>
			</div>
			<div className="containers">
				{renderRunningList}
			</div>
		</div>
	)
}

export default Running;