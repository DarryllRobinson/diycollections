import React, { Component } from 'react';
import { Container, Message, Step } from 'semantic-ui-react';

import CustomerDetails from './CustomerDetails';
import AccountDetails from './AccountDetails';
import ContactDetails from './ContactDetails';
import Confirmation from './Confirmation';
import Success from './Success';

class CustomerCreator extends Component {
  state = {
    step: 1,
    customerRefNo: '',
    customerName: '',
    customerEntity: '',
    regIdNumber: '',
    customerType: '',
    productType: '',
    address1: '',
    address2: '',
    address3: '',
    address4: '',
    address5: '',
    f_clientId: '',
    directDebitDate: '',
    paymentTermDays: '',
    primaryContactName: '',
    primaryContactNumber: '',
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      customerRefNo,
      customerName,
      customerEntity,
      regIdNumber,
      customerType,
      productType,
      address1,
      address2,
      address3,
      address4,
      address5,
      f_clientId,
      directDebitDate,
      paymentTermDays,
      primaryContactName,
      primaryContactNumber,
    } = this.state;

    const values = {
      customerRefNo,
      customerName,
      customerEntity,
      regIdNumber,
      customerType,
      productType,
      address1,
      address2,
      address3,
      address4,
      address5,
      f_clientId,
      directDebitDate,
      paymentTermDays,
      primaryContactName,
      primaryContactNumber,
    };

    let content;

    switch (step) {
      case 1:
        content = (
          <CustomerDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        break;
      case 2:
        content = (
          <AccountDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        break;
      case 3:
        content = (
          <ContactDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        break;
      case 4:
        content = (
          <Confirmation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
        break;
      case 5:
        content = <Success />;
        break;
      default:
        content = <Message>Something went wrong</Message>;
    }

    return (
      <Container>
        <Step.Group fluid ordered>
          <Step active={step === 1} completed={step > 1}>
            <Step.Content>
              <Step.Title>Customer Details</Step.Title>
              <Step.Description>
                Customer name, entity type, etc.
              </Step.Description>
            </Step.Content>
          </Step>

          <Step active={step === 2} completed={step > 2}>
            <Step.Content>
              <Step.Title>Account Details</Step.Title>
              <Step.Description>
                Payment terms, direct debit date, etc.
              </Step.Description>
            </Step.Content>
          </Step>

          <Step active={step === 3} completed={step > 3}>
            <Step.Content>
              <Step.Title>Contact Information</Step.Title>
              <Step.Description>Primary contact information</Step.Description>
            </Step.Content>
          </Step>

          <Step active={step === 4} completed={step > 4}>
            <Step.Content>
              <Step.Title>Confirmation</Step.Title>
              <Step.Description>
                Confirmation of information entered
              </Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
        {content}
      </Container>
    );
  }
}

export default CustomerCreator;
