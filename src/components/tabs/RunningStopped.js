import React from 'react';
import RunningContainers from '../display/RunningContainers';
import StoppedContainers from '../display/StoppedContainers';
const RunningStopped = () => {


    return (
        <div>
            I am in RunningStopped Hello!!! This is going to render
            <div>
            <RunningContainers />
            </div>
            <div>
            <StoppedContainers />
            </div>
        </div>
    )
}

export default RunningStopped;