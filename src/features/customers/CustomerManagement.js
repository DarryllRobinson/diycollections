import React, { useEffect, useState } from 'react';
import { Container, Dimmer, Form, Loader } from 'semantic-ui-react';

import { customerService } from './customer.service';

export const CustomerManagement = () => {
  const [customers, setCustomers] = useState(null);
  const [customerStatus, setCustomerStatus] = useState('idle');

  useEffect(() => {
    async function fetchCustomers() {
      setCustomerStatus('loading');
      setCustomers(await customerService.getAll());
      setCustomerStatus('succeeded');
    }

    fetchCustomers();
  }, []);

  let content;

  if (!customers) {
    content = (
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    );
  } else if (customerStatus === 'error') {
    content = <div>error</div>;
  } else if (customerStatus === 'succeeded' && customers) {
    console.log('customers: ', customers);
    content = customers.map((customer) => {
      return (
        <Form.Input
          key={customer.customerRefNo}
          defaultValue={customer.customerName}
        />
      );
    });
  }

  return (
    <Container>
      <Form>{content}</Form>
    </Container>
  );
};
