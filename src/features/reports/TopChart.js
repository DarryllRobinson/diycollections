import React from 'react';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryLegend,
} from 'victory';

export const TopChart = () => {
  const owed = [
    { x: 'Jun 21', y: 100000 },
    { x: 'Jul 21', y: 112244 },
    { x: 'Aug 21', y: 232211 },
    { x: 'Sep 21', y: 175000 },
    { x: 'Oct 21', y: 213133 },
  ];

  const ptp = [
    { x: 'Jun 21', y: 100000 * 0.75 },
    { x: 'Jul 21', y: 112244 * 0.75 },
    { x: 'Aug 21', y: 232211 * 0.75 },
    { x: 'Sep 21', y: 175000 * 0.75 },
    { x: 'Oct 21', y: 213133 * 0.75 },
  ];

  const collected = [
    { x: 'Jun 21', y: 100000 * 0.63 },
    { x: 'Jul 21', y: 112244 * 0.63 },
    { x: 'Aug 21', y: 232211 * 0.63 },
    { x: 'Sep 21', y: 175000 * 0.63 },
    { x: 'Oct 21', y: 213133 * 0.63 },
  ];

  const styles = {
    parent: {
      boxSizing: 'border-box',
      display: 'inline',
      //background: 'linear-gradient(to right, #072025, #253D42, #072025)',
      height: '250',
      padding: 0,
      fontFamily: "'Fira Sans', sans-serif",
    },

    title: {
      textAnchor: 'start',
      verticalAnchor: 'end',
      fill: '#333740',
      fontFamily: 'inherit',
      fontSize: '50px',
      fontWeight: 'bold',
    },

    chartNumber: {
      textAnchor: 'middle',
      fill: '#ffffff',
      fontFamily: 'inherit',
      fontSize: '14px',
    },

    description: {
      fill: '#787C82',
      fontFamily: 'inherit',
      fontSize: 25,
      fontStyle: 'italic',
    },

    axisX: {
      ticks: { stroke: '#787C82', size: 5 },
      tickLabels: { fill: '#333740', fontSize: 25, padding: 5 },
    },

    axixY: {
      grid: {
        stroke: '#787C82',
        strokeWidth: 1,
      },
      ticks: { stroke: '#787C82', size: 5 },
      tickLabels: { fill: '#333740', fontSize: 25, padding: 5 },
    },
  };

  return (
    <svg style={styles.parent} viewBox="-45 0 2120 480">
      <VictoryLabel
        x={55}
        y={45}
        style={styles.title}
        text="Owed, PTP and Collections"
      />
      <VictoryLabel x={430} y={20} style={styles.chartNumber} text="1" />
      <VictoryLabel
        x={55}
        y={65}
        style={styles.description}
        text="Previous six months"
      />

      <g transform={'translate(0, 40)'}>
        <VictoryChart
          animate={{
            duration: 2000,
            easing: 'backOut',
            onLoad: { duration: 1000 },
          }}
          containerComponent={<VictoryContainer responsive={false} />}
          height={455}
          standalone={false}
          width={1990}
        >
          <VictoryArea
            animate={{ duration: 2000, onLoad: { duration: 1000 } }}
            data={owed}
            style={{ data: { fill: '#00B6F0', fillOpacity: 1 } }}
          />
          <VictoryArea
            animate={{ duration: 2000, onLoad: { duration: 1000 } }}
            data={ptp}
            style={{ data: { fill: '#0062AE', fillOpacity: 1 } }}
          />
          <VictoryArea
            animate={{ duration: 2000, onLoad: { duration: 1000 } }}
            data={collected}
            style={{ data: { fill: '#003D6A', fillOpacity: 1 } }}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            style={styles.axixY}
            tickFormat={(t) => `R ${Math.round(t) / 1000} k`}
          />
          <VictoryAxis standalone={false} style={styles.axisX} />

          <VictoryLegend
            x={1500}
            y={300}
            background="#cdc2b4"
            centerTitle
            orientation="horizontal"
            gutter={30}
            standalone={false}
            style={{ border: { fill: '#787c82', stroke: 'white' } }}
            data={[
              {
                name: 'Owed',
                symbol: { fill: '#00B6F0', fillOpacity: 1 },
                labels: { fill: 'white', fontSize: 25 },
              },
              {
                name: 'PTP',
                symbol: { fill: '#0062AE', fillOpacity: 1 },
                labels: { fill: 'white', fontSize: 25 },
              },
              {
                name: 'Collected',
                symbol: { fill: '#003D6A', fillOpacity: 1 },
                labels: { fill: 'white', fontSize: 25 },
              },
            ]}
          />
        </VictoryChart>
      </g>
    </svg>
  );
};
