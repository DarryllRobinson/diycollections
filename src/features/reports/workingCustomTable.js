import React from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryTooltip,
} from 'victory';
import { Dimmer, Icon, Loader, Menu, Table } from 'semantic-ui-react';

import { userService } from '../users/user.service';

class CustomTable extends React.Component {
  getStylesDashboard() {
    const BLUE_COLOR = '#003d6a';
    const PURPLE_COLOR = '#2062ae';

    return {
      parent: {
        background: '#ffffff',
        border: '1px solid #000000',
        boxSizing: 'border-box',
        display: 'inline',
        height: '275',
        margin: '15px 3px',
        fontFamily: "'Fira Sans', sans-serif",
      },
      svg: {
        overflow: 'scroll',
        viewBox: '0 0 600 640',
      },
      title: {
        textAnchor: 'start',
        verticalAnchor: 'end',
        fill: '#333740',
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
          fill: '#333740',
          fontFamily: 'inherit',
          fontSize: 10,
        },
      },

      // DATA SET
      axisOne: {
        grid: {
          stroke: ({ tick }) => (tick === -10 ? 'transparent' : '#a8abac'),
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
      barOne: {
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

  getStylesMain() {
    const BLUE_COLOR = '#003d6a';
    const PURPLE_COLOR = '#2062ae';

    return {
      parent: {
        background: '#ffffff',
        border: '1px solid black',
        boxSizing: 'border-box',
        display: 'inline',
        minHeight: '80vh',
        margin: '15px 3px',
        width: '80vw',
      },
      svg: {
        overflow: 'scroll',
        viewBox: '0 0 600 840',
      },
      title: {
        textAnchor: 'start',
        verticalAnchor: 'end',
        fill: '#333740',
        fontFamily: 'inherit',
        fontWeight: 'bold',
      },
      foreignObject: {
        height: '100%',
        overflow: 'scroll',
        width: '100%',
        x: '0',
        y: '80',
      },
      table: {
        collapsing: true,
        compact: true,
        height: '100vh',
        margin: '10px',
        tableLayout: 'fixed',
        width: '97%',
        wordBreak: 'break-word',
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
          fill: '#333740',
          fontFamily: 'inherit',
          fontSize: 10,
        },
      },

      // DATA SET
      axisOne: {
        grid: {
          stroke: ({ tick }) => (tick === -10 ? 'transparent' : '#a8abac'),
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
      barOne: {
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

  getStylesSidebar() {
    const BLUE_COLOR = '#003d6a';
    const PURPLE_COLOR = '#2062ae';

    return {
      parent: {
        background: '#ffffff',
        border: '1px solid #000000',
        boxSizing: 'border-box',
        display: 'inline',
        height: '200px',
        margin: '15px 3px',
        overflow: 'hidden',
        viewBox: '0 0 450 350',
        zoomAndPan: 'magnify',
      },
      svg: {
        overflow: 'hidden',
        viewBox: '0 0 450 350',
      },
      title: {
        textAnchor: 'start',
        verticalAnchor: 'end',
        fill: '#333740',
        fontFamily: 'inherit',
        fontSize: '18px',
        fontWeight: 'bold',
      },
      foreignObject: {
        height: '400',
        width: '400',
        x: '20',
        y: '80',
      },
      table: {
        fontSize: '10px',
        tableLayout: 'fixed',
        wordBreak: 'break-word',
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
          fill: '#333740',
          fontFamily: 'inherit',
          fontSize: 10,
        },
      },

      // DATA SET
      axisOne: {
        grid: {
          stroke: ({ tick }) => (tick === -10 ? 'transparent' : '#a8abac'),
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
      barOne: {
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

  whichStyle() {
    const { styleType } = this.props;

    switch (styleType) {
      case 'dash':
        return this.getStylesDashboard();
      case 'main':
        return this.getStylesMain();
      case 'sidebar':
        return this.getStylesSidebar();
      default:
        return this.getStylesMain();
    }
  }

  prepRows(data) {
    //console.log('table data', data);
    const user = userService.userValue;

    let rows;
    if (!data) {
      rows = (
        <Table.Row>
          <Table.Cell>
            <Dimmer active>
              <Loader>Loading...</Loader>
            </Dimmer>
          </Table.Cell>
        </Table.Row>
      );
    } else {
      rows = data.map((row, idx) => {
        // check if logged in user is initialAssignment user
        if (user.email === row.initialAssignment) {
          return (
            <Table.Row key={idx}>
              <Table.Cell>{row.customerName}</Table.Cell>
              <Table.Cell>{row.caseNumber}</Table.Cell>
              <Table.Cell>{row.updatedAt}</Table.Cell>
              <Table.Cell>{row.outcomeResolution}</Table.Cell>
            </Table.Row>
          );
        } else return null;
      });
    }
    return rows;
  }

  render() {
    const { chartNumber, data, description, title } = this.props;
    const styles = this.whichStyle();
    const dataSetOne = this.getDataSetOne();

    return (
      <svg
        style={styles.parent}
        overflow={styles.svg.overflow}
        viewBox={styles.svg.viewBox}
      >
        {/* Create stylistic elements */}
        <rect x="0" y="0" width="10" height="30" fill="#ee303d" />
        <rect x="420" y="10" width="20" height="20" fill="#517790" />

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

        <foreignObject
          height={styles.foreignObject.height}
          overflow={styles.foreignObject.overflow}
          width={styles.foreignObject.width}
          x={styles.foreignObject.x}
          y={styles.foreignObject.y}
        >
          <div xmlns="http://www.w3.org/1999/xhtml">
            <Table
              collapsing={styles.table.collapsing}
              compact={styles.table.compact}
              striped
              style={styles.table}
              unstackable
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Customer Name</Table.HeaderCell>
                  <Table.HeaderCell>Case Number</Table.HeaderCell>
                  <Table.HeaderCell>Last Updated</Table.HeaderCell>
                  <Table.HeaderCell>Resolution</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>{this.prepRows(data)}</Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Menu floated="right" pagination size="mini">
                      <Menu.Item as="a" icon>
                        <Icon name="chevron left" />
                      </Menu.Item>
                      <Menu.Item as="a">1</Menu.Item>
                      <Menu.Item as="a">2</Menu.Item>
                      <Menu.Item as="a">3</Menu.Item>
                      <Menu.Item as="a">4</Menu.Item>
                      <Menu.Item as="a" icon>
                        <Icon name="chevron right" />
                      </Menu.Item>
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        </foreignObject>
      </svg>
    );
  }
}

export default CustomTable;
