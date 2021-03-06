import React from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
} from 'victory';

class CustomBar extends React.Component {
  getStylesMain() {
    const BLUE_COLOR = '#00a3de';
    const PURPLE_COLOR = '#422590';

    return {
      parent: {
        background: '#0F5A99',
        boxSizing: 'border-box',
        display: 'inline',
        height: '350',
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
      },
      title: {
        textAnchor: 'start',
        verticalAnchor: 'end',
        fill: '#000000',
        fontFamily: 'inherit',
        fontSize: '18px',
        fontWeight: 'bold',
      },
      labelNumber: {
        textAnchor: 'middle',
        fill: '#ffffff',
        fontFamily: 'inherit',
        fontSize: '14px',
      },

      // INDEPENDENT AXIS
      axisX: {
        axis: { stroke: 'black', strokeWidth: 1 },
        domainPadding: { x: 20, y: 5 },
        tickLabels: {
          fill: 'black',
          fontFamily: 'inherit',
          fontSize: 10,
        },
      },

      // DATA SET
      axisOne: {
        grid: {
          stroke: ({ tick }) => (tick === -10 ? 'transparent' : '#ffffff'),
          strokeWidth: 2,
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: 'inherit',
          fontSize: 10,
          padding: 3,
        },
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: 'inherit',
        fontSize: 12,
        fontStyle: 'italic',
      },
      barLine: {
        data: { stroke: PURPLE_COLOR, strokeWidth: ({ data }) => data.length },
        labels: {
          fontSize: 15,
          fill: ({ datum }) => (datum.x === 3 ? '#000000' : '#c43a31'),
        },
      },

      // Tooltip
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: 'inherit',
        fontWeight: 300,
        fontSize: 21,
      },
    };
  }

  getStylesDashboard() {
    const BLUE_COLOR = '#00a3de';
    const PURPLE_COLOR = '#422590';

    return {
      parent: {
        background: '#0F5A99',
        boxSizing: 'border-box',
        display: 'inline',
        height: '200',
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
      },
      title: {
        textAnchor: 'start',
        verticalAnchor: 'end',
        fill: '#000000',
        fontFamily: 'inherit',
        fontSize: '20px',
        fontWeight: 'bold',
      },
      labelNumber: {
        textAnchor: 'middle',
        fill: '#ffffff',
        fontFamily: 'inherit',
        fontSize: '14px',
      },

      // INDEPENDENT AXIS
      axisX: {
        axis: { stroke: 'black', strokeWidth: 1 },
        domainPadding: { x: 20, y: 5 },
        tickLabels: {
          fill: 'black',
          fontFamily: 'inherit',
          fontSize: 10,
        },
      },

      // DATA SET
      axisOne: {
        grid: {
          stroke: ({ tick }) => (tick === -10 ? 'transparent' : '#ffffff'),
          strokeWidth: 2,
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: 'inherit',
          fontSize: 10,
          padding: 3,
        },
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: 'inherit',
        fontSize: 18,
        fontStyle: 'italic',
      },
      barLine: {
        data: { fill: PURPLE_COLOR },
      },

      // Tooltip
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: 'inherit',
        fontWeight: 300,
        fontSize: 21,
      },
    };
  }

  getDataSetOne() {
    return this.props.data;
  }

  render() {
    const { chartNumber, description, styleType, title } = this.props;
    const styles =
      styleType === 'dash' ? this.getStylesDashboard() : this.getStylesMain();
    const dataSetOne = this.getDataSetOne();
    //const tickValues = this.getTickValues();

    return (
      <svg style={styles.parent} viewBox="0 0 450 350">
        {/* Create stylistic elements */}
        <rect x="0" y="0" width="10" height="30" fill="#f01616" />
        <rect x="420" y="10" width="20" height="20" fill="#458ca8" />

        {/* Define labels */}
        <VictoryLabel x={25} y={24} style={styles.title} text={title} />
        <VictoryLabel
          x={430}
          y={20}
          style={styles.labelNumber}
          text={chartNumber + 1}
        />
        <VictoryLabel
          x={25}
          y={55}
          style={styles.labelOne}
          text={description}
        />

        <g transform={'translate(0, 40)'}>
          <VictoryChart
            animate={{
              duration: 2000,
              easing: 'backOut',
              onLoad: { duration: 1000 },
            }}
            containerComponent={<VictoryContainer responsive={false} />}
            domainPadding={{ x: 20, y: 5 }}
            standalone={false}
          >
            {/* Independent axis */}
            <VictoryAxis standalone={false} style={styles.axisX} />

            {/* Dependent axis */}
            <VictoryAxis
              dependentAxis
              standalone={false}
              style={styles.axisOne}
              tickFormat={(t) => `${Math.round(t)} %`}
            />

            {/* Adding the dataset */}
            <VictoryLine
              labelComponent={
                <VictoryTooltip
                  dy={0}
                  centerOffset={{ x: 25 }}
                  renderInPortal={false} // Have to make false for custom chart
                  style={styles.axisOneCustomLabel}
                />
              }
              labels={({ datum }) => [`${Math.round(datum.value)} %`]}
              data={dataSetOne}
              standalone={false}
              style={styles.barLine}
              x="name"
              y="value"
            />
          </VictoryChart>
        </g>
      </svg>
    );
  }
}

export default CustomBar;
