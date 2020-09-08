import React from 'react';
import RunningContainers from "../display/RunningContainers";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../actions/actions";
//import * as actions from "../../actions/actions";

const Running = (props) => {
	const dispatch = useDispatch();
	const stopRunningContainer = (id) => dispatch(actions.stopRunningContainer(id));
	const runningList = useSelector((state) => state.lists.runningList);

	//['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids']
	const renderRunningList = runningList.map(ele => {
		return (
			<div className="box">
				<div className="box-label">
					<h4><i class="far fa-window-maximize"></i> Name: {ele['name']}</h4>
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
		<body>
			<div className="renderContainers">
				{renderRunningList}
			</div>			
		</body>
	)
}

export default Running;