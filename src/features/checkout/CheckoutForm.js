import React, { useState } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements';

import { checkoutService } from './checkout.service';

const CheckoutForm = ({ closePayPortal, stripe }) => {
  const [receiptUrl, setReceiptUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { token } = await stripe.createToken();
      console.log('token', token);

      const order = await checkoutService.checkout({
        amount: 999, //selectedProduct.price.toString().replace('.', ''),
        source: token.id,
        receipt_email: 'customer@example.com',
      });
      setReceiptUrl(order.charge.receipt_url);
    } catch (e) {
      console.log('error: ', e.message);
    }
  };

  if (receiptUrl) {
    console.log('payment successful');
    console.log('receiptUrl: ', receiptUrl);
    return (
      <div className="success">
        <Header size="large">Payment Successful!</Header>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <Container>
      <Header size="large">Amount: $9.99</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field inline>
            <label>Card details</label>
            <CardNumberElement />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field inline>
            <label>Expiration date</label>
            <CardExpiryElement />
          </Form.Field>
          <Form.Field inline>
            <label>CVC</label>
            <CardCVCElement />
          </Form.Field>
        </Form.Group>
        <Button type="submit">Pay</Button>
      </Form>
    </Container>
  );
};

export default injectStripe(CheckoutForm);
