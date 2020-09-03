import React from 'react';
import StoppedContainers from '../display/StoppedContainers';
import { useSelector } from "react-redux";


const Stopped = () => {

    const stoppedList = useSelector((state) => state.lists.stoppedList);

    const stopTesting = stoppedList.map(ele => {
        return (
            <div>
            
            <ul>ContainerId : {ele['cid']}</ul>
            <ul>Img: {ele['img']}</ul>
            <ul>Created: {ele['created']}</ul>
           
    
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