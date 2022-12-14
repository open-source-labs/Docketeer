/* eslint-disable no-tabs */
/* eslint-disable react/prop-types */
import React from 'react';
import { convertToMetricsArr } from '../helper/parseContainerFormat';
import { Chart } from 'react-chartjs-2';
import LineChartDisplay from '../display/LineChartDisplay';

/**
 * Display general metrics
 * 
 * @param {*} props
 */
const Metrics = (props) => {
  const result = convertToMetricsArr(props.runningList);
  const cpuData = (100 - result[0]).toFixed(2);
  const memoryData = (100 - result[1]).toFixed(2);

  const cpu = {
    labels: [`Available: ${cpuData}%`, `Usage: ${result[0].toFixed(2)}%`],
    datasets: [
      {
        label: 'CPU',
        backgroundColor: ['rgba(44, 130, 201, 1)', 'rgba(19, 221, 29, 1)'],
        data: [cpuData, result[0]],
      },
    ],
  };

  const memory = {
    labels: [`Available: ${memoryData}%`, `Usage: ${result[1].toFixed(2)}%`],
    datasets: [
      {
        label: 'Memory',
        backgroundColor: ['rgba(44, 130, 201, 1)', 'rgba(19, 221, 29, 1)'],
        data: [memoryData, result[1]],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: { display: true, text: 'MEMORY', font: {size: 20}},
      tooltips: { enabled: true, mode: 'index' },
      legend: {display: false},
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          const percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
      },
    },
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: { display: true, text: 'CPU', font: {size: 20}},
      tooltips: { enabled: false },
      legend: {display: false},
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          const percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
      },
    },
  };

  return (
    <div className='renderContainers'>
      <div className='header'>
        <h1 className='tabTitle'>Metrics</h1>
        <h2> 
          <a target="_blank" rel="noreferrer" href= "https://docs.docker.com/engine/reference/commandline/stats/#examples">Click here</a> for more information on these metrics
        </h2>
      </div>
      <div className='metric-section-title'>
        <h3>Aggregate</h3>
      </div>
      <div className='aggregate-conatiner'>
        <div className='pieChart'>
          <Chart 
            key='pie-cpu'
            type='pie'
            data={cpu} 
            options={options2} 
            width={2000} 
            height={1300} />
          <div className='legend-container'>
            <div className='legend-section'>
              <div className='avaliable-box'></div>
              <p className='legend-text'>Available {Math.round(cpuData)}%</p>
            </div>
            <div className='legend-section'>
              <div className='usage-box'></div>
              <p className='legend-text'>Usage {Math.round(result[0].toFixed(2))}%</p>
            </div>
          </div>
        </div>

        <div className='pieChart'>
          <Chart 
            key='pie-memory'
            type='pie'
            data={memory} 
            options={options} 
            width={2000} 
            height={1300} 
          />
          <div className='legend-container'>
            <div className='legend-section'>
              <div className='avaliable-box'></div>
              <p className='legend-text'>Available {Math.round(memoryData)}%</p>
            </div>
            <div className='legend-section'>
              <div className='usage-box'></div>
              <p className='legend-text'>Usage {Math.round(result[1].toFixed(2))}%</p>
            </div>
          </div>
        </div>

        <div className=''>
          <div className='chart-container'>
            <h1 className='chart-title'>NET IO:</h1>
            <p className='chart-number'>
              {Math.floor(result[2][0])}kB / {Math.floor(result[2][1])}kB
            </p>
          </div>
          <div className='chart-container'>
            <h1 className='chart-title'>BLOCK IO:</h1>
            <p className='chart-number'>
              {Math.floor(result[3][0])}B / {Math.floor(result[3][1])}B
            </p>
          </div>
        </div>
      </div>
      <LineChartDisplay />
    </div>
  );
};

export default Metrics;