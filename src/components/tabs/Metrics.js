/* eslint-disable no-tabs */
/* eslint-disable react/prop-types */
import React from "react";
import { convertToMetricsArr } from "../helper/parseContainerFormat";
import { Pie } from "react-chartjs-2";
import LineChartDisplay from "../display/LineChartDisplay.js";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as categories from "../../constants/notificationCategories";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

/**
 *
 * @param {*} props
 * Display general metrics
 */
const Metrics = (props) => {
  let result = convertToMetricsArr(props.runningList);
  let cpuData = (100 - result[0]).toFixed(2);
  let memoryData = (100 - result[1]).toFixed(2);

  const cpu = {
    labels: [`Available: ${cpuData}%`, `Usage: ${result[0].toFixed(2)}%`],
    datasets: [
      {
        label: "CPU",
        backgroundColor: ["rgba(44, 130, 201, 1)", "rgba(19, 221, 29, 1)"],
        data: [cpuData, result[0]],
      },
    ],
  };

  const memory = {
    labels: [`Available: ${memoryData}%`, `Usage: ${result[1].toFixed(2)}%`],
    datasets: [
      {
        label: "Memory",
        backgroundColor: ["rgba(44, 130, 201, 1)", "rgba(19, 221, 29, 1)"],
        data: [memoryData, result[1]],
      },
    ],
  };

  let options = {
    tooltips: {
      enabled: false,
    },
    title: {
      display: true,
      text: "MEMORY",
      fontSize: 23,
    },
    legend: { display: false, position: "bottom" },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
      },
    },
  };

  let options2 = {
    tooltips: {
      enabled: false,
    },
    title: {
      display: true,
      text: "CPU",
      fontSize: 23,
    },
    legend: { display: false, position: "bottom" },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
      },
    },
  };

  // const fetchGitData = async (containerName) => {
  //   const ob = {};
  //   ob[containerName] = [];
  //   let time = Number(timePeriod);
  //   let date = new Date();
  //   date.setHours(date.getHours() - (time));
  //   date = date.toISOString()
  //   console.log('********DATE ISOOOO***********', date)
  //   const url = await helper.getContainerGitUrl(containerName);
  //   // formate needed = 2020-10-26T18:44:25Z
  //   //https://api.github.com/repos/oslabs-beta/Docketeer/commits?since=%272020-10-27T17%3A14%3A17.446Z%27
  //   //https://api.github.com/repos/oslabs-beta/Docketeer/commits?since=2020-10-26T18%3A44%3A25Z

  //   //https://api.github.com/repos/oslabs-beta/Docketeer/commits?since=2020-10-26T21%3A40%3A22.314Z
  //   //https://api.github.com/repos/oslabs-beta/Docketeer/commits?since=2020-10-26T17%3A39%3A54.191Z
  //   if (url.rows.length) {
  //     const url = 'https://api.github.com/repos/oslabs-beta/Docketeer/commits?' + new URLSearchParams({
  //       since: `${date}`
  //     })
  //     console.log('URL**********', url);
  //     let data = await fetch(url)
  //     const jsonData = await data.json();

  //     jsonData.forEach(commitData => {
  //       ob[containerName].push({time: commitData.commit.author.date, url: commitData.html_url, author: commitData.commit.author.name})
  //     })
  //   } else {
  //     ob[containerName].push({time: '', url: 'Connect github repo in settings' })
  //   }
  //   return ob;
  // }

  //   const renderGitInfo = () => {
  //     Promise.all(Object.keys(activeContainers).map(container => {
  //       return fetchGitData(container)
  //     })).then(data => setGitUrls(data))
  //   }

  //   // [{container: [{time: x, url: x}]},{}]
  //     let gitData;
  //     gitData = gitUrls.map(el =>  {
  //       let name = Object.keys(el);
  //       const li = [<tr><th>Date</th><th>Time</th><th>URL</th><th>Author</th></tr>]
  //       console.log('EL', el[name])
  //       el[name].forEach(ob => {
  //         let author = '';
  //         let date = 'n/a'
  //         let time = 'n/a'
  //         let url = <Link Redirect to="/" style={selectedStyling}>Connect via settings page
  //       </Link>
  //         let text = ''
  //         if (ob.time.length) {
  //           time = ob.time;
  //           author = ob.author;
  //           text = 'Github Commits'
  //           url = <a href={url} target='_blank'>{text}</a>
  //           time = time.split('T');
  //           date = time[0];
  //           time = time[1];
  //           time = time.split('').slice(0, time.length - 1);
  //         }
  //       li.push(<tr><td>{date}</td><td>{time}</td><td>{url}</td><td>{author}</td></tr>)
  //       })
  //       return (<div><h2>{name}</h2><table className={'ltTable'}>{li}</table></div>)
  //     });

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Metrics</h1>
      </div>
      <div className="metric-section-title">
        <h3>Aggregate</h3>
      </div>
      <div className="aggregate-conatiner">
        {/* <div className="section"> */}
        <div className="pieChart">
          <Pie data={cpu} options={options2} width={2000} height={1300} />
          <div className="legend-container">
            <div className="legend-section">
              <div className="avaliable-box"></div>
              <p className="legend-text">Available {cpuData}%</p>
            </div>
            <div className="legend-section">
              <div className="usage-box"></div>
              <p className="legend-text">Usage {result[0].toFixed(2)}%</p>
            </div>
          </div>
        </div>

        <div className="pieChart">
          <Pie data={memory} options={options} width={2000} height={1300} />
          <div className="legend-container">
            <div className="legend-section">
              <div className="avaliable-box"></div>
              <p className="legend-text">Available {memoryData}%</p>
            </div>
            <div className="legend-section">
              <div className="usage-box"></div>
              <p className="legend-text">Usage {result[1].toFixed(2)}%</p>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="">
          <div className="chart-container">
            <h1 className="chart-title">NET IO:</h1>
            <p className="chart-number">
              {result[2][0]}kB / {result[2][1]}kB
            </p>
          </div>
          <div className="chart-container">
            <h1 className="chart-title">BLOCK IO:</h1>
            <p className="chart-number">
              {result[3][0]}B / {result[3][1]}B
            </p>
          </div>
        </div>
      </div>
      <LineChartDisplay />
      {/* <div className="gitHub-table"> 
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gitData}
          </TableBody>
        </Table>
      </TableContainer>
    </div> */}
    </div>
  );
};

export default Metrics;
//   {
//   tooltips: {
//     enabled: false,
//   },
//   title: {
//     display: true,
//     text: "CPU",
//     fontSize: 23,
//   },
//   legend: { display: true, position: "bottom" },
//   responsive: false,
//   maintainAspectRatio: true,
//   plugins: {
//     labels: {
//       render: "percentage",
//       precision: 2,
//     },
//   },
// }
