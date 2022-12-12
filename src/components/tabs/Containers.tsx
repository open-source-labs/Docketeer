/* eslint-disable react/prop-types */
import React from 'react';
import { Chart } from 'react-chartjs-2';
import ToggleDisplay from '../display/ToggleDisplay';
import { ContainerProps, ContainerType, ChartInfoType } from '../../../types'; 
/**
 * Display all running and stopped containers
 *
 * @param {*} props
 */

const Containers = (props: ContainerProps) => {
  const renderStoppedList = props.stoppedList.map((container: ContainerType, i: number) => {
    return (
      <div className='box' key={`stoppedBox-${i}`}>
        <div className='box-label'>
          <h3>{container.Names}</h3>
          <p>ID: {container.ID}</p>
        </div>

        <div className='stopped-info'>
          <ul>
            <li>
              <strong>Img: </strong>{container.Image}
            </li>
            <li>
              <strong>Created: </strong>{container.RunningFor}
            </li>
            <li>
              <strong>Name: </strong>{container.Names}
            </li>
          </ul>
        </div>
        <div className='stopped-button'>
          <button
            data-testid='run-btn'
            className='run-btn'
            onClick={() =>
              props.runStopped(container['ID'], props.runStoppedContainer)
            }
          >
            RUN
          </button>
          <button
            className='stop-btn'
            onClick={() => props.remove(container['ID'], props.removeContainer)}
          >
            REMOVE
          </button>
        </div>
      </div>
    );
  });

  const renderRunningList = props.runningList.map((container: ContainerType, i: number) => {
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
          barPercentage: 0.45
        },
        {
          stack,
          label: Math.random().toString(),
          data: [(100 - Number(cpuData)).toFixed(2), (100 - Number(memoryData)).toFixed(2)],
          backgroundColor: ['rgba(155, 198, 233, 1)', 'rgba(217, 252, 219, 1)'],
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 1,
          barPercentage: 0.45
        }
      ]
    };

    return (
      <div className='box box-running' key={`runningBox-${i}`}>
        <div className='box-label'>
          <h3>Name: {container.Name}</h3>
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
                      stacked: true
                    },
                  }
                }}
              />
            </div>
          </div>
          <ToggleDisplay container={container} />
        </div>
        <div className='box-button box-button-running'>
          <button
            className='stop-btn'
            onClick={() => props.stop(container.ID, props.stopRunningContainer)}
          >
            STOP
          </button>
        </div>
      </div>
    );
  });

  return (
    <div title='renderContainers' className='renderContainers'>
      <div className='header'>
        <h1 className='tabTitle'>
          Running Containers: {props.runningList.length}
        </h1>
      </div>
      <div className='containers'>{renderRunningList}</div>

      <div className='header'>
        <h1 className='tabTitle'>
          Exited Containers: {props.stoppedList.length}
        </h1>
      </div>
      <div className='stopped-containers'>{renderStoppedList}</div>
    </div>
  );
};

export default Containers;
