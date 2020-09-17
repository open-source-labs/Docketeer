import React, { useState } from 'react';

const ToggleDisplay = (props) => {

    const [toggle, setToggle] = useState(false);
    const tog = () => {
        if(!toggle) setToggle(true);
        else setToggle(false);
    }

    return (
        <div>
            <div onClick={()=> tog()} className="toggle-button">
            {
             toggle ? <button className="btn toggle-button-detail">Hide Details <i class="fas fa-arrow-up arrow"></i></button> :
             <button className="btn toggle-button-detail ">Show Details <i class="fas fa-arrow-down arrow"></i></button>
            }
            </div>
            {toggle ? <div className="toggle-box">
            <li>Mem Usage / Limit: {props.ele['mul']}</li>
            <li>Net I/O: {props.ele['net']}</li>
            <li>Block I/O: {props.ele['block']}</li>
            <li>PIDS: {props.ele['pids']}</li>
            </div> : <></> }
            
            {/* <p onClick={()=>props.toggleClick(ele['cid'])}>Details</p>
            {prop.ele['toggle'] ? <div>
            <li>Mem Usage / Limit: {props.ele['mul']}</li>
            <li>Net I/O: {props.ele['net']}</li>
            <li>Block I/O: {props.ele['block']}</li>
            <li>PIDS: {props.ele['pids']}</li>
            </div> : <></> }             */}
        </div>
    )
}

export default ToggleDisplay;