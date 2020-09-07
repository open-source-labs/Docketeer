import React from 'react';
import { useSelector } from "react-redux";
import * as actions from "../../actions/actions";
import { convertToMetricsArr } from '../helper/parseContainerFormat';

const Metrics = (props) => {

    const runningList = useSelector((state) => state.lists.runningList);
    let result = convertToMetricsArr(runningList);
    
    return (
        <div className="main-render">
            <div className="renderContainers">
                <div className="box">
                    <p>CPU: {result[0]} %</p>
                    <p>MEMORY: {result[1]} %</p>
                    <p>NET IO: {result[2][0]}kB / {result[2][1]}B</p>
                    <p>BLOCK IO: {result[3][0]}B / {result[3][1]}B</p>
			    </div>
            </div>
        </div>
    )
}

export default Metrics;