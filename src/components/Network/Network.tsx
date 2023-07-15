import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert, createPrompt } from '../../reducers/alertReducer';

import globalStyles from '../global.module.scss';
import styles from './Network.module.scss';

const rawData = {
  nodes: [
    {
      name: 'network1',
      category: 'network',
    },
    {
      name: 'network2',
      category: 'network',
    },
    {
      name: 'container1',
      category: 'container',
    },
    {
      name: 'container2',
      category: 'container',
    },
    {
      name: 'network3',
      category: 'network',
    },
    {
      name: 'container3',
      category: 'container',
    },
    {
      name: 'container4',
      category: 'container',
    },
    {
      name: 'container5',
      category: 'container',
    },
  ],
  links: [
    {
      source: 'network1',
      target: 'container1',
      value: 1,
    },
    {
      source: 'network1',
      target: 'container2',
      value: 1,
    },
    {
      source: 'network2',
      target: 'container1',
      value: 1,
    },
    {
      source: 'network1',
      target: 'container3',
      value: 1,
    },
    {
      source: 'network1',
      target: 'container4',
      value: 1,
    },
    {
      source: 'network1',
      target: 'container5',
      value: 1,
    },
  ],
};

const Network = (): JSX.Element => {
  const [showList, setShowList] = useState(false);
  const [network, setNetwork] = useState('');

  const { networkContainerList } = useAppSelector((state) => state.networks);
  const ref = useRef();
  const dispatch = useAppDispatch();
  // Array of valid css colors long enough to cover all possible networks that can be created in Docker.
  const cssColors = [
    'Tomato', 'Yellowgreen', 'Aqua', 'Aquamarine', 'Indigo',
    'Springgreen', 'Seagreen', 'Purple', 'Teal', 'Skyblue',
    'BlueViolet', 'Slateblue', 'CadetBlue', 'Chartreuse',
    'Chocolate', 'Coral', 'CornflowerBlue', 'Lightskyblue', 'Crimson',
    'Firebrick', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray',
    'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen',
    'DarkOrange', 'DarkOrchid', 'Darkseagreen'
  ];

  // manipulate data so that we have an array of all of our links between containers and networks
  const displayNetworkList = () => {
    // update the networkList before displaying the network list
    // networkContainers();
    setShowList(!showList);
  };

  async function fetchNewNetwork(name: string): Promise<void> {
    try {
      const response = await fetch('/api/command/networkCreate', {
        method: 'POST',
        body: JSON.stringify({ networkName: name }),
        headers: { 'Content-Type': 'application/json' },
      });
      // parse the reponse
      const dataFromBackend = await response.json();
      // if new network is succefully added
      if (dataFromBackend.hasOwnProperty('hash')) {
        dispatch(
          createAlert(
            'New network ' + name + ' is successfully added',
            4,
            'success'
          )
        );
      }
      else if (dataFromBackend.error) {
        dispatch(
          createAlert(
            'Error from the docker : ' + dataFromBackend.error,
            4,
            'warning'
          )
        );
        return;
      }
    } catch (err) {
      dispatch(
        createAlert(
          'An error occurred while creating a new network : ' + err,
          4,
          'error'
        )
      );
    }
  }

  // Invoked when 'Create new network' button is pressed. Sends POST request to backend with current state of input field in the body. Resets input field upon submission.
  const createNewNetwork = () => {
    // alert msg if user does not type anything in input field
    if (!network) {
      dispatch(createAlert('Please enter a network name.', 4, 'error'));
      return;
    }
    // alert msg if same network name is already available in network list
    if (networkContainerList.map(el => el.networkName).includes(network)) {
      dispatch(
        createAlert(
          'Duplicate name already exists in the network list.',
          4,
          'warning'
        )
      );
      // clear the input field after displaying alert msg
      setNetwork('');
      return;
    }
    // alert msg if there's a special character that is not accepted
    const pattern = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,127}$/;
    if (!pattern.test(network)) {
      dispatch(
        createAlert(
          'The network name must start with an alphanumerical character and can contain alphanumerical characters, hypens, or underscores.',
          5,
          'warning'
        )
      );
      // clear the input field after displaying alert msg
      setNetwork('');
      return;
    }
    //

    fetchNewNetwork(network);
    setNetwork('');
  };

  async function deleteNetwork(name: string): Promise<void> {
    try {
      const response = await fetch('/api/command/networkRemove', {
        method: 'POST',
        body: JSON.stringify({ networkName: name }),
        headers: { 'Content-Type': 'application/json' },
      });
      // parse the reponse
      const dataFromBackend = await response.json();
      if (dataFromBackend.hasOwnProperty('hash')) {
        dispatch(
          createAlert(
            'Network ' + name + ' is successfully removed',
            4,
            'success'
          )
        );
      } else if (dataFromBackend.error) {
        dispatch(
          createAlert(
            'Please detach ' +
              attachedContainers(name) +
              ' container(s) before deleting this network.',
            4,
            'warning'
          )
        );
        return;
      }
    } catch (err) {
      dispatch(
        createAlert(
          'An error occurred while removing the network : ' + err,
          4,
          'error'
        )
      );
    }
  }

  // function that returns array with network's attached container name
  const attachedContainers = (name: string): string[] => {
    let attachedContainerList;
    // iterate through networkContainerList
    networkContainerList.forEach((el) => {
      // if current network objects's networkName property has a value which is matching the provided argument.
      if (el.networkName === name) {
        // assign attachedContainerList to array that filled with attached container name
        attachedContainerList = el.containers.map(
          (el) => (el = ` [${el.containerName}] `)
        );
      }
    });
    // return array
    return attachedContainerList;
  };


  // function to display which containers are attached to a specific network
  const displayAttachedContainers = (name) => {
    // const var containerName is array returned from invocation of attachedContainers function with passed in network name argument
    const containerName = attachedContainers(name);
    // if containerName array has any length, which means there are attached containers available
    if (containerName.length) {
      dispatch(
        createAlert(
          'Currently ' +
            containerName +
            ' is(are) attached to ' +
            name +
            ' network.',
          4,
          'success'
        )
      );
    } else {
      // if there's no container attached to this network
      dispatch(
        createAlert(
          'Currently no container is attached to ' + name + ' network.',
          4,
          'success'
        )
      );
    }
  };

  // Render Sankey Diagram
  useEffect(() => {
    if (networkContainerList.length > 0) {
      const networksWithNoContainers = [];
      const liveNodesObj = {};
      const liveNodes = [];
      const liveLinks = [];
      console.log('rerender');
      // iterate through networkContainerList
      networkContainerList.forEach((network) => {
        // if containers is empty, add network to no containers list
        if (!network.containers.length) {
          networksWithNoContainers.push(network.networkName);
        }
        // otherwise,
        else {
          // add network to nodes object
          liveNodes.push({
            name: network.networkName,
            category: 'network',
          });
          // iterate through the containers
          network.containers.forEach((container) => {
            // if it doesn't already exist in nodes object, add it to object and list
            if (!liveNodesObj[container.containerName]) {
              liveNodesObj[container.containerName] = true;
              liveNodes.push({
                name: container.containerName,
                category: 'container',
              });
            }
            // create a link object for each connection
            liveLinks.push({
              source: network.networkName,
              target: container.containerName,
              value: 1,
            });
          });
        }
      });



      d3.select(ref.current).select('svg').remove();

      const width = 1000;
      const height = 800;
      const format = d3.format(',.0f');


      const svg = d3
        .select(ref.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, -10, width, height])
        .attr('style', 'max-width: 100%; height: auto; font: 1rem Bai Jamjuree, sans-serif;')
        .style('fill', 'white');

      const sankey = d3Sankey()
        .nodeId((d) => d.name)
        .nodeAlign(d3.sankeyJustify)
        .nodeWidth(15)
        .nodePadding(40)
        .extent([
          [10, 20],
          [width - 10, height - 20],
        ]);

      const { nodes, links } = sankey({
        nodes: liveNodes.map((d) => Object.assign({}, d)),
        links: liveLinks.map((d) => Object.assign({}, d)),
      });

      // nodeColors will be populated below when each node is assigned a color, and later used to color the path from the network to the container.
      const nodeColors = {};

      const rect = svg
        .append('g')
        .attr('stroke', '#000')
        .selectAll()
        .data(nodes)
        .join('rect')
        .attr('x', (d) => d.x0)
        .attr('y', (d) => d.y0)
        .attr('height', (d) => d.y1 - d.y0)
        .attr('width', (d) => d.x1 - d.x0)
        .attr('fill', (d) => {
          const color = d.category === 'container' ? 'orange' : cssColors[nodes.indexOf(d)];
          nodeColors[d.name] = color;
          return color;
        });

      rect.append('title').text((d) => `${d.name}\n${format(d.value)} Connections`);


      const link = svg
        .append('g')
        .attr('fill', 'none')
        .attr('stroke-opacity', .8)
        .selectAll()
        .data(links)
        .join('g')
        .style('mix-blend-mode', 'normal');

      link
        .append('path')
        .attr('d', sankeyLinkHorizontal())
        .attr('stroke', (d) => nodeColors[d.source.name])
        .attr('stroke-width', d => d.width / 1);

      link
        .append('title')
        .text(
          (d) => `${d.source.name} → ${d.target.name}}`
        );

      svg
        .append('g')
        .selectAll()
        .data(nodes)
        .join('text')
        // .attr('x', (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
        .attr('x', (d) => (d.x0 < width / 2 ? d.x1 - 12 : d.x0 + 12))
        // .attr('y', (d) => (d.y1 + d.y0) / 2)
        .attr('y', (d) => (d.y0 - 12))
        .attr('dy', '0.35em')
        .attr('text-anchor', (d) => (d.x0 < width / 2 ? 'start' : 'end'))
        .text((d) => d.name);
    }
  }, [networkContainerList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.listHolder}>
        <div id={styles.networkList}>
          <h2>NETWORKS</h2>
          <input
            className={globalStyles.input}
            type="text"
            id="newNetwork"
            value={network}
            placeholder="Input network name here..."
            onChange={(e) => {
              setNetwork(e.target.value);
            }}
          />
          <button
            className={globalStyles.button1}
            onClick={() => createNewNetwork()}
          >
              CREATE NEW NETWORK
          </button>
          <button
            className={globalStyles.button1}
            onClick={() => displayNetworkList()}
          >
            {showList ? 'HIDE NETWORK LIST' : 'DISPLAY NETWORK LIST'}
          </button>
          {showList && (
            <div className={styles.listHolder}>
              {networkContainerList.map(
                (network: NetworkContainerListType, index: number) => {
                  if (
                    network.networkName !== 'bridge' &&
                      network.networkName !== 'docketeer_default'
                  ) {
                    return (
                      <div className={styles.networkDiv} key={index}>
                        <p
                          id={styles.networkName}
                          onClick={() =>
                            displayAttachedContainers(network.networkName)
                          }
                        >
                          {network.networkName}
                        </p>
                        <button
                          id={styles.networkDeleteButton}
                          onClick={() => deleteNetwork(network.networkName)}
                        >
                            DELETE
                        </button>
                      </div>
                    );
                  } else {
                    return (
                      <div className={styles.networkDiv} key={index}>
                        <p
                          id={styles.networkName}
                          onClick={() =>
                            displayAttachedContainers(network.networkName)
                          }
                        >
                          {network.networkName}
                        </p>
                      </div>
                    );
                  }
                }
              )}
            </div>
          )}
        </div>
      </div>
      <div id="sankeyDiagram" className={styles.sankeyDiagram} ref={ref}></div>
      
    </div>
  );
};


export default Network;
