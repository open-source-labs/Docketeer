/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertToMetricsArr } from '../helper/parseContainerFormat';
import { Pie, Line } from 'react-chartjs-2';
import * as actions from '../../actions/actions';
import query from '../helper/psqlQuery';
import * as helper from '../helper/commands';
import * as queryType from '../../constants/queryTypes';
/**
 *
 * @param {*} props
 * Display general metrics
 */
const Metrics = (props) => {
  const gitCommits = [];
  const [activeContainers, setActiveContainers] = useState({});
  const [timePeriod, setTimePeriod] = useState('4');
  const memory = useSelector((state) => state.lists.graphMemory);
  const cpu = useSelector((state) => state.lists.graphCpu);
  const axis = useSelector((state) => state.lists.graphAxis);
  const runningList = useSelector((state) => state.lists.runningList);

  const dispatch = useDispatch();

  const buildAxis = (data) => dispatch(actions.buildAxis(data));
  const buildMemory = (data) => dispatch(actions.buildMemory(data));
  const buildCpu = (data) => dispatch(actions.buildCpu(data));
  const gitResults = [];
  // // example to run GET_METRICS query
  const getData = () => {
    let queryString = `SELECT * FROM metrics WHERE container_name = $1 `;
    if (Object.keys(activeContainers).length === 1) {
			queryString += `AND created_at >= now() - interval '${timePeriod} hour' ORDER BY "created_at" ASC`;
      return query(queryString, Object.keys(activeContainers));
    }
    Object.keys(activeContainers)
      .slice(1)
      .forEach((containerName, idx) => {
        const string = `OR container_name = $${idx + 2} `;
        queryString += string;
			});
		queryString += `AND created_at >= now() - interval '${timePeriod} hour'  ORDER BY "created_at" ASC`;
    return query(queryString, Object.keys(activeContainers));
  };

  const memoryObj = {
    labels: axis,
    datasets: memory,
  };
  const cpuObj = {
    labels: axis,
    datasets: cpu,
  };

  const formatData = async () => {
    buildMemory('clear');
    buildCpu('clear');
    buildAxis('clear');
   
    //if active containers is empty render the empty graphs
    if (!Object.keys(activeContainers).length) {
      return;
    }
    // DB QUERY LIKELY GOING HERE
    let output = await getData();
    const data = [
      {
        time: '1',
        name: 'amazing_morse',
        block: '0B/0B',
        cid: 'db06b75e6db7',
        cpu: '4.00%',
        mp: '0.18%',
        mul: '2.523MiB/1.945GiB',
        net: '50B/0B',
        pids: '3',
      },
      {
        name: 'amazing_morse',
        time: '2',
        block: '0B/0B',
        cid: 'db06b75e6db7',
        cpu: '6.00%',
        mp: '2%',
        mul: '2.523MiB/1.945GiB',
        net: '50B/0B',
        pids: '3',
      },
      {
        name: 'amazing_morse',
        time: '3',
        block: '0B/0B',
        cid: 'db06b75e6db7',
        cpu: '8.00%',
        mp: '5.18%',
        mul: '2.523MiB/1.945GiB',
        net: '50B/0B',
        pids: '3',
      },
    ];
    if (Object.keys(activeContainers).length > 1)
      data.push(
        {
          name: 'wizardly_benz',
          time: '1',
          block: '0B/0B',
          cid: 'db06b75e6db7',
          cpu: '8.00%',
          mp: '5.18%',
          mul: '2.523MiB/1.945GiB',
          net: '50B/0B',
          pids: '3',
        },
        {
          name: 'wizardly_benz',
          time: '2',
          block: '0B/0B',
          cid: 'db06b75e6db7',
          cpu: '10.00%',
          mp: '18.18%',
          mul: '2.523MiB/1.945GiB',
          net: '50B/0B',
          pids: '3',
        }
      );
    // build two fundtion that will return formated object for each container to in datapoins
    const graphBuilder = (containerName) => {
      const obj = {
        label: containerName,
        data: [],
        fill: false,
      };
      return obj;
    };

    const auxObj = {};

    Object.keys(activeContainers).forEach((container) => {
      auxObj[container] = {
        memory: graphBuilder(container),
        cpu: graphBuilder(container),
      };
    });

    // iterate through each row from query and buld Memory and CPU objects [{ }, {} ]
    output.rows.forEach((dataPoint) => {
      const currentContainer = dataPoint.container_name;
      auxObj[currentContainer].cpu.data.push(
        dataPoint.cpu_pct.replace('%', '')
      );
      auxObj[currentContainer].memory.data.push(
        dataPoint.memory_pct.replace('%', '')
      );
      buildAxis(dataPoint.created_at);
    });

    // {container1: cpu: {10,0, 20 }, memory: {}, timestamps: [1,2,3]}
    // {container2: cpu: {}, memory: {}, timestamps: [1,2,3,4,5]}

    Object.keys(auxObj).forEach((containerName) => {
      buildMemory([auxObj[containerName].memory]);
      buildCpu([auxObj[containerName].cpu]);
    });

  };

  const fetchGitData = async () => {
    let data = await fetch('https://api.github.com/repos/oslabs-beta/Docketeer/commits?' + new URLSearchParams({
        since: '2020-10-26T18:44:25Z'
      }))
    const jsonData = await data.json();

    // setState(jsonData)
    console.log('JSON DATA', jsonData);
    return jsonData;

  }

  const gitData = Promise.all(Object.keys(activeContainers).map(container => {
    return fetchGitData()
    // return(
    //   <div><h1>{timePeriod}</h1> <p>{container}</p></div>
    // )
  })).then(data => console.log('GIT DATA,', data))





  // Internal Note: maybe want to fix currentList and make a state variable??
  let currentList;
  const selectList = () => {
		const result = [];
    props.runningList.forEach((container) => {
      result.push(
        <div>
          <label htmlFor={container.name}>{container.name}</label>
          <input
            name={container.name}
            type='checkbox'
            value={container.name}
          ></input>
        </div>
      );
    });
    props.stoppedList.forEach((container) => {
      result.push(
        <div>
          <label htmlFor={container.name}>{container.name}</label>
          <input
            name={container.name}
            type='checkbox'
            value={container.name}
          ></input>
        </div>
      );
    });

    result.push(<div></div>);
    currentList = result;
  };



  const handleChange = (e) => {

		if (e.target.type === 'radio') {
      setTimePeriod(e.target.value);
			return;
		}
    const containerName = e.target.name;
    // deep copy the state object - shallow copy didn't work
    const copyObj = JSON.parse(JSON.stringify(activeContainers));
    if (activeContainers[containerName]) {
      delete copyObj[containerName];
    } else {
      copyObj[containerName] = true;
    }
    setActiveContainers(copyObj);
  };

  let cpuOptions = {
    tooltips: {
      enabled: true,
      mode: 'index',
    },
    title: {
      display: true,
      text: 'CPU',
      fontSize: 23,
    },
    legend: { display: true, position: 'bottom' },
    responsive: true,
    maintainAspectRatio: true,
  };

  let memoryOptions = {
    tooltips: {
      enabled: true,
      mode: 'index',
    },
    title: {
      display: true,
      text: 'MEMORY',
      fontSize: 23,
    },
    legend: { display: true, position: 'bottom' },
    responsive: true,
    maintainAspectRatio: true,
  };


	/* Consider if we can combine these two. Wasn't rendering active containers when tested*/
  selectList();
  useEffect(() => {
		formatData();
	}, [activeContainers]);
	
	useEffect(() => {
    formatData();
	}, [timePeriod]);
	
  return (
    <div className='renderContainers'>
      <div className='header'>
        <span className='tabTitle'>Metrics</span>
      </div>
      <div style={{ marginTop: '150px' }}>
        <form
          onChange={(e) => {
            handleChange(e);
          }}
        >
          {currentList}

          <input
            type='radio'
            id='4-hours'
            name='timePeriod'
            value='4'
          ></input>
          <label htmlFor='4-hours'>4 hours</label>
          <input
            type='radio'
            id='12-hours'
            name='timePeriod'
            value='12'
          ></input>
          <label htmlFor='12-hours'>12 hours</label>
          <input
            type='radio'
            id='other'
            name='timePeriod'
            value='24'
          ></input>
          <label htmlFor='24-hours'>24 hours</label>
        </form>
      </div>

      <div className='allCharts'>
        <div className='line-section'>
          <div className='lineChart'>
            <Line
              data={memoryObj}
              options={memoryOptions}
              width={4000}
              height={2600}
            />
          </div>
        </div>

        <div className='line-section'>
          <div className='lineChart'>
            <Line
              data={cpuObj}
              options={cpuOptions}
              width={4000}
              height={2600}
            />
          </div>
        </div>
      </div>
          {/* {gitData}; */}
      <div>
      </div>
    </div>
  );
};

export default Metrics;

// block: "0B/0B",
// cid: "db06b75e6db7",
// cpu: "4.00%", CPU PERCENTAGE
// mp: "0.18%", MEMORY PERCENTAGE
// mul: "2.523MiB/1.945GiB",
// name: "compassionate_goldberg",
// net: "50B/0B", TRANSMITTED / RECEIVED
// pids: "3" MAYBE

// write a handleChange function
// build state with selected containers --> ['container-1', 'container-2']
// query db for information based on current selections (for now this will be dummy data)
// create a object to be pushed into the dataset prop for the respective graph
// push the object into the graph
// component should rerender when update

// const cpu = {
// 	labels: dataLabels,
// 	datasets: [
// 		{
// 			label: activeContainers,
// 			 data: cpuData,
// 			 fill: false
// 		},
// 	],
// };
