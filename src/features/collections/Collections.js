import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Dimmer,
  Header,
  Loader,
  Message,
  Table,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { collectionService } from './collection.service';
//import { alertService } from '../alerts/alert.service';
import SearchComponent from '../search/Search';

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

  const loadRecords = useCallback(async (caseStatus) => {
    const records = await collectionService.getAll();
    console.log('records:', records);
    setCollectionStatus('loading');

    setCollections(records);
    setRecordStatus(caseStatus);
    setCollectionStatus('succeeded');
  }, []);

  useEffect(() => {
    if (collectionStatus === 'idle') {
      setRecordStatus(caseStatus);
      // populate collections
      loadRecords(caseStatus);
    }
  }, [caseStatus, collectionStatus, loadRecords]);

  let content;

  if (collectionStatus === 'loading') {
    content = (
      <Table.Row>
        <Table.Cell>
          <Dimmer active>
            <Loader>Loading...</Loader>
          </Dimmer>
        </Table.Cell>
      </Table.Row>
    );
  } else if (collectionStatus === 'error') {
    content = <Message>error</Message>;
  } else if (collectionStatus === 'succeeded') {
    content = collections.map((collections) => {
      //console.log('got some collections: ', collections.customerName);
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
              {collections.nextVisitDateTime
                ? moment(collections.nextVisitDateTime).format(
                    'YYYY-MM-DD HH:mm'
                  )
                : ''}
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
          <>
            <Header className="collections" as="h2" floated="left">
              Collections: {recordStatus}{' '}
              <Button onClick={() => loadRecords('Open')}>Load Open</Button>
            </Header>
            <Header className="collections" floated="right">
              <SearchComponent records={collections} />
            </Header>
          </>
        );
      case 'Open':
        return (
          <>
            <Header className="collections" as="h2" floated="left">
              Collections: {recordStatus}{' '}
              <Button onClick={() => loadRecords('Closed')}>Load Closed</Button>
            </Header>
            <Header className="collections" floated="right">
              <SearchComponent records={collections} />
            </Header>
          </>
        );
      default:
        return (
          <>
            <Header className="collections" as="h2" floated="left">
              Collections: {recordStatus} Status not found{' '}
              <Button onClick={() => loadRecords('Closed')}>Load Closed</Button>
              <Button onClick={() => loadRecords('Open')}>Load Open</Button>
            </Header>
            <Header className="collections" floated="right">
              <SearchComponent records={collections} />
            </Header>
          </>
        );
    }
  };

  return (
    <Container className="collections" fluid>
      {renderHeader()}

      <Table
        className="collections"
        celled
        compact
        fixed
        selectable
        size="small"
        unstackable
      >
        <Table.Header className="collections">
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
        <Table.Body className="collections">{content}</Table.Body>
      </Table>
    </Container>
  );
};
