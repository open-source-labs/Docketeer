import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogsCardProps } from '../../../types';

import styles from './ProcessLogsCard.module.scss';
import globalStyles from '../global.module.scss';

/**
 * @module | ProcessLogsCard.tsx
 * @description | Provides container cards organized based on container status; clicking will allow user to view container-specific process logs
 **/

const ProcessLogsCard = (props: LogsCardProps): JSX.Element => {
  const navigate = useNavigate();
  
  return (
    <div className={globalStyles.card}>
      <div className={styles.test}>
        <h2>{props.container.Names}</h2>
        <p>Container ID: {props.container.ID}</p>
        <p>Container Status: {props.status}</p>
        <div>
          <button
            className={globalStyles.buttonSmall}
            onClick={() => navigate(`/home/logTable/${props.container.ID}`)}
          >
            VIEW LOGS
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProcessLogsCard;
