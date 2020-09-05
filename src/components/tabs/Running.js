import React from 'react';
import RunningContainers from "../display/RunningContainers";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../actions/actions";
//import * as actions from "../../actions/actions";

const Running = (props) => {
<<<<<<< HEAD
    
    const runningList = useSelector((state) => state.lists.runningList);

    //['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids']
    const renderRunningList = runningList.map(ele => {
    return (
        <div>
        <ul>ContainerId : {ele['cid']}</ul>
        <ul>Name: {ele['name']}</ul>
        <ul>CPU %: {ele['cpu']}</ul>
        <ul>Mem Usage / Limit: {ele['mul']}</ul>
        <ul>Mem %: {ele['mp']}</ul>
        <ul>Net I/O: {ele['net']}</ul>
        <ul>Block I/O: {ele['block']}</ul>
        <ul>PIDS: {ele['pids']}</ul>
        <button onClick={()=> props.stop(ele['cid'])}>STOP</button>
        <button>DELETE</button>
        </div>
        )
    });
=======
	const dispatch = useDispatch();
	const stopRunningContainer = (id) => dispatch(actions.stopRunningContainer(id));
	const runningList = useSelector((state) => state.lists.runningList);

	//['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids']
	const renderRunningList = runningList.map(ele => {
		return (
			<div className="box">
				<div className="box-label">
					<p>Name: {ele['name']}</p>
					<p>ContainerId : {ele['cid']}</p>
				</div>
				<div className="box-info">
					<ul>CPU %: {ele['cpu']}</ul>
					<ul>Mem Usage / Limit: {ele['mul']}</ul>
					<ul>Mem %: {ele['mp']}</ul>
					<ul>Net I/O: {ele['net']}</ul>
					<ul>Block I/O: {ele['block']}</ul>
					<ul>PIDS: {ele['pids']}</ul>
				</div>
				<div className="box-buttons">
					<button onClick={() => props.stop(ele['cid'], stopRunningContainer)}>STOP</button>
				</div>
			</div>
		)
	});
>>>>>>> 4ec5fec1a6baba6eeb55be1cd4819bd6868c7f02

	return (
		<div className="main-render">
			<div className="renderContainers">
				{renderRunningList}
			</div>
		</div>
	)
}

export default Running;