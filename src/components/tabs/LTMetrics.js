/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertToMetricsArr } from '../helper/parseContainerFormat';
import { Pie, Line } from 'react-chartjs-2';
import * as actions from '../../actions/actions';
import query from '../helper/psqlQuery';
import * as helper from '../helper/commands';
import * as queryType from '../../constants/queryTypes';
import {Link, Redirect, BrowserRouter} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as categories from '../../constants/notificationCategories';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

/**
 *
 * @param {*} props
 * Display general metrics
 */
const Metrics = (props) => {
  const [activeContainers, setActiveContainers] = useState({});
  const [gitUrls, setGitUrls] = useState([]);
  const [timePeriod, setTimePeriod] = useState('4');
  const memory = useSelector((state) => state.lists.graphMemory);
  const cpu = useSelector((state) => state.lists.graphCpu);
  const axis = useSelector((state) => state.lists.graphAxis);
  const runningList = useSelector((state) => state.lists.runningList);

  const dispatch = useDispatch();

  const buildAxis = (data) => dispatch(actions.buildAxis(data));
  const buildMemory = (data) => dispatch(actions.buildMemory(data));
  const buildCpu = (data) => dispatch(actions.buildCpu(data));

  const selectedStyling = {
    background: '#e1e4e6',
    color: '#042331',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  };

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
    // const data = [
    //   {
    //     time: '1',
    //     name: 'amazing_morse',
    //     block: '0B/0B',
    //     cid: 'db06b75e6db7',
    //     cpu: '4.00%',
    //     mp: '0.18%',
    //     mul: '2.523MiB/1.945GiB',
    //     net: '50B/0B',
    //     pids: '3',
    //   },
    //   {
    //     name: 'amazing_morse',
    //     time: '2',
    //     block: '0B/0B',
    //     cid: 'db06b75e6db7',
    //     cpu: '6.00%',
    //     mp: '2%',
    //     mul: '2.523MiB/1.945GiB',
    //     net: '50B/0B',
    //     pids: '3',
    //   },
    //   {
    //     name: 'amazing_morse',
    //     time: '3',
    //     block: '0B/0B',
    //     cid: 'db06b75e6db7',
    //     cpu: '8.00%',
    //     mp: '5.18%',
    //     mul: '2.523MiB/1.945GiB',
    //     net: '50B/0B',
    //     pids: '3',
    //   },
    // ];
    // if (Object.keys(activeContainers).length > 1)
    //   data.push(
    //     {
    //       name: 'wizardly_benz',
    //       time: '1',
    //       block: '0B/0B',
    //       cid: 'db06b75e6db7',
    //       cpu: '8.00%',
    //       mp: '5.18%',
    //       mul: '2.523MiB/1.945GiB',
    //       net: '50B/0B',
    //       pids: '3',
    //     },
    //     {
    //       name: 'wizardly_benz',
    //       time: '2',
    //       block: '0B/0B',
    //       cid: 'db06b75e6db7',
    //       cpu: '10.00%',
    //       mp: '18.18%',
    //       mul: '2.523MiB/1.945GiB',
    //       net: '50B/0B',
    //       pids: '3',
    //     }
    //   );
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
    Object.keys(auxObj).forEach((containerName) => {
      buildMemory([auxObj[containerName].memory]);
      buildCpu([auxObj[containerName].cpu]);
    });

  };

  const fetchGitData = async (containerName) => {
    const ob = {};
    ob[containerName] = [];
    let time = Number(timePeriod);
    let date = new Date();
    date.setHours(date.getHours() - (time));
    date = date.toISOString()
    const url = await helper.getContainerGitUrl(containerName);
    // formate needed = 2020-10-26T18:44:25Z
    //https://api.github.com/repos/oslabs-beta/Docketeer/commits?since=%272020-10-27T17%3A14%3A17.446Z%27
    //https://api.github.com/repos/oslabs-beta/Docketeer/commits?since=2020-10-26T18%3A44%3A25Z
    

    //https://api.github.com/repos/oslabs-beta/Docketeer/commits?since=2020-10-26T21%3A40%3A22.314Z
    //https://api.github.com/repos/oslabs-beta/Docketeer/commits?since=2020-10-26T17%3A39%3A54.191Z
    if (url.rows.length) {
      const url = 'https://api.github.com/repos/oslabs-beta/Docketeer/commits?' + new URLSearchParams({
        since: `${date}`
      })
      let data = await fetch(url)
      const jsonData = await data.json();

      jsonData.forEach(commitData => {
        ob[containerName].push({time: commitData.commit.author.date, url: commitData.html_url, author: commitData.commit.author.name})
      })
    } else {
      ob[containerName].push({time: '', url: 'Connect github repo in settings' })
    }
    return ob;
  }

  
    const renderGitInfo = () => {
      Promise.all(Object.keys(activeContainers).map(container => {
        return fetchGitData(container)
      })).then(data => setGitUrls(data))
    }
    
    // [{container: [{time: x, url: x}]},{}]
      let gitData;
      gitData = gitUrls.map(el =>  {
        let name = Object.keys(el);
        const li = [<tr><th>Date</th><th>Time</th><th>URL</th><th>Author</th></tr>]
        el[name].forEach(ob => {
          let author = '';
          let date = 'n/a'
          let time = 'n/a'
          let url = <Link Redirect to="/" style={selectedStyling}>Connect via settings page
        </Link>
          let text = ''
          if (ob.time.length) {
            time = ob.time;
            author = ob.author;
            text = 'Github Commits'
            url = <a href={url} target='_blank'>{text}</a>
            time = time.split('T');
            date = time[0];
            time = time[1];
            time = time.split('').slice(0, time.length - 1);
          }
        li.push(<tr><td>{date}</td><td>{time}</td><td>{url}</td><td>{author}</td></tr>)
        }) 
        return (<div><h2>{name}</h2><table className={'ltTable'}>{li}</table></div>)
      });


  // Internal Note: maybe want to fix currentList and make a state variable??
  let currentList;
  console.log('RUNNING LIST', props.runningList)
  const selectList = () => {
		const result = [];
    props.runningList.forEach((container) => {
      result.push(
        <FormControlLabel
        control={
          <Checkbox
            name={container.Name}
            value={container.Name}
            inputProps={{ 'aria-label': container.Name  }}  
          />
        } 
        label={container.Name}
      />  
      );
    });

    result.push(<div></div>);
    currentList = result;
  };

  const handleChange = (e) => {
    console.log('HIT HANDLE CHANGE')
    console.log('e.target.name', e.target.name)
		if (e.target.name === 'timePeriod') {
      console.log('HIT IF CONDITION IN HANDLE CHANGE')
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
    renderGitInfo();
	}, [activeContainers, timePeriod]);
	
  
  return (
    <div className='renderContainers'>
      <div className='header'>
        <span className='tabTitle'>Metrics</span>
      </div>
      <div style={{ marginTop: '150px' }}>
        <p>Please Select a Container</p>
        <form
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <input
            type='radio'
            id='4-hours'
            name='timePeriod'
            value='4'
            defaultChecked
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
          {currentList}
        </form>
          <p>Please Select a Time Period</p>
      </div>

      <div className='allCharts'>
        <div className='section'>
          <Line
            data={memoryObj}
            options={memoryOptions}
            // width={4000}
            // height={5000}
          />
        </div>
      </div>

      <div className='allCharts'>
        <div className='section'>
            <Line
              data={cpuObj}
              options={cpuOptions}
              // width={7000}
              // height={5000}
            />
        </div>
      </div>

          {gitData}
      <div>
      </div>
    </div>
  );
};

export default Metrics;
