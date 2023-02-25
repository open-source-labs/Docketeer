/* eslint-disable react/prop-types */
import React from 'react';
import ProcessLogsCard from '../display/ProcessLogsCard';
import { ContainerType } from '../../../types';
import { useAppSelector } from '../../redux/reducers/hooks';

// Display all running and stopped containers. Each box can be selected to view process log tables.

const ProcessLogs = () => {
  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );

  const renderRunningList: any[] = [];
  runningList.map((container: ContainerType, index: number) => {
    renderRunningList.push(
      <ProcessLogsCard
        key={index}
        index={index}
        container={container}
        status='Running'
      />
    );
  });

  const renderStoppedList: any[] = [];
  stoppedList.map((container: ContainerType, index: number) => {
    renderStoppedList.push(
      <ProcessLogsCard
        key={index}
        index={index}
        container={container}
        status='Stopped'
      />
    );
  });

  return (
    <>
      <div className='h-3'></div>
      <div className='usersFlex flex flex-wrap gap-3'>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
          <div className='card-body space-y-2'>
            <div className='flex justify-between items-center'>
              <h2 className='card-title text-sm'>RUNNING CONTAINERS</h2>
              <div className='stats shadow'>
                <div className='stat'>
                  <div className='stat-title'>Count</div>
                  <div className='stat-value'>{runningList.length}</div>
                </div>
              </div>
            </div>
            <div className='divider py-8'></div>
            <div className='containerFlex flex flex-wrap gap-3'>
              {renderRunningList}
            </div>
          </div>
        </div>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
          <div className='card-body space-y-2'>
            <div className='flex justify-between items-center'>
              <h2 className='card-title text-sm'>STOPPED CONTAINERS</h2>
              <div className='stats shadow'>
                <div className='stat'>
                  <div className='stat-title'>Count</div>
                  <div className='stat-value'>{stoppedList.length}</div>
                </div>
              </div>
            </div>
            <div className='divider py-8'></div>
            <div className='containerFlex flex flex-wrap gap-3'>
              {renderStoppedList}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessLogs;
