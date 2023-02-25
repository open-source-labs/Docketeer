/* eslint-disable react/prop-types */
import React from 'react';
import { ContainerType } from '../../../types';
import { useAppSelector } from '../../redux/reducers/hooks';
import useHelper from '../helper/commands';

/*
 * Display all running and stopped containers
 */

const Containers = () => {
  const { runStopped, remove, stop } = useHelper();

  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );

  const renderStoppedList = stoppedList.map(
    (container: ContainerType, i: number) => {
      return (
        <div className='card w-96 glass' key={i}>
          <div className='card-body'>
            <h2 className='card-title'>{container.Names}</h2>
            <div className='divider py-1'></div>
            <p className='text-xs'>{container.Image}</p>
            <p className='text-xs'>{container.ID}</p>
            <p className='text-xs'>{container.RunningFor}</p>
            <div className='card-actions justify-end'>
              <button
                className='btn bg-success text-success-content'
                onClick={() => runStopped(container['ID'])}
              >
                RUN
              </button>
              <button
                className='btn bg-error text-error-content'
                onClick={() => remove(container['ID'])}
              >
                REMOVE
              </button>
            </div>
          </div>
        </div>
      );
    }
  );

  const renderRunningList = runningList.map(
    (container: ContainerType, i: number) => {
      return (
        <div className='card w-96 glass' key={i}>
          <div className='card-body'>
            <h2 className='card-title'>{container.Name}</h2>
            <div className='divider py-1'></div>
            <p className='text-xs'>{container.Image}</p>
            <p className='text-xs'>{container.ID}</p>
            <p className='text-xs'>{container.RunningFor}</p>
            <div className='card-actions justify-end'>
              <button
                className='btn bg-error text-error-content'
                onClick={() => stop(container.ID)}
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      );
    }
  );

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

export default Containers;
