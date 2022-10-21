/* eslint-disable react/prop-types */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import ToggleDisplay from '../display/ToggleDisplay';

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Docker Container Chart'
    }
  },
  maintainAspectRatio: false
  // scales: {
  //   y: {
  //     beginAtZero: true,
  //     ticks: {
  //       min: 0,
  //       max: 100,
  //       stepSize: 20
  //     }
  //   }
  // }
};

// export const data = {
//   labels:
// }

/**
 * Display all running and stopped containers
 *
 * @param {*} props
 */
const Containers = (props) => {
  const image = props;
  console.log(image);
  const renderStoppedList = props.stoppedList.map((container, i) => {
    return (
      <div className='box' key={`stoppedBox-${i}`}>
        <div className='box-label'>
          <h3>{container.Names}</h3>
          <p>ID: {container.ID}</p>
        </div>

        <div className='stopped-info'>
          <ul>
            <li>
              <strong>Img: </strong>
              {container.Image}
            </li>
            <li>
              <strong>Created: </strong>
              {container.RunningFor}
            </li>
            <li>
              <strong>Name: </strong>
              {container.Names}
            </li>
          </ul>
        </div>
        <div className='stopped-button'>
          <button
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

  const renderRunningList = props.runningList.map((container, i, props) => {
    const cpuData = parseFloat(
      container.CPUPerc.substring(0, container.CPUPerc.length - 1)
    ).toFixed(2);
    const memoryData = parseFloat(
      container.MemPerc.substring(0, container.MemPerc.length - 1)
    ).toFixed(2);
    const stack = 'stack';
    const chartInfo = {
      labels: ['CPU', 'Memory'],
      datasets: [
        {
          stack,
          label: Math.random(),
          backgroundColor: ['rgba(44, 130, 201, 1)', 'rgba(19, 221, 29, 1)'],
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 1,
          data: [cpuData, memoryData]
          // barPercentage: 0.4
        },
        {
          stack,
          label: Math.random(),
          backgroundColor: ['rgba(155, 198, 233, 1)', 'rgba(217, 252, 219, 1)'],
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 1,
          data: [(100 - cpuData).toFixed(2), (100 - memoryData).toFixed(2)]
          // barPercentage: 0.4
        }
      ]
    };

    return (
      <div className='box box-running' key={`runningBox-${i}`}>
        <div className='box-label'>
          <h3>{container.Name}</h3>

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
              <Bar
                data={chartInfo}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top'
                    },
                    title: {
                      display: true,
                      text: 'Docker Container Chart'
                    }
                  },
                  height: '200px',
                  scales: {
                    y: {
                      beginAtZero: true,
                      suggestedMin: 0,
                      suggestedMax: 100
                    }
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
    <div className='renderContainers'>
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
