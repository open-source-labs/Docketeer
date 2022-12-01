/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Line, Bar } from "react-chartjs-2";
import * as actions from "../../redux/actions/actions";
import * as helper from "../helper/commands";
import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel, Checkbox } from "@mui/material";
import { RootState } from "../../renderer/store";
import { AnyArray } from "immer/dist/internal";

/**
 * Displays linegraph and github metrics
 *
 */

const LineChartDisplay = () => {
  const [activeContainers, setActiveContainers] = useState({});
  const [gitUrls, setGitUrls] = useState([]);
  const [timePeriod, setTimePeriod] = useState("4");
  const memory = useSelector((state: RootState) => state.graphs["graphMemory"]);
  const cpu = useSelector((state: RootState) => state.graphs["graphCpu"]);
  const writtenIO = useSelector(
    (state: RootState) => state.graphs["graphWrittenIO"]
  );
  const readIO = useSelector((state: RootState) => state.graphs["graphReadIO"]);
  const axis = useSelector((state: RootState) => state.graphs["graphAxis"]);
  const runningList = useSelector(
    (state: RootState) => state.containersList.runningList
  );
  const stoppedList = useSelector(
    (state: RootState) => state.containersList.stoppedList
  );

  const dispatch = useDispatch();
  const buildAxis = (data: string) => dispatch(actions.buildAxis(data));
  const buildMemory = (data: string) => dispatch(actions.buildMemory(data));
  const buildCpu = (data: string) => dispatch(actions.buildCpu(data));
  const buildWrittenIO = (data: string) =>
    dispatch(actions.buildWrittenIO(data));
  const buildReadIO = (data: string) => dispatch(actions.buildReadIO(data));

  //Grabbing the metrics data to be displayed on the charts
  async function getContainerMetrics() {
    const containerNamesArr = Object.keys(activeContainers);
    const response = await fetch("http://localhost:3000/init/getMetrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        containers: containerNamesArr,
      }),
    });
    return await response.json();
  }

  // Auxilary Object which will be passed into Line component
  const memoryObj = {
    labels: axis,
    datasets: memory,
  };
  const cpuObj = {
    labels: axis,
    datasets: cpu,
  };
  const writtenIOObj = {
    labels: axis,
    datasets: writtenIO,
  };
  const readIOObj = {
    labels: axis,
    datasets: readIO,
  };

  /**
   * Resets all graph data in global store
   * Builds memory and cpu object for input into Line Components
   */
  const formatData = async () => {
    buildMemory("clear");
    buildCpu("clear");
    buildAxis("clear");
    buildWrittenIO("clear");
    buildReadIO("clear");
    // if active containers is empty render the empty graphs
    if (!Object.keys(activeContainers).length) {
      return;
    }

    const output = await getContainerMetrics();

    const generateLineColor = (containerName: string, activeContainers: {}) => {
      const colorOptions = [
        "red",
        "blue",
        "green",
        "purple",
        "yellow",
        "grey",
        "orange",
      ];
      const idx = activeContainers.indexOf(containerName);
      return colorOptions[idx];
    };
    // build function that will return formated object into necessary
    // datastructure for chart.js line graphs
    const buildLineGraphObj = (containerName: string) => {
      const obj = {
        label: containerName,
        data: [],
        lineTension: 0.5,
        fill: false,
        borderColor: generateLineColor(
          containerName,
          Object.keys(activeContainers)
        ),
      };
      return obj;
    };
    // Datastructure for Bargraph
    const buildBarGraphObj = (containerName: string) => {
      const obj = {
        label: containerName,
        data: [],
        fill: false,
        backgroundColor: generateLineColor(
          containerName,
          Object.keys(activeContainers)
        ),
      };
      return obj;
    };

    buildMemory("clear");
    buildCpu("clear");
    buildAxis("clear");
    buildWrittenIO("clear");
    buildReadIO("clear");

    if (!Object.keys(activeContainers).length) {
      return;
    }

    const containerMetrics = await getContainerMetrics();

    interface auxObjType {
      container?: ContainerInterface;
      currentContainer?: any;
      containerName?: any;
    }

    interface ContainerInterface {
      memory?: any;
      cpu?: any;
      writtenIO?: any;
      readIO?: any;
    }

    // interface ContainerNameInterface{

    // }

    //const container: keyof auxObjType = 'container'

    const auxObj: auxObjType = {};
    //const container: keyof typeof auxObj;
    Object.keys(activeContainers).forEach((container) => {
      auxObj[container as keyof typeof auxObj] = {
        memory: buildLineGraphObj(container),
        cpu: buildLineGraphObj(container),
        writtenIO: buildBarGraphObj(container),
        readIO: buildBarGraphObj(container),
      };
    });

    // iterate through each row from fetch and build Memory, CPU, Written/Read Block_IO objects [{}, {}, {}, {}]
    containerMetrics.rows.forEach((dataPoint: any) => {
      const currentContainer = dataPoint.container_name;
      const writtenReadIO = dataPoint.block_io.split("/");
      auxObj[currentContainer as keyof typeof auxObj].cpu.data.push(
        dataPoint.cpu_pct.replace("%", "")
      );
      auxObj[currentContainer as keyof typeof auxObj].memory.data.push(
        dataPoint.memory_pct.replace("%", "")
      );
      auxObj[currentContainer as keyof typeof auxObj].writtenIO.data.push(
        parseFloat(writtenReadIO[0].replace(/([A-z])+/g, ""))
      );
      auxObj[currentContainer as keyof typeof auxObj].readIO.data.push(
        parseFloat(writtenReadIO[1].replace(/([A-z])+/g, ""))
      );
      let date = "";
      let time = "";
      for (let i = 1; i < dataPoint.created_at.length; i++) {
        if (dataPoint.created_at[i] === "T") {
          break;
        } else date += dataPoint.created_at[i];
      }
      for (let i = 11; i < dataPoint.created_at.length; i++) {
        if (dataPoint.created_at[i] === ".") {
          break;
        } else time += dataPoint.created_at[i];
      }
      let timeStamp = `${date} @ ${time}`;
      buildAxis(timeStamp);
    });

    let longest = 0; // 32

    Object.keys(auxObj).forEach((containerName: string) => {
      if (
        auxObj[containerName as keyof typeof auxObj].memory.data.length >
        longest
      ) {
        longest =
          auxObj[containerName as keyof typeof auxObj].memory.data.length;
      }
    });

    // REFACTOR THIS BRUTE FORCE APROACH TO ADDING 0 DATAPOINTS TO ARRAY
    Object.keys(auxObj).forEach((containerName: string) => {
      if (
        auxObj[containerName as keyof typeof auxObj].memory.data.length <
        longest
      ) {
        const lengthToAdd =
          longest -
          auxObj[containerName as keyof typeof auxObj].memory.data.length;
        for (let i = 0; i < lengthToAdd; i += 1) {
          auxObj[containerName as keyof typeof auxObj].memory.data.unshift(
            "0.00"
          );
          auxObj[containerName as keyof typeof auxObj].cpu.data.unshift("0.00");
          auxObj[containerName as keyof typeof auxObj].writtenIO.data.unshift(
            "0.00"
          );
          auxObj[containerName as keyof typeof auxObj].readIO.data.unshift(
            "0.00"
          );
        }
      }
      buildMemory(auxObj[containerName as keyof typeof auxObj].memory);
      buildCpu(auxObj[containerName as keyof typeof auxObj].cpu);
      buildWrittenIO(auxObj[containerName as keyof typeof auxObj].writtenIO);
      buildReadIO(auxObj[containerName as keyof typeof auxObj].readIO);
    });
  };

  interface obType {
    containerName: any;
  }

  const containerName;

  //Fetching the data from github API and turning it into an object with keys of objects that contain the data of each container
  const fetchGitData = async (containerName: string) => {
    const ob = {};
    ob[containerName] = [];
    const time = Number(timePeriod);
    //pulling the current time, and then setting it back to one month ago to check for github commit logs (2629746000 = 1 month)
    let date: Date = new Date(Date.parse(new Date()) - 2629746000);
    date.setHours(date.getHours() - time);
    date = date.toISOString();
    const urlObj = await helper.getContainerGitUrl(containerName);

    if (urlObj.rows.length) {
      const url =
        urlObj.rows[0].github_url +
        new URLSearchParams({
          since: `${date}`,
        });
      //need an actual url to test this, right now it can't connect
      const data = await fetch(url);
      const jsonData = await data.json();

      jsonData.forEach((commitData: any) => {
        ob[containerName].push({
          time: commitData.commit.author.date,
          url: commitData.html_url,
          author: commitData.commit.author.name,
          message: commitData.commit.message,
        });
      });
    } else {
      ob[containerName].push({
        time: "",
        url: "Connect github repo in settings",
      });
    }
    return ob;
  };

  const renderGitInfo = () => {
    Promise.all(
      Object.keys(activeContainers).map((container) => {
        return fetchGitData(container);
      })
    ).then((data) => setGitUrls(data));
  };
  //populating the github commits into a MUI DataGrid
  //This should allow multiple tables be stacked if multiple containers are selected
  let gitData;

  const columns = [
    { field: "date", headerName: "Date", width: 125 },
    { field: "time", headerName: "Time", width: 100 },
    {
      field: "url",
      headerName: "URL",
      width: 175,
      renderCell: (params: any) => (
        <a target="_blank" rel="noreferrer" href={params.row.url}>
          {params.row.id}
        </a>
      ),
    },
    { field: "author", headerName: "Author", width: 175 },
    { field: "message", headerName: "Message", width: 525, align: "left" },
  ];
  gitData = gitUrls.map((el, index) => {
    const name = Object.keys(el);
    const rows: any[];
    el[name].forEach((ob, index) => {
      let author = "";
      let date = "n/a";
      let time = "n/a";
      let url = "n/a";
      let message = "n/a";
      if (ob.time.length) {
        time = ob.time;
        author = ob.author;
        url = ob.url;
        message = "";
        if (ob.message) {
          if (ob.message.includes("<")) {
            for (let i = 0; i < ob.message.length; i++) {
              if (ob.message[i] === "<") break;
              message += ob.message[i];
            }
          } else {
            message = ob.message;
          }
        }

        time = time.split("T");
        date = time[0];
        time = time[1];
        time = time
          .split("")
          .slice(0, time.length - 1)
          .join("");
      }
      rows.push({
        date: date,
        time: time,
        url: url,
        author: author,
        message: message,
        id: `Github Commit #${index}`,
      });
    });
    return (
      <div key={index} className="gitHub-container">
        <h2>{name}</h2>
        <div className="ltTable" style={{ height: 600, width: "100%" }}>
          <DataGrid
            key="DataGrid"
            rows={rows}
            columns={columns}
            getRowHeight={() => "auto"}
            initialState={{
              sorting: {
                sortModel: [{ field: "date", sort: "asc" }],
              },
            }}
          />
        </div>
      </div>
    );
  });

  let currentList;
  const selectList = () => {
    const result = [];
    const completeContainerList = [...runningList, ...stoppedList];
    completeContainerList.forEach((container, index) => {
      const containerNameKey = container.Name
        ? container.Name
        : container.Names;
      result.push(
        <FormControlLabel
          key={`formControl-${index}`}
          control={
            <Checkbox
              name={containerNameKey}
              value={containerNameKey}
              color="primary"
              inputProps={{ "aria-label": containerNameKey }}
            />
          }
          label={containerNameKey}
        />
      );
    });
    currentList = result;
  };

  const handleChange = (e) => {
    if (e.target.type === "radio") {
      setTimePeriod(e.target.value);
      return;
    }
    const containerName = e.target.name;
    // deep copy the state object
    const copyObj = JSON.parse(JSON.stringify(activeContainers));
    if (activeContainers[containerName]) {
      delete copyObj[containerName];
    } else {
      copyObj[containerName] = true;
    }
    setActiveContainers(copyObj);
  };

  const cpuOptions = {
    plugins: {
      title: {
        display: true,
        text: "CPU",
        font: { size: 18 },
        position: "top",
      },
      tooltips: { enabled: true, mode: "index" },
      legend: { display: true, position: "bottom" },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const memoryOptions = {
    plugins: {
      title: {
        display: true,
        text: "MEMORY",
        font: { size: 18 },
        position: "top",
      },
      tooltips: { enabled: true, mode: "index" },
      legend: { display: true, position: "bottom" },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const writtenIOOptions = {
    plugins: {
      title: {
        display: true,
        text: "IO BYTES WRITTEN BY IMAGE",
        font: { size: 18 },
        position: "top",
      },
      tooltips: { enabled: true, mode: "index" },
      legend: { display: true, position: "bottom" },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const readIOOptions = {
    plugins: {
      title: {
        display: true,
        text: "IO BYTES READ BY IMAGE",
        font: { size: 18 },
        position: "top",
      },
      tooltips: { enabled: true, mode: "index" },
      legend: { display: true, position: "bottom" },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  selectList();
  useEffect(() => {
    formatData();
    renderGitInfo();
  }, [activeContainers, timePeriod]);

  return (
    <div>
      <div className="metric-section-title">
        <h3>Over Time</h3>
      </div>
      <div className="metrics-options-form">
        <form
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <input
            type="radio"
            id="4-hours"
            name="timePeriod"
            value="4"
            defaultChecked
          ></input>
          <label htmlFor="4-hours"> 4 hours</label>
          <input
            type="radio"
            id="12-hours"
            name="timePeriod"
            value="12"
          ></input>
          <label htmlFor="12-hours"> 12 hours</label>
          <input type="radio" id="other" name="timePeriod" value="24"></input>
          <label htmlFor="24-hours"> 24 hours</label>
          <br />
          {currentList}
        </form>
      </div>

      <div className="allCharts">
        <Line key="Line-Memory" data={memoryObj} options={memoryOptions} />
      </div>

      <div className="allCharts">
        <Line key="Line-CPU" data={cpuObj} options={cpuOptions} />
      </div>
      <div className="allCharts">
        <Bar key="Bar-Written" data={writtenIOObj} options={writtenIOOptions} />
      </div>
      <div className="allCharts">
        <Bar key="Bar-Read" data={readIOObj} options={readIOOptions} />
      </div>
      <div className="metric-section-title">
        <h3>GitHub History</h3>
      </div>
      {gitData}
    </div>
  );
};

export default LineChartDisplay;
