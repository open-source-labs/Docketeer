import React from 'react';
import RunningContainers from "../display/RunningContainers";
import { useSelector } from "react-redux";

//import * as actions from "../../actions/actions";


const Running = () => {

    const runningList = useSelector((state) => state.containers.runningList);
//['Container Id', 'Name', 'CPU %', 'Mem Usage / Limit', 'Mem %', 'Net I/O', 'Block I/O', 'PIDS']
// ['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids']
    const testing = runningList.map(ele => {
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

        </div>


        )
    });

    return (
        <div>
            I am in RunningStopped Hello!!! This is going to render
            <div>
            <RunningContainers />
            </div>
            <div>
                {testing}
                
            </div>
        </div>
    )
}

export default Running;