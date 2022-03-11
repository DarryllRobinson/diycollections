import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Dimmer,
  Icon,
  Loader,
  Message,
  Table,
} from 'semantic-ui-react';
import moment from 'moment';

import { customerService } from './customer.service';

export const CustomerManagement = () => {
  const [invoices, setInvoices] = useState(null);
  const [invoicesStatus, setInvoicesStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchInvoices() {
      setInvoicesStatus('loading');
      setInvoices(await customerService.getAllInvoices());
      setInvoicesStatus('succeeded');
    }

    //fetchCustomers();
    fetchInvoices();
  }, []);

  // Currency converter function
  const currencyFormatter = (currency) => {
    //console.log('Currency: ', currency);
    if (currency !== 0 && currency) {
      return (
        'R ' + currency.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
      );
    } else {
      return 'R 0.00';
    }
  };

  let content;

  if (invoicesStatus === 'loading') {
    content = (
      <Table.Row>
        <Table.Cell>
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        </Table.Cell>
      </Table.Row>
    );
  } else if (invoicesStatus === 'error') {
    content = <Message>error</Message>;
  } else if (invoicesStatus === 'succeeded') {
    //console.log('invoices: ', invoices);
    content = invoices.map(
      ({ customerRefNo, customerName, viewed, totalBalance }, idx) => {
        //if (invoice.customerRefNo === 'AEO101')
        //console.log('invoice.hasViewed: ', invoice.hasViewed);
        //console.log('content: ', content);
        return (
          <Table.Row key={idx} positive={!!viewed}>
            <Table.Cell collapsing>
              <Button animated as={Link} to={`/customers/${customerRefNo}`}>
                <Button.Content visible>
                  <Icon name="cogs" />
                </Button.Content>
                <Button.Content hidden>Edit</Button.Content>
              </Button>
            </Table.Cell>
            <Table.Cell>{customerRefNo}</Table.Cell>
            <Table.Cell>{customerName}</Table.Cell>
            {!!viewed && (
              <Table.Cell>
                {moment(viewed).format('YYYY-MM-DD HH:mm:ss')}
              </Table.Cell>
            )}
            {!viewed && <Table.Cell></Table.Cell>}
            <Table.Cell textAlign="right">
              {currencyFormatter(totalBalance)}
            </Table.Cell>
          </Table.Row>
        );
      }
    );
  }

  return (
    <Container>
      <Table compact celled definition sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Customer Reference</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Most Recent Invoice Viewed</Table.HeaderCell>
            <Table.HeaderCell>Total Outstanding</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{content}</Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <Button
                as={Link}
                to="/customers/create"
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
              >
                <Icon name="user" /> Add Customer
              </Button>
              <Button size="small">Approve</Button>
              <Button disabled size="small">
                Approve All
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  );
};
