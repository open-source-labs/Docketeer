/**
 * @module ProcessLogsCard
 * @description Process Logs box to display information of a Docker Container. This componenet will get cloned 
 * multiple times for each running and not running container. 
 * Note: Within the box-label div, the h3 tag contains a conditional statement. This is due to inconsistent 
 * naming of states for both running and not running container lists. 
 */


import React from 'react';
import PropTypes from 'prop-types';
import ProcessLogsTable from '../display/ProcessLogsTable';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

const ProcessLogsCard = props =>{    
  

  return (


    <div className="box" key={`${props.status}Box-${props.index}`}>

      <div className="box-label">
        <h3>{props.container.Name || props.container.Names}</h3>
        <p>ID: {props.container.ID}</p>
      </div>
  
      <div className="stopped-info">
        <strong>Status: </strong> {props.status}
      </div>

    </div>

  );
};

ProcessLogsCard.propTypes = {
  container:PropTypes.object,
  index: PropTypes.number,
  status:PropTypes.string
};

export default ProcessLogsCard;

