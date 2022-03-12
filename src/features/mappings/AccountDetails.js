import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

class AccountDetails extends Component {
  state = { error: false };

  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    const { error } = this.state;

    return (
      <Grid.Column>
        <Header textAlign="center">
          <h1>Enter Account Mapping Details</h1>
        </Header>

        <Form error={error}>
          <Segment>
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Account Number</label>
                <input
                  placeholder="Account Number"
                  onChange={this.props.handleChange('accountNumber')}
                  defaultValue={values.accountNumber}
                />
              </Form.Field>

              <Form.Field required>
                <label>Account Name</label>
                <input
                  placeholder="Account Name"
                  onChange={this.props.handleChange('accountName')}
                  defaultValue={values.accountName}
                />
              </Form.Field>

              <Form.Field required>
                <label>Open Date</label>
                <input
                  placeholder="Open Date"
                  onChange={this.props.handleChange('openDate')}
                  defaultValue={values.openDate}
                />
              </Form.Field>

              <Form.Field required>
                <label>Payment Term Days</label>
                <input
                  placeholder="Payment Term Days"
                  onChange={this.props.handleChange('paymentTermDays')}
                  defaultValue={values.paymentTermDays}
                />
              </Form.Field>

              <Form.Field required>
                <label>Debtor Age</label>
                <input
                  placeholder="Debtor Age"
                  onChange={this.props.handleChange('debtorAge')}
                  defaultValue={values.debtorAge}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Direct Debit Date</label>
                <input
                  placeholder="Direct Debit Date"
                  onChange={this.props.handleChange('directDebitDate')}
                  defaultValue={values.directDebitDate}
                />
              </Form.Field>

              <Form.Field required>
                <label>Credit Limit</label>
                <input
                  placeholder="Credit Limit"
                  onChange={this.props.handleChange('creditLimit')}
                  defaultValue={values.creditLimit}
                />
              </Form.Field>

              <Form.Field required>
                <label>Total Balance</label>
                <input
                  placeholder="Total Balance"
                  onChange={this.props.handleChange('totalBalance')}
                  defaultValue={values.totalBalance}
                />
              </Form.Field>

              <Form.Field required>
                <label>Amount Due</label>
                <input
                  placeholder="Amount Due"
                  onChange={this.props.handleChange('amountDue')}
                  defaultValue={values.amountDue}
                />
              </Form.Field>

              <Form.Field required>
                <label>Current Balance</label>
                <input
                  placeholder="Current Balance"
                  onChange={this.props.handleChange('currentBalance')}
                  defaultValue={values.currentBalance}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>30 Days</label>
                <input
                  placeholder="30 Days"
                  onChange={this.props.handleChange('days30')}
                  defaultValue={values.days30}
                />
              </Form.Field>

              <Form.Field required>
                <label>60 Days</label>
                <input
                  placeholder="60 Days"
                  onChange={this.props.handleChange('days60')}
                  defaultValue={values.days60}
                />
              </Form.Field>

              <Form.Field required>
                <label>90 Days</label>
                <input
                  placeholder="90 Days"
                  onChange={this.props.handleChange('days90')}
                  defaultValue={values.days90}
                />
              </Form.Field>

              <Form.Field required>
                <label>120 Days</label>
                <input
                  placeholder="120 Days"
                  onChange={this.props.handleChange('days120')}
                  defaultValue={values.days120}
                />
              </Form.Field>

              <Form.Field required>
                <label>150 Days</label>
                <input
                  placeholder="150 Days"
                  onChange={this.props.handleChange('days150')}
                  defaultValue={values.days150}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>180 Days</label>
                <input
                  placeholder="180 Days"
                  onChange={this.props.handleChange('days180')}
                  defaultValue={values.days180}
                />
              </Form.Field>

              <Form.Field required>
                <label>Over 180 Days</label>
                <input
                  placeholder="Over 180 Days"
                  onChange={this.props.handleChange('days180Over')}
                  defaultValue={values.days180Over}
                />
              </Form.Field>

              <Form.Field required>
                <label>Payment Method</label>
                <input
                  placeholder="Payment Method"
                  onChange={this.props.handleChange('paymentMethod')}
                  defaultValue={values.paymentMethod}
                />
              </Form.Field>

              <Form.Field required>
                <label>Payment Due Date</label>
                <input
                  placeholder="Payment Due Date"
                  onChange={this.props.handleChange('paymentDueDate')}
                  defaultValue={values.paymentDueDate}
                />
              </Form.Field>

              <Form.Field required>
                <label>Debit Order Date</label>
                <input
                  placeholder="Debit Order Date"
                  onChange={this.props.handleChange('debitOrderDate')}
                  defaultValue={values.debitOrderDate}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Last Payment Date</label>
                <input
                  placeholder="Last Payment Date"
                  onChange={this.props.handleChange('lastPaymentDate')}
                  defaultValue={values.lastPaymentDate}
                />
              </Form.Field>

              <Form.Field required>
                <label>Over 180 Days</label>
                <input
                  placeholder="Over 180 Days"
                  onChange={this.props.handleChange('days180Over')}
                  defaultValue={values.days180Over}
                />
              </Form.Field>

              <Form.Field required>
                <label>Payment Method</label>
                <input
                  placeholder="Payment Method"
                  onChange={this.props.handleChange('paymentMethod')}
                  defaultValue={values.paymentMethod}
                />
              </Form.Field>

              <Form.Field required>
                <label>Payment Due Date</label>
                <input
                  placeholder="Payment Due Date"
                  onChange={this.props.handleChange('paymentDueDate')}
                  defaultValue={values.paymentDueDate}
                />
              </Form.Field>

              <Form.Field required>
                <label>Debit Order Date</label>
                <input
                  placeholder="Debit Order Date"
                  onChange={this.props.handleChange('debitOrderDate')}
                  defaultValue={values.debitOrderDate}
                />
              </Form.Field>
            </Form.Group>
          </Segment>

          <Segment textAlign="center">
            <Button onClick={this.back}>Back</Button>

            <Button onClick={this.saveAndContinue}>Save And Continue</Button>
          </Segment>
        </Form>
      </Grid.Column>
    );
  }
}

export default AccountDetails;
