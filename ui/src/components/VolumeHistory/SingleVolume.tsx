/* eslint-disable react/prop-types */
// we import Dispatch and SetStateAction to type declare the result of invoking useState
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { VolumeObj } from '../../../ui-types';
import globalStyles from '../global.module.scss';
import styles from './VolumeHistory.module.scss';
import { ContainerPS } from '../../../../types';

interface SVJSX {
  volName: string;
  onHover: () => void;
  removeClick: (arg0: string) => void;
  containers: ContainerPS[];
}

const SingleVolume = ({volName, onHover, removeClick, containers}: SVJSX): React.JSX.Element => {

  return (
              <div className={`${styles.volumesCard} ${styles.card}`}>
                <div onMouseOver={onHover}>
                  <h3>{`${volName.substring(0, 20)}...`}</h3>
                </div>
                <div>
                  {containers.length ? (
                    containers.map((container, j) => (
                      <div key={`vol-${j}`}>
                        <strong>Container: </strong>
                        {container.Names}
                        <br />
                        <strong>Status: </strong>
                        {container.State}
                        <br />
                        <strong>Runtime: </strong>
                        {container.Status}
                      </div>
                    ))
                  ) : (
                    <div>
                      No container found in this volume
                    </div>
                  )}
                </div>
                <button
                  className={globalStyles.button1}
                  onClick={() => removeClick(volName)}
                >
                  Remove Volume
                </button>
              </div>
            
    

  );
};

export default SingleVolume;