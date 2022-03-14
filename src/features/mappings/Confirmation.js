import React, { Component } from 'react';
import { Grid, Header, Segment, Button, List } from 'semantic-ui-react';

class Confirmation extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {
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
        tenant,
        createdBy,
        updatedBy,
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
      },
    } = this.props;

    return (
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header textAlign="center">
          <h1>Confirm Customer Details</h1>

          <p>
            Click Confirm if the following details have been correctly entered
          </p>
        </Header>

        <Segment>
          <List divided relaxed>
            <List.Item>
              <List.Icon name="users" size="large" />
              <List.Content>
                Customer Reference Number: {customerRefNo}
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="users" size="large" />
              <List.Content>Customer Name: {customerName}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="caret up" size="large" />
              <List.Content>Customer Entity: {customerEntity}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="building outline" size="large" />
              <List.Content>Registration Number: {regIdNumber}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="caret up" size="large" />
              <List.Content>Customer Type: {customerType}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="caret up" size="large" />
              <List.Content>Product Type: {productType}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="caret up" size="large" />
              <List.Content>Customer Entity: {customerEntity}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="building outline" size="large" />
              <List.Content>Address Line 1: {address1}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="building outline" size="large" />
              <List.Content>Address Line 2: {address2}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="building outline" size="large" />
              <List.Content>Address Line 3: {address3}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="building outline" size="large" />
              <List.Content>Address Line 4: {address4}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="building outline" size="large" />
              <List.Content>Address Line 5: {address5}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="user" size="large" />
              <List.Content>Client ID: {f_clientId}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="calendar" size="large" />
              <List.Content>Direct Debit Date: {debitOrderDate}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="calendar" size="large" />
              <List.Content>Payment Terms: {paymentTermDays}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="marker" size="large" />
              <List.Content>
                Primary Contact Name: {primaryContactName}
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="marker" size="large" />
              <List.Content>
                Primary Contact Number: {primaryContactNumber}
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <Segment textAlign="center">
          <Button onClick={this.back}>Back</Button>

          <Button onClick={this.saveAndContinue}>Confirm</Button>
        </Segment>
      </Grid.Column>
    );
  }
}

export default Confirmation;
