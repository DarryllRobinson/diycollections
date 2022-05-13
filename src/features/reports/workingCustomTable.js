import React from 'react';
import { Dimmer, Header, Icon, Loader, Menu, Table } from 'semantic-ui-react';

import { userService } from '../users/user.service';

class CustomTable extends React.Component {
  getStylesDashboard() {
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
    };
  }

  getStylesMain() {
    return {
      parent: {
        background: '#ffffff',
        border: '1px solid #000000',
        boxSizing: 'border-box',
        display: 'inline',
        height: '20',
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
    };
  }

  getStylesSidebar() {
    return {
      parent: {
        background: '#ffffff',
        border: '1px solid #000000',
        boxSizing: 'border-box',
        display: 'inline',
        fontFamily: "'Fira Sans', sans-serif",
        margin: '15px 3px',
        height: '20px',
        tableLayout: 'fixed',
        width: '20px',
        wordBreak: 'break-word',
      },
      title: {
        textAnchor: 'start',
        verticalAnchor: 'end',
        fill: '#333740',
        fontFamily: 'inherit',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    };
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
    console.log('styles ', styles);

    return (
      <div>
        <Header as="h2">
          {title} {chartNumber + 1}
        </Header>
        <Header as="h4">{description}</Header>
        {/*<Table className="report-table">*/}
        <Table style={styles.parent}>
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
    );
  }
}

export default CustomTable;
