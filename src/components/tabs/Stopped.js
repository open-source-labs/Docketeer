import React from 'react';
import StoppedContainers from '../display/StoppedContainers';
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/actions";


const Stopped = (props) => {
	const dispatch = useDispatch();
	const removeContainer = (id) => dispatch(actions.removeContainer(id));
	const runStoppedContainer = (id) => dispatch(actions.runStoppedContainer(id));
	const stoppedList = useSelector((state) => state.lists.stoppedList);

	const stopTesting = stoppedList.map(ele => {
		return (
			<div>

				<ul>ContainerId : {ele['cid']}</ul>
				<ul>Img: {ele['img']}</ul>
				<ul>Created: {ele['created']}</ul>
				<button onClick={() => props.runStopped(ele['cid'], runStoppedContainer)}>RUN</button>
				<button onClick={() => props.remove(ele['cid'], removeContainer)}>REMOVE</button>

			</div>


		)
	});

	return (
		<div>
			I am in Stopped Hello!!! This is going to render
			<div>
				<StoppedContainers />
			</div>
			<div>
				{stopTesting}
			</div>
		</div>
	)
}

export default Stopped;