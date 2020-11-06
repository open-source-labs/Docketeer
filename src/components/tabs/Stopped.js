/* eslint-disable react/prop-types */
import React from 'react';

/**
 * 
 * @param {*} props 
 * Display all stopped containers with functionality
 */
const Stopped = (props) => {

	const renderStoppedList = props.stoppedList.map((ele, i) => {
		return (
			<div className="box" key={`stoppedBox${i}`}>
				<div className="box-label">
					<h3>{ele['name']}</h3>
					<p>{ele['cid']}</p>
				</div>

				<div className="stopped-info">
					<li>Img: {ele['img']}</li>
					<li>Created: {ele['created']}</li>
					<li>name: {ele['name']}</li>
				</div>
				<div className="stopped-button">
					<button className="run-btn" onClick={() => props.runStopped(ele['cid'], props.runStoppedContainer)}>RUN</button>
					<button className="stop-btn" onClick={() => props.remove(ele['cid'], props.removeContainer)}>REMOVE</button>
				</div>
			</div>


		)
	});
	
	return (
		<div className="renderContainers">
			<div className="header">
				<span className="tabTitle">Exited Containers</span>
				<span></span>
			</div>
			<div className="containers">
				{renderStoppedList}
			</div>
		</div>
	)
}

export default Stopped;