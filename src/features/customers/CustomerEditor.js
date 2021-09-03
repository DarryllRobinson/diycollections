import React, { useEffect, useState } from 'react';
import { Container, Dimmer, Form, Loader, Message } from 'semantic-ui-react';

import { accountService } from '../accounts/account.service';
//import { alertService } from '../alerts/alert.service';
import { customerService } from './customer.service';

export const CustomerEditor = ({ match }) => {
  const { id } = match.params;
  const [account, setAccount] = useState(null);
  const [accountStatus, setAccountStatus] = useState('idle');
  const [customer, setCustomer] = useState(null);
  const [customerStatus, setCustomerStatus] = useState('idle');

  useEffect(() => {
    async function fetchCustomer() {
      setCustomerStatus('loading');
      setCustomer(await customerService.getById(id));
      setCustomerStatus('succeeded');
    }
    async function fetchAccount() {
      setAccountStatus('loading');
      setAccount(await accountService.getAccount(id));
      setAccountStatus('succeeded');
    }

    fetchCustomer();
    fetchAccount();
  }, [id]);

  let content;

  if (accountStatus === 'loading' || customerStatus === 'loading') {
    content = (
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    );
  } else if (accountStatus === 'error' || customerStatus === 'error') {
    content = <Message>error</Message>;
  } else if (accountStatus === 'succeeded' || customerStatus === 'succeeded') {
    const { customerRefNo, customerName } = customer;
    const {
      days30,
      days60,
      days90,
      /*days120,
      days150,
      days180,
      days180Over,
      totalBalance,*/
    } = account;
    console.log('account: ', account);
    console.log('customer: ', customer);
    content = (
      <>
        <Form.Group>
          <Form.Input defaultValue={customerRefNo} label="Customer Reference" />
          <Form.Input defaultValue={customerName} label="Customer Name" />
        </Form.Group>
        <Form.Group>
          <Form.Input defaultValue={days30} label="30 Days" />
          <Form.Input defaultValue={days60} label="60 Days" />
          <Form.Input defaultValue={days90} label="90 Days" />
        </Form.Group>
      </>
    );
  }

  return (
    <Container>
      <Form>{content}</Form>
    </Container>
  );
};
