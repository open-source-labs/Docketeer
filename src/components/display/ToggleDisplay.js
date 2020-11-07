/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const ToggleDisplay = (props) => {

	const [toggle, setToggle] = useState(false);
	const tog = () => {
		// if (!toggle) setToggle(true);
		// else setToggle(false);
		setToggle(!toggle);
	}
	console.log('inside toggleDisplay with props: ', props, props.ele)

	return (
		<div>
			<div onClick={() => tog()} className="toggle-button">
				{
					toggle ? <button className="btn toggle-button-detail">Hide Details <i className="fas fa-arrow-up arrow"></i></button> :
						<button className="btn toggle-button-detail ">Show Details <i className="fas fa-arrow-down arrow"></i></button>
				}
			</div>
			{toggle ? <div className="toggle-box">
				<li>Mem Usage / Limit: {props.container.MemUsage}</li>
				<li>Net I/O: {props.container.NetIO}</li>
				<li>Block I/O: {props.container.BlockIO}</li>
				<li>PIDS: {props.container.PIDS}</li>
			</div> : <></>}

		</div>
	)
}

export default ToggleDisplay;