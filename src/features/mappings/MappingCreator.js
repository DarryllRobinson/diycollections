import React, { Component } from 'react';
import { Container, Message, Step } from 'semantic-ui-react';

import CustomerDetails from './CustomerDetails';
import AccountDetails from './AccountDetails';
import ContactDetails from './ContactDetails';
import Confirmation from './Confirmation';
import Success from './Success';
import { mappingService } from './mapping.service';

class MappingCreator extends Component {
  state = {
    // customer
    step: 1,
    operatorShortCode: 'operatorShortCode',
    customerRefNo: 'customerRefNo',
    customerName: 'customerName',
    customerEntity: 'customerEntity',
    regIdNumber: 'regIdNumber',
    customerType: 'customerType',
    productType: 'productType',
    address1: 'address1',
    address2: 'address2',
    address3: 'address3',
    address4: 'address4',
    address5: 'address5',
    closedDate: 'closedDate',
    regIdStatus: 'regIdStatus',
    f_clientId: 'f_clientId',

    // account
    accountNumber: 'accountNumber',
    accountName: 'accountName',
    openDate: 'openDate',
    debtorAge: 'debtorAge',
    paymentTermDays: 'paymentTermDays',
    creditLimit: 'creditLimit',
    totalBalance: 'totalBalance',
    amountDue: 'amountDue',
    currentBalance: 'currentBalance',
    days30: 'days30',
    days60: 'days60',
    days90: 'days90',
    days120: 'days120',
    days150: 'days150',
    days180: 'days180',
    days180Over: 'days180Over',
    paymentMethod: 'paymentMethod',
    paymentDueDate: 'paymentDueDate',
    debitOrderDate: 'debitOrderDate',
    lastPaymentDate: 'lastPaymentDate',
    lastPaymentAmount: 'lastPaymentAmount',
    lastPTPDate: 'lastPTPDate',
    lastPTPAmount: 'lastPTPAmount',
    accountNotes: 'accountNotes',
    accountStatus: 'accountStatus',
    arg: 'arg',
    tenant: 'tenant',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    f_customerRefNo: 'f_customerRefNo',

    // contact
    primaryContactName: 'primaryContactName',
    primaryContactNumber: 'primaryContactNumber',
    primaryContactEmail: 'primaryContactEmail',
    representativeName: 'representativeName',
    representativeNumber: 'representativeNumber',
    representativeEmail: 'representativeEmail',
    alternativeRepName: 'alternativeRepName',
    alternativeRepNumber: 'alternativeRepNumber',
    alternativeRepEmail: 'alternativeRepEmail',
    otherNumber1: 'otherNumber1',
    otherNumber2: 'otherNumber2',
    otherNumber3: 'otherNumber3',
    otherNumber4: 'otherNumber4',
    otherNumber5: 'otherNumber5',
    otherNumber6: 'otherNumber6',
    otherNumber7: 'otherNumber7',
    otherNumber8: 'otherNumber8',
    otherNumber9: 'otherNumber9',
    otherNumber10: 'otherNumber10',
    otherEmail1: 'otherEmail1',
    otherEmail2: 'otherEmail2',
    otherEmail3: 'otherEmail3',
    otherEmail4: 'otherEmail4',
    otherEmail5: 'otherEmail5',
    otherEmail6: 'otherEmail6',
    otherEmail7: 'otherEmail7',
    otherEmail8: 'otherEmail8',
    otherEmail9: 'otherEmail9',
    otherEmail10: 'otherEmail10',
    dnc1: 'dnc1',
    dnc2: 'dnc2',
    dnc3: 'dnc3',
    dnc4: 'dnc4',
    dnc5: 'dnc5',
    f_accountNumber: 'f_accountNumber',
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

  checkFields = (fields) => {
    this.setState({ error: false });
    // check if all fields are populated
    if (!fields) {
      this.setState({ error: true });
      return false;
    }
    return true;
  };

  updateDatabase = async () => {
    mappingService.updateMapping(this.state);
  };

  render() {
    //console.log('MappingCreator: ', this.props);
    const { step } = this.state;
    const {
      // customer
      operatorShortCode,
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
      closedDate,
      regIdStatus,
      f_clientId,

      // account
      accountNumber,
      accountName,
      openDate,
      debtorAge,
      paymentTermDays,
      creditLimit,
      totalBalance,
      amountDue,
      currentBalance,
      days30,
      days60,
      days90,
      days120,
      days150,
      days180,
      days180Over,
      paymentMethod,
      paymentDueDate,
      debitOrderDate,
      lastPaymentDate,
      lastPaymentAmount,
      lastPTPDate,
      lastPTPAmount,
      accountNotes,
      accountStatus,
      arg,
      f_customerRefNo,

      // contact
      primaryContactName,
      primaryContactNumber,
      primaryContactEmail,
      representativeName,
      representativeNumber,
      representativeEmail,
      alternativeRepName,
      alternativeRepNumber,
      alternativeRepEmail,
      otherNumber1,
      otherNumber2,
      otherNumber3,
      otherNumber4,
      otherNumber5,
      otherNumber6,
      otherNumber7,
      otherNumber8,
      otherNumber9,
      otherNumber10,
      otherEmail1,
      otherEmail2,
      otherEmail3,
      otherEmail4,
      otherEmail5,
      otherEmail6,
      otherEmail7,
      otherEmail8,
      otherEmail9,
      otherEmail10,
      dnc1,
      dnc2,
      dnc3,
      dnc4,
      dnc5,
      f_accountNumber,
    } = this.state;
    const values = {
      // customer
      operatorShortCode,
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
      closedDate,
      regIdStatus,
      f_clientId,

      // account
      accountNumber,
      accountName,
      openDate,
      debtorAge,
      paymentTermDays,
      creditLimit,
      totalBalance,
      amountDue,
      currentBalance,
      days30,
      days60,
      days90,
      days120,
      days150,
      days180,
      days180Over,
      paymentMethod,
      paymentDueDate,
      debitOrderDate,
      lastPaymentDate,
      lastPaymentAmount,
      lastPTPDate,
      lastPTPAmount,
      accountNotes,
      accountStatus,
      arg,
      f_customerRefNo,

      // contact
      primaryContactName,
      primaryContactNumber,
      primaryContactEmail,
      representativeName,
      representativeNumber,
      representativeEmail,
      alternativeRepName,
      alternativeRepNumber,
      alternativeRepEmail,
      otherNumber1,
      otherNumber2,
      otherNumber3,
      otherNumber4,
      otherNumber5,
      otherNumber6,
      otherNumber7,
      otherNumber8,
      otherNumber9,
      otherNumber10,
      otherEmail1,
      otherEmail2,
      otherEmail3,
      otherEmail4,
      otherEmail5,
      otherEmail6,
      otherEmail7,
      otherEmail8,
      otherEmail9,
      otherEmail10,
      dnc1,
      dnc2,
      dnc3,
      dnc4,
      dnc5,
      f_accountNumber,
    };

    let content;

    switch (step) {
      case 1:
        content = (
          <CustomerDetails
            checkFields={this.checkFields}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            updateMapping={this.updateMapping}
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
            updateMapping={this.updateMapping}
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
            updateMapping={this.updateMapping}
            values={values}
          />
        );
        break;
      case 4:
        content = (
          <Confirmation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            updateMapping={this.updateMapping}
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

export default MappingCreator;
