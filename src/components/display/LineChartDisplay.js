/* eslint-disable react/prop-types */
// @ts-nocheck
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line, Bar } from "react-chartjs-2";

import { FormControlLabel, Checkbox } from "@mui/material";
import useSurvey from "../helper/dispatch";

/**
 * Displays line-graph & GitHub metrics
 */

const LineChartDisplay = () => {
  const [activeContainers, setActiveContainers] = useState({});
  const [timePeriod, setTimePeriod] = useState("4");
  const [expanded, setExpanded] = useState({});

  // Using destructuring to assign graphs and containersList variables to useSelector hook.
  const { graphs, containersList } = useSelector((state) => state);

  // Destructuring list variables from containerList
  const { runningList, stoppedList } = containersList;

  // Destructuring list variables from graphs
  const {
    graphMemory,
    graphCpu,
    graphWrittenIO,
    graphReadIO,
    graphReceivedIO,
    graphTransmittedIO,
    graphAxis,
  } = graphs;

  // Accessing relevant dispatch functions from our collective dispatch helper file
  const {
    buildAxis,
    buildMemory,
    buildCpu,
    buildWrittenIO,
    buildReadIO,
    buildReceivedIO,
    buildTransmittedIO,
  } = useSurvey();

  // Grabbing the metrics data to be displayed on the charts
  async function getContainerMetrics() {
    const containerNamesArr = Object.keys(activeContainers);
    const response = await fetch("http://localhost:3000/init/getMetrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        containers: containerNamesArr,
        time: timePeriod,
      }),
    });
    return await response.json();
  }

  // Creating auxillary objects that will be passed into the Line component
  const memoryObj = {
    labels: graphAxis,
    datasets: graphMemory,
  };
  const cpuObj = {
    labels: graphAxis,
    datasets: graphCpu,
  };
  const writtenIOObj = {
    labels: graphAxis,
    datasets: graphWrittenIO,
  };
  const readIOObj = {
    labels: graphAxis,
    datasets: graphReadIO,
  };
  const receivedIOObj = {
    labels: graphAxis,
    datasets: graphReceivedIO,
  };
  const transmittedIOObj = {
    labels: graphAxis,
    datasets: graphTransmittedIO,
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
    buildReceivedIO("clear");
    buildTransmittedIO("clear");

    // If active containers is empty render the empty graphs
    if (!Object.keys(activeContainers).length) {
      return;
    }

    const generateLineColor = (containerName, activeContainers) => {
      const colorOptions = [
        "#e74645",
        "#2a6fdb",
        "#1ac0c6",
        "#ffb3f2",
        "#facd60",
        "#679186",
        "#ff9400",
      ];
      const idx = activeContainers.indexOf(containerName);
      return colorOptions[idx];
    };

    // Build function that will return formatted object into structure that chart.js requires
    const buildLineGraphObj = (containerName) => {
      const obj = {
        label: containerName,
        data: [],
        lineTension: 0.5,
        fill: true,
        borderColor: generateLineColor(
          containerName,
          Object.keys(activeContainers)
        ),
      };
      return obj;
    };

    // Data structure for bar-graph
    const buildBarGraphObj = (containerName, stackID = "Stack 0") => {
      const obj = {
        label: containerName,
        data: [],
        fill: false,
        backgroundColor: generateLineColor(
          containerName,
          Object.keys(activeContainers)
        ),
        stack: stackID,
      };
      return obj;
    };

    buildMemory("clear");
    buildCpu("clear");
    buildAxis("clear");
    buildWrittenIO("clear");
    buildReadIO("clear");
    buildReceivedIO("clear");
    buildTransmittedIO("clear");

    if (!Object.keys(activeContainers).length) {
      return;
    }

    const containerMetrics = await getContainerMetrics();
    console.log(
      "🚀 ~ file: LineChartDisplay.js:138 ~ formatData ~ containerMetrics",
      containerMetrics
    );

    const auxObj = {};

    Object.keys(activeContainers).forEach((container) => {
      auxObj[container] = {
        memory: buildLineGraphObj(container),
        cpu: buildLineGraphObj(container),
        writtenIO: buildBarGraphObj(container, "Stack 1"),
        readIO: buildBarGraphObj(container),
        receivedIO: buildBarGraphObj(container), // added
        transmittedIO: buildBarGraphObj(container, "Stack 1"), // added
      };
    });

    // Iterate through fetched row & build objects for: Memory, CPU, Written/Read Block_IO [{}, {}, {}, {}]
    // Parse metrics received from database into a useable array
    containerMetrics.rows.forEach((dataPoint) => {
      const currentContainer = dataPoint.container_name;
      const writtenReadIO = dataPoint.block_io.split("/");
      const receivedAndTransmittedIO = dataPoint.net_io.split("/");
      auxObj[currentContainer].cpu.data.push(
        dataPoint.cpu_pct.replace("%", "")
      );
      auxObj[currentContainer].memory.data.push(
        dataPoint.memory_pct.replace("%", "")
      );
      auxObj[currentContainer].writtenIO.data.push(
        parseFloat(writtenReadIO[0].replace(/([A-z])+/g, ""))
      );
      auxObj[currentContainer].readIO.data.push(
        parseFloat(writtenReadIO[1].replace(/([A-z])+/g, ""))
      );
      auxObj[currentContainer].receivedIO.data.push(
        parseFloat(receivedAndTransmittedIO[0].replace(/([A-z])+/g, ""))
      );
      auxObj[currentContainer].transmittedIO.data.push(
        parseFloat(receivedAndTransmittedIO[1].replace(/([A-z])+/g, ""))
      );

      // `created_at` Sample: 2023-01-23T15:47:27.640Z
      // Key indicators "T" [10] and "." [20]
      const date = dataPoint.created_at.slice(1, 10);
      const time = dataPoint.created_at.slice(11, 16);

      const timeStamp = `${date} @ ${time}`;
      buildAxis(timeStamp);
    });

    let longest = 0;

    Object.keys(auxObj).forEach((containerName) => {
      if (auxObj[containerName].memory.data.length > longest) {
        longest = auxObj[containerName].memory.data.length;
      }
    });

    // Refactor this brute force aproach to adding 0 datapoints to array
    Object.keys(auxObj).forEach((containerName) => {
      if (auxObj[containerName].memory.data.length < longest) {
        const lengthToAdd = longest - auxObj[containerName].memory.data.length;
        for (let i = 0; i < lengthToAdd; i += 1) {
          auxObj[containerName].memory.data.unshift("0.00");
          auxObj[containerName].cpu.data.unshift("0.00");
          auxObj[containerName].writtenIO.data.unshift("0.00");
          auxObj[containerName].readIO.data.unshift("0.00");
          auxObj[containerName].receivedIO.data.unshift("0.00");
          auxObj[containerName].transmittedIO.data.unshift("0.00");
        }
      }
      buildMemory([auxObj[containerName].memory]);
      buildCpu([auxObj[containerName].cpu]);
      buildWrittenIO([auxObj[containerName].writtenIO]);
      buildReadIO([auxObj[containerName].readIO]);
      buildReceivedIO([auxObj[containerName].receivedIO]);
      buildTransmittedIO([auxObj[containerName].transmittedIO]);
    });
  };

  let runningListEl;
  let stoppedListEl;
  const selectList = () => {
    const result = [[], []];
    runningList.forEach((container, index) => {
      const containerNameKey = container.Name
        ? container.Name
        : container.Names;
      result[0].push(
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
    runningListEl = result[0];

    stoppedList.forEach((container, index) => {
      const containerNameKey = container.Name
        ? container.Name
        : container.Names;
      result[1].push(
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
    stoppedListEl = result[1];
  };

  const handleChange = (e) => {
    if (e.target.type === "radio") {
      setTimePeriod(e.target.value);
      return;
    }
    const containerName = e.target.name;
    // Deep copy the state object
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
        text: "IO BYTES WRITTEN BY CONTAINER",
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
        text: "IO BYTES READ BY CONTAINER",
        font: { size: 18 },
        position: "top",
      },
      tooltips: { enabled: true, mode: "index" },
      legend: { display: true, position: "bottom" },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const receivedIOOptions = {
    plugins: {
      title: {
        display: true,
        text: "IO BYTES RECEIVED BY CONTAINER",
        font: { size: 18 },
        position: "top",
      },
      tooltips: { enabled: true, mode: "index" },
      legend: { display: true, position: "bottom" },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const transmittedIOOptions = {
    plugins: {
      title: {
        display: true,
        text: "IO BYTES TRANSMITTED BY CONTAINER",
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
  }, [activeContainers]);

  return (
    <div>
      <div className="metric-section-title">
        <h3 className="container-heading">Metrics Over Time</h3>
      </div>
      <div className="metrics-options-form">
        <form
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <input type="radio" id="1-hours" name="timePeriod" value="1"></input>
          <label htmlFor="1-hours"> 1 hours</label>
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
          <input
            type="radio"
            id="24-hours"
            name="timePeriod"
            value="24"
          ></input>
          <label htmlFor="24-hours"> 24 hours</label>

          <br />
          <div>
            <h4>Running Containers List:</h4>
            <div>{runningListEl}</div>
          </div>
          <div>
            <h4>Stopped Containers List:</h4>
            <div>{stoppedListEl}</div>
          </div>
        </form>
      </div>
      <section className="metricCharts">
        {/* first chart - start */}

        <div
          className={
            expanded["Line-Cpu-Display"]
              ? "expanded-chart allCharts"
              : "allCharts"
          }
        >
          <Line key="Line-CPU" data={cpuObj} options={cpuOptions} />
          <div className="buttonDisplay">
            {expanded["Line-Cpu-Display"] ? (
              <button
                className="chart-btn"
                onClick={() => {
                  setExpanded({ ...expanded, ["Line-Cpu-Display"]: false });
                }}
              >
                <i className="fas fa-compress"></i>
              </button>
            ) : (
              <button
                className="chart-btn"
                onClick={() =>
                  setExpanded({ ...expanded, ["Line-Cpu-Display"]: true })
                }
              >
                <i className="fas fa-expand"></i>
              </button>
            )}
          </div>
        </div>
        {/* first chart - end */}
        {/* second chart - start */}
        <div
          className={
            expanded["Line-Memory-Display"]
              ? "expanded-chart allCharts"
              : "allCharts"
          }
        >
          <Line key="Line-Memory" data={memoryObj} options={memoryOptions} />
          <div className="buttonDisplay">
            {expanded["Line-Memory-Display"] ? (
              <button
                className="chart-btn"
                onClick={() => {
                  setExpanded({ ...expanded, ["Line-Memory-Display"]: false });
                }}
              >
                <i className="fas fa-compress"></i>
              </button>
            ) : (
              <button
                className="chart-btn"
                onClick={() =>
                  setExpanded({ ...expanded, ["Line-Memory-Display"]: true })
                }
              >
                <i className="fas fa-expand"></i>
              </button>
            )}
          </div>
        </div>
        {/* second chart - end */}
        {/* third chart - start */}
        <div
          className={
            expanded["written-IO"] ? "expanded-chart allCharts" : "allCharts"
          }
        >
          <Bar
            key="Bar-Written"
            data={writtenIOObj}
            options={writtenIOOptions}
          />
          <div className="buttonDisplay">
            {expanded["written-IO"] ? (
              <button
                className="chart-btn"
                onClick={() => {
                  setExpanded({ ...expanded, ["written-IO"]: false });
                }}
              >
                <i className="fas fa-compress"></i>
              </button>
            ) : (
              <button
                className="chart-btn"
                onClick={() =>
                  setExpanded({ ...expanded, ["written-IO"]: true })
                }
              >
                <i className="fas fa-expand"></i>
              </button>
            )}
          </div>
        </div>
        {/* third chart - end */}

        {/* fourth chart - start */}
        <div
          className={
            expanded["read-IO"] ? "expanded-chart allCharts" : "allCharts"
          }
        >
          <Bar key="Bar-Read" data={readIOObj} options={readIOOptions} />
          <div className="buttonDisplay">
            {expanded["read-IO"] ? (
              <button
                className="chart-btn"
                onClick={() => {
                  setExpanded({ ...expanded, ["read-IO"]: false });
                }}
              >
                <i className="fas fa-compress"></i>
              </button>
            ) : (
              <button
                className="chart-btn"
                onClick={() => setExpanded({ ...expanded, ["read-IO"]: true })}
              >
                <i className="fas fa-expand"></i>
              </button>
            )}
          </div>
        </div>
        {/* fourth chart - end */}

        {/* fifth chart - start */}
        <div
          className={
            expanded["received-IO"] ? "expanded-chart allCharts" : "allCharts"
          }
        >
          <Bar
            key="Bar-Read"
            data={receivedIOObj}
            options={receivedIOOptions}
          />
          <div className="buttonDisplay">
            {expanded["received-IO"] ? (
              <button
                className="chart-btn"
                onClick={() => {
                  setExpanded({ ...expanded, ["received-IO"]: false });
                }}
              >
                <i className="fas fa-compress"></i>
              </button>
            ) : (
              <button
                className="chart-btn"
                onClick={() =>
                  setExpanded({ ...expanded, ["received-IO"]: true })
                }
              >
                <i className="fas fa-expand"></i>
              </button>
            )}
          </div>
        </div>
        {/* fifth chart - end */}

        {/* sixth chart - start */}
        <div
          className={
            expanded["transmitted-IO"]
              ? "expanded-chart allCharts"
              : "allCharts"
          }
        >
          <Bar
            key="Bar-Read"
            data={transmittedIOObj}
            options={transmittedIOOptions}
          />
          <div className="buttonDisplay">
            {expanded["transmitted-IO"] ? (
              <button
                className="chart-btn"
                onClick={() => {
                  setExpanded({ ...expanded, ["transmitted-IO"]: false });
                }}
              >
                <i className="fas fa-compress"></i>
              </button>
            ) : (
              <button
                className="chart-btn"
                onClick={() =>
                  setExpanded({ ...expanded, ["transmitted-IO"]: true })
                }
              >
                <i className="fas fa-expand"></i>
              </button>
            )}
          </div>
        </div>
        {/* sixth chart - end */}
      </section>
    </div>
  );
};

export default LineChartDisplay;
