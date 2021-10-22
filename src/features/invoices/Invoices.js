import React, { createRef, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Dimmer,
  Header,
  Loader,
  Message,
  Portal,
  Segment,
  Table,
} from 'semantic-ui-react';
import moment from 'moment';

import { alertService } from '../alerts/alert.service';
import { invoiceService } from './invoice.service';
import { InvoiceViewer } from './InvoiceViewer';

export const Invoices = () => {
  const [invoice, setInvoice] = useState(null);
  const [invoiceStatus, setInvoiceStatus] = useState('idle');
  const [invoices, setInvoices] = useState(null);
  const [invoicesStatus, setInvoicesStatus] = useState('idle');

  // Portal handlers
  const [open, setOpen] = useState(false);

  // will end up coming from the customer details
  const f_customerRefNo = 'AIM101';

  useEffect(() => {
    async function fetchInvoices() {
      setInvoicesStatus('loading');
      setInvoices(await invoiceService.getAllByCustomer(f_customerRefNo));
      setInvoicesStatus('succeeded');
    }

    fetchInvoices();
    //console.log('invoices: ', invoices);
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

  async function fetchInvoice(fileLocation) {
    setInvoiceStatus('loading');
    //console.log('getting invoice with file location: ', fileLocation);
    setInvoice(await invoiceService.getDocByLoc({ location: fileLocation }));
    //const inv = await invoiceService.getDocByLoc(location);
    //setInvoice(inv);
    setInvoiceStatus('succeeded');
  }

  const URL = createRef();

  useEffect(() => {
    //console.log('useEffect triggered: ', invoice, invoiceStatus);

    // download file
    function downloadFile(invoice) {
      //console.log('downloadFile ', invoice);
      if (invoiceStatus === 'succeeded' && invoice) {
        //console.log('got invoice', invoice);
        try {
          const file = base64ToArrayBuffer(invoice);
          // window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))
          const objectURL = window.URL.createObjectURL(
            new Blob([file], { type: 'application/pdf' })
          );
          console.log('objectURL: ', objectURL);
          let a = document.createElement('a');
          a.href = objectURL;
          a.download = 'test.pdf';
          console.log('a: ', a);
          a.click();
          //window.URL.revokeObjectURL(objectURL);
        } catch (e) {
          alertService.error('Error', e.message);
        }
      }
    }

    downloadFile(invoice);
  }, [invoice, invoiceStatus]);

  function base64ToArrayBuffer(base64) {
    //atob(imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    var binaryString = window.atob(
      base64.replace(/^data:application\/pdf;base64,/, '')
    );
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  let content;

  if (invoicesStatus === 'loading') {
    content = (
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    );
  } else if (invoicesStatus === 'error') {
    content = <Message>error</Message>;
  } else if (invoicesStatus === 'succeeded') {
    //console.log('invoices: ', invoices);
    content = (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Invoice date</Table.HeaderCell>
            <Table.HeaderCell>Total Balance</Table.HeaderCell>
            <Table.HeaderCell>Viewed</Table.HeaderCell>
            <Table.HeaderCell>Days Left</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>{createTable(invoices)}</Table.Body>
      </Table>
    );
  }

  function daysLeft(term, dueDate, datePaid) {
    // calculates the days left to pay the invoice
    const daysLeft = moment(Date.now()).diff(dueDate, 'days');
    if (!datePaid) return term - daysLeft;
    return;
  }

  function isWarning(term, dueDate, datePaid) {
    if (daysLeft(term, dueDate) < 0 && !datePaid) return true;
  }

  function payButton(datePaid) {
    return !datePaid && <Button color="red" icon="credit card" />;
  }

  function createTable(invoices) {
    return invoices.map(
      ({
        created,
        invoiceLocation,
        invoiceToken,
        totalBalance,
        viewed,
        paymentTermDays,
        datePaid,
      }) => {
        return (
          <Table.Row
            key={invoiceToken}
            negative={isWarning(paymentTermDays, created, datePaid)}
          >
            <Table.Cell>{moment(created).format('YYYY-MM')}</Table.Cell>
            <Table.Cell>{currencyFormatter(totalBalance)}</Table.Cell>
            {!!viewed && (
              <Table.Cell collapsing>
                {moment(viewed).format('YYYY-MM-DD HH:mm:ss')}
              </Table.Cell>
            )}
            {!viewed && <Table.Cell></Table.Cell>}
            <Table.Cell>
              {daysLeft(paymentTermDays, created, datePaid)}
            </Table.Cell>
            <Table.Cell collapsing>
              {payButton(datePaid)}
              <Button onClick={() => setOpen(true)} primary icon="eye" />{' '}
              <Button
                onClick={() => fetchInvoice(invoiceLocation)}
                secondary
                icon="cloud download"
              />
            </Table.Cell>
          </Table.Row>
        );
      }
    );
  }

  return (
    <Container className="RouteDetermination">
      {content}
      <Portal open={open}>
        <Segment
          style={{
            height: '1000px',
            left: '30%',
            position: 'fixed',
            top: '3%',
            width: '660px',
            zIndex: 1000,
          }}
        >
          <Container textAlign="center">
            <Header>Invoice Viewer</Header>
          </Container>
          <Container textAlign="right">
            <Button content="X" onClick={() => setOpen(false)} />
          </Container>
          <InvoiceViewer token="1f7f37ade72371ab1f0a53705029d769ad1d31ca3c78e9fbbb04aa1729339cc59efb0a799c585d0b" />
        </Segment>
      </Portal>
    </Container>
  );
};
