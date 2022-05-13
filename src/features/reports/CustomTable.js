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
        border: '1px solid #000000',
        boxSizing: 'border-box',
        display: 'inline',
        height: '80vh',
        margin: '15px 3px',
        fontFamily: "'Fira Sans', sans-serif",
        width: '80vw',
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
        width: '800',
        x: '-120',
        y: '80',
      },
      table: {
        fontFamily: "'Fira Sans', sans-serif",
        width: '100%',
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
        height: '200',
        margin: '15px 3px',
        fontFamily: "'Fira Sans', sans-serif",
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
        color: 'red',
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
      <svg style={styles.parent} viewBox="0 0 450 350">
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
          width={styles.foreignObject.width}
          x={styles.foreignObject.x}
          y={styles.foreignObject.y}
        >
          <div xmlns="http://www.w3.org/1999/xhtml">
            <Table style={styles.table}>
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
                    <Menu floated="right" pagination>
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
