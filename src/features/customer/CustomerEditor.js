import React, { useEffect, useState } from 'react';
import { Container, Form, Message } from 'semantic-ui-react';

//import { accountService } from '../accounts/account.service';
//import { alertService } from '../alerts/alert.service';
import { customerService } from './customer.service';

export const CustomerEditor = ({ match }) => {
  //console.log(match);
  //const { id } = match.params;
  const id = 'AIM101';
  const [customer, setCustomer] = useState(null);
  const [customerStatus, setCustomerStatus] = useState('idle');
  const [state, setState] = useState({
    // the id state just to keep the React warning happy
    id: null,
    fields: {
      ids: [
        'customerRefNo',
        'customerName',
        'customerEntity',
        'regIdNumber',
        'regIdStatus',
        'customerType',
        'productType',
        'address1',
        'address2',
        'address3',
        'address4',
        'address5',
      ],
      entities: {
        customerRefNo: { isError: false, value: '' },
        customerName: { isError: false, value: '' },
        customerEntity: { isError: false, value: '' },
        regIdNumber: { isError: false, value: '' },
        regIdStatus: { isError: false, value: '' },
        customerType: { isError: false, value: '' },
        productType: { isError: false, value: '' },
        address1: { isError: false, value: '' },
        address2: { isError: false, value: '' },
        address3: { isError: false, value: '' },
        address4: { isError: false, value: '' },
        address5: { isError: false, value: '' },
      },
    },
  });

  useEffect(() => {
    async function fetchCustomer() {
      setCustomerStatus('loading');
      setCustomer(await customerService.getById(id));
      setCustomerStatus('succeeded');
    }

    fetchCustomer();
    setState({ id: 1 });
  }, [id]);

  let content, oldcontent;

  if (customerStatus === 'error') {
    content = <Message>error</Message>;
  } else if (customerStatus === 'succeeded') {
    const {
      customerRefNo,
      customerName,
      customerEntity,
      regIdNumber,
      regIdStatus,
      customerType,
      productType,
      address1,
      address2,
      address3,
      address4,
      address5,
    } = customer;

    console.log('customer: ', customer);

    const fields = state.fields;
    console.log('fields: ', fields);
    content = fields.ids.map((field, idx) => {
      console.log('value: ', fields.entities[field].value);
      return (
        <Form.Input defaultValue={fields.entities[field].value}></Form.Input>
      );
    });

    oldcontent = (
      <>
        <Form.Group>
          <Form.Input
            defaultValue={customerRefNo}
            label="Customer Reference"
            width={4}
          />
          <Form.Input
            defaultValue={customerName}
            label="Customer Name"
            width={8}
          />
          <Form.Input
            defaultValue={customerEntity}
            label="Customer Entity"
            width={4}
          />
        </Form.Group>

        <br />
        <br />

        <Form.Group>
          <Form.Input
            defaultValue={regIdNumber}
            label="Registration / Identity Number"
            width={4}
          />
          <Form.Input
            defaultValue={regIdStatus}
            label="Registration / Identity Number Status"
            width={4}
          />
          <Form.Input
            defaultValue={customerType}
            label="Customer Type"
            width={4}
          />
          <Form.Input
            defaultValue={productType}
            label="Product Type"
            width={4}
          />
        </Form.Group>

        <br />
        <br />

        <Form.Group>
          <Form.Input defaultValue={address1} label="Address 1" width={8} />
          <Form.Input defaultValue={address2} label="Address 2" width={8} />
        </Form.Group>
        <Form.Group>
          <Form.Input defaultValue={address3} label="Address 3" width={8} />
          <Form.Input defaultValue={address4} label="Address 4" width={8} />
        </Form.Group>
        <Form.Group>
          <Form.Input defaultValue={address5} label="Address 5" width={8} />
        </Form.Group>
      </>
    );
  }

  return (
    <Container>
      <Form loading={customerStatus === 'loading'}>
        {(content, oldcontent)}
      </Form>
    </Container>
  );
};
