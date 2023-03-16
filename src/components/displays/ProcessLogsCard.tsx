import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LogsCardProps } from '../../../types';

/**
 * @module | ProcessLogsCard.tsx
 * @description | Provides container cards organized based on container status; clicking will allow user to view container-specific process logs
 **/

const ProcessLogsCard = (props: LogsCardProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="card w-96 glass">
      <div className="card-body">
        <h2 className="card-title">{props.container.Names}</h2>
        <div className="divider py-1"></div>
        <p className="text-xs">Container ID: {props.container.ID}</p>
        <p className="text-xs">Container Status: {props.status}</p>
        <div className="card-actions justify-end items-center">
          <button
            className="btn btn-primary px-10 py-0 w-35 text-center font-bold text-primary-content text-sm"
            onClick={() => navigate(`/home/logTable/${props.container.ID}`)}
          >
            VIEW LOGS
          </button>
        </div>
      </div>
    </div>
  );
};

ProcessLogsCard.propTypes = {
  container: PropTypes.object,
  index: PropTypes.number,
  status: PropTypes.string,
};

export default ProcessLogsCard;
