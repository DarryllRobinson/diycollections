import React from 'react';
import { Dimmer, Header, Icon, Loader, Menu, Table } from 'semantic-ui-react';

class CustomTable extends React.Component {
  prepRows(data) {
    //console.log('table data', data);
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
        return (
          <Table.Row className="report row" key={idx}>
            <Table.Cell>{row.customerName}</Table.Cell>
            <Table.Cell>{row.caseNumber}</Table.Cell>
            <Table.Cell>{row.updatedAt}</Table.Cell>
            <Table.Cell>{row.outcomeResolution}</Table.Cell>
          </Table.Row>
        );
      });
    }
    return rows;
  }

  render() {
    const { chartNumber, data, description, styleType, title } = this.props;

    return (
      <>
        <Header as="h2">{title}</Header>
        <Table celled>
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
      </>
    );
  }
}

export default CustomTable;
