import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import globalStyles from '../global.module.scss';

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
        value: 23,
      },
      {
        source: 'network1',
        target: 'container2',
        value: 45,
      },
      {
        source: 'network2',
        target: 'container1',
        value: 23,
      },
      {
        source: 'network1',
        target: 'container3',
        value: 23,
      },
      {
        source: 'network1',
        target: 'container4',
        value: 45,
      },
      {
        source: 'network1',
        target: 'container5',
        value: 23,
      },
    ],
  };

const Network = (): JSX.Element => {
  // const { networkContainerList } = useAppSelector((state) => state.networks);
  // const data = networkContainerList;
  const ref = useRef();
  // manipulate data so that we have an array of all of our links between containers and networks
  // nodes

  useEffect(() => {
    
    const width = 1000;
    const height = 800;
    const format = d3.format(',.0f');

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');

    const sankey = d3Sankey()
      .nodeId((d) => d.name)
      .nodeAlign(d3.sankeyLeft)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 5],
        [width - 1, height - 5],
      ]);

    const { nodes, links } = sankey({
      nodes: rawData.nodes.map((d) => Object.assign({}, d)),
      links: rawData.links.map((d) => Object.assign({}, d)),
    });

    const color = d3.scaleOrdinal(d3.schemeCategory10);

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
      .attr('fill', (d) => color(d.category));

    rect.append('title').text((d) => `${d.name}\n${format(d.value)} TWh`);

    const link = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke-opacity', 0.5)
      .selectAll()
      .data(links)
      .join('g')
      .style('mix-blend-mode', 'multiply');

    link
      .append('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', 'red')
      .attr('stroke-width', 40);

    link
      .append('title')
      .text(
        (d) => `${d.source.name} → ${d.target.name}\n${format(d.value)} TWh`
      );

    svg
      .append('g')
      .selectAll()
      .data(nodes)
      .join('text')
      .attr('x', (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr('y', (d) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d) => (d.x0 < width / 2 ? 'start' : 'end'))
      .text((d) => d.name);

  }, []);

  return <div ref={ref}></div>;
};

// };

export default Network;
