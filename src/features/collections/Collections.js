import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Dimmer,
  Header,
  Loader,
  Table,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { collectionService } from './collection.service';

export const Collections = (props) => {
  //console.log('Collections props', props);
  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [collections, setCollections] = useState(null);
  const [recordStatus, setRecordStatus] = useState('Open');
  const [collectionStatus, setCollectionStatus] = useState('idle');
  const caseStatus =
    props.location.state !== undefined
      ? props.location.state.caseStatus
      : 'Open';

  const loadRecords = async (caseStatus) => {
    setCollections(await collectionService.getAll());
    setRecordStatus(caseStatus);
    setCollectionStatus('succeeded');
    //console.log('collections: ', collections);
  };

  useEffect(() => {
    if (collectionStatus === 'idle') {
      setRecordStatus(caseStatus);
      // populate collections
      loadRecords(caseStatus);
    }
  }, [caseStatus, collectionStatus, loadRecords]);

  let content;

  if (!collections) {
    content = (
      <Table.Row>
        <Table.Cell>
          <Dimmer active>
            <Loader>Loading...</Loader>
          </Dimmer>
        </Table.Cell>
      </Table.Row>
    );
  } else {
    content = collections.map((collections) => {
      //console.log('got some collections: ', collections.updatedAt);
      if (collections.currentStatus === recordStatus) {
        const hlink = `/collection/${collections.caseNumber}`;
        return (
          <Table.Row className="collections row" key={collections.caseNumber}>
            <Table.Cell>
              <Button as={Link} to={hlink} style={{ padding: '10px' }}>
                Open
              </Button>
            </Table.Cell>
            <Table.Cell>{collections.accountNumber}</Table.Cell>
            <Table.Cell>{collections.customerName}</Table.Cell>
            <Table.Cell>{collections.regIdNumber}</Table.Cell>
            <Table.Cell textAlign="right">{collections.debtorAge}</Table.Cell>
            <Table.Cell>{collections.caseNotes}</Table.Cell>
            <Table.Cell textAlign="right">
              R {collections.totalBalance}
            </Table.Cell>
            <Table.Cell textAlign="right">R {collections.amountDue}</Table.Cell>
            <Table.Cell textAlign="right">
              R {collections.currentBalance}
            </Table.Cell>
            <Table.Cell>{collections.resolution}</Table.Cell>
            <Table.Cell>
              {moment(collections.nextVisitDateTime).format('YYYY-MM-DD HH:mm')}
            </Table.Cell>
            <Table.Cell>{collections.currentAssignment}</Table.Cell>
            <Table.Cell>{collections.updatedBy}</Table.Cell>
            <Table.Cell>
              {moment(collections.updatedAt).format('YYYY-MM-DD HH:mm')}
            </Table.Cell>
          </Table.Row>
        );
      } else {
        return null;
      }
    });
  }

  const renderHeader = () => {
    //console.log('recordStatus: ', recordStatus);
    switch (recordStatus) {
      case 'Closed':
        return (
          <Header as="h2" dividing style={{ padding: '15px' }}>
            Collections: {recordStatus}{' '}
            <Button onClick={() => loadRecords('Open')}>Load Open</Button>
            <Button onClick={() => loadRecords('Pended')}>Load Pended</Button>
          </Header>
        );
      case 'Open':
        return (
          <Header as="h2" dividing style={{ padding: '15px' }}>
            Collections: {recordStatus}{' '}
            <Button onClick={() => loadRecords('Closed')}>Load Closed</Button>
            <Button onClick={() => loadRecords('Pended')}>Load Pended</Button>
          </Header>
        );
      case 'Pended':
        return (
          <Header as="h2" dividing style={{ padding: '15px' }}>
            Collections: {recordStatus}{' '}
            <Button onClick={() => loadRecords('Closed')}>Load Closed</Button>
            <Button onClick={() => loadRecords('Open')}>Load Open</Button>
          </Header>
        );
      default:
        return (
          <Header as="h2" dividing style={{ padding: '15px' }}>
            Collections: {recordStatus} Status not found
          </Header>
        );
    }
  };

  return (
    <Container className="collections">
      {renderHeader()}

      <Table
        className="collections"
        celled
        selectable
        unstackable
        compact
        size="small"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Case Number</Table.HeaderCell>
            <Table.HeaderCell>Account Number</Table.HeaderCell>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Registration / ID Number</Table.HeaderCell>
            <Table.HeaderCell>Debtor Age</Table.HeaderCell>
            <Table.HeaderCell>Case Notes</Table.HeaderCell>
            <Table.HeaderCell>Total Balance</Table.HeaderCell>
            <Table.HeaderCell>Amount Due</Table.HeaderCell>
            <Table.HeaderCell>Current Balance</Table.HeaderCell>
            <Table.HeaderCell>Resolution</Table.HeaderCell>
            <Table.HeaderCell>Next Visit Date and Time</Table.HeaderCell>
            <Table.HeaderCell>Current Assignment</Table.HeaderCell>
            <Table.HeaderCell>Updated By</Table.HeaderCell>
            <Table.HeaderCell>Updated Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{content}</Table.Body>
      </Table>
    </Container>
  );
};
