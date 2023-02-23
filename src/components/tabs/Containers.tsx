/* eslint-disable react/prop-types */
import React from 'react';
import { Chart } from 'react-chartjs-2';
import ToggleDisplay from '../display/ToggleDisplay';
import { ContainerType, ChartInfoType } from '../../../types';
import { useAppSelector } from '../../redux/reducers/hooks';
import useHelper from '../helper/commands';

/*
 * Display all running and stopped containers
 */

const Containers = () => {
  const { runStopped, remove, stop } = useHelper();

  // Accessing state
  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );

  // Helper rendering function for Container component
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
            <div
              className='card-actions justify-end'
              onClick={() => runStopped(container['ID'])}
            >
              <button className='btn btn-primary'>RUN</button>
            </div>
          </div>
        </div>
      );
    }
  );

  // Helper rendering function for Container component
  const renderRunningList = runningList.map(
    (container: ContainerType, i: number) => {
      const cpuData = parseFloat(
        container.CPUPerc.substring(0, container.CPUPerc.length - 1)
      ).toFixed(2);
      const memoryData = parseFloat(
        container.MemPerc.substring(0, container.MemPerc.length - 1)
      ).toFixed(2);
      const stack = 'stack';
      const chartInfo: ChartInfoType = {
        labels: ['CPU', 'Memory'],
        datasets: [
          {
            stack,
            label: Math.random().toString(),
            data: [cpuData, memoryData],
            backgroundColor: ['rgba(44, 130, 201, 1)', 'rgba(19, 221, 29, 1)'],
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            barPercentage: 0.45,
          },
          {
            stack,
            label: Math.random().toString(),
            // data: [(100 - Number(cpuData)).toFixed(2), (100 - Number(memoryData)).toFixed(2)],
            data: ['100', '100'],
            backgroundColor: [
              'rgba(155, 198, 233, 1)',
              'rgba(217, 252, 219, 1)',
            ],
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            barPercentage: 0.45,
          },
        ],
      };

      return (
        <div className='box box-running' key={`runningBox-${i}`}>
          <div className='box-label'>
            <h3>{container.Name}</h3>
            <p>Image: {container.Image}</p>
            <p>ID: {container.ID}</p>
          </div>
          <div className='box-info'>
            <div className='chart'>
              <div className='chart-label'>
                <div className='chart-label-container'>
                  <div className='cpuBox'></div>
                  <div>
                    <span className='chart-label-text'>{cpuData}%</span>
                  </div>
                </div>
                <div className='chart-label-container'>
                  <div className='memoryBox'></div>
                  <div>
                    <span className='chart-label-text'>{memoryData}%</span>
                  </div>
                </div>
              </div>
              <div className='chart-info'>
                <Chart
                  type='bar'
                  data={chartInfo}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: {
                        stacked: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <ToggleDisplay container={container} />
          </div>
          <div className='stop-btn-box'>
            <button className='stop-btn' onClick={() => stop(container.ID)}>
              STOP
            </button>
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
              {renderStoppedList}
            </div>
          </div>
        </div>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
          <div className='card-body space-y-2'>
            <h2 className='card-title text-sm'>STOPPED CONTAINERS</h2>
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
