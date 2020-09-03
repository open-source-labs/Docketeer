import React from 'react';
import RunningContainers from "../display/RunningContainers";
import { useSelector } from "react-redux";
// import * as actions from "../../actions/actions";
//import * as actions from "../../actions/actions";

const Running = (props) => {

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

    return (
        <div>
            I am in RunningStopped Hello!!! This is going to render
            <div>
                {renderRunningList}
            </div>
        </div>
    )
}

export default Running;