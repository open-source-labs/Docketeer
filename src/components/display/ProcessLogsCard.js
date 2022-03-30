
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

// Line 14, conditional statement was added because of difference in property name. 
// runningList.Container has "Name" property while StoppedList.container has "Names"
// It is best to correct this inconsistency to remove the conditional statement. 
