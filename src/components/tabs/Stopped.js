import React from 'react';
import StoppedContainers from '../display/StoppedContainers';
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/actions";


const Stopped = (props) => {
	const dispatch = useDispatch();
	const removeContainer = (id) => dispatch(actions.removeContainer(id));
	const runStoppedContainer = (data) => dispatch(actions.runStoppedContainer(data));
	const stoppedList = useSelector((state) => state.lists.stoppedList);

	const stopTesting = stoppedList.map(ele => {
		return (
			<div className="box">
				<div className="stopped-header">
					{/* <header><i class="fas fa-ban"></i> STOPPED</header> */}
					<header>Id : {ele['cid']}</header>

				</div>
				
				<div className="stopped-info">
				<li>Img: {ele['img']}</li>
				<li>Created: {ele['created']}</li>
				</div>
				<div className="stopped-button">
				<button onClick={() => props.runStopped(ele['cid'], runStoppedContainer)}>RUN</button>
				<button onClick={() => props.remove(ele['cid'], removeContainer)}>REMOVE</button>
				</div>
			</div>


		)
	});

	return (
		<body>
			<div className="renderContainers">
				{stopTesting}
			</div>
		</body>
	)
}

export default Stopped;