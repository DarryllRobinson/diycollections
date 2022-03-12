import React, { Component } from 'react';
import {
  Grid,
  Header,
  Input,
  Message,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react';

class CustomerDetails extends Component {
  state = { error: false };

  saveAndContinue = (e) => {
    e.preventDefault();
    this.checkFields();
    this.props.nextStep();
  };

  checkFields() {}

  render() {
    const { values } = this.props;
    const { error } = this.state;

    return (
      <Grid.Column>
        <Header textAlign="center">
          <h1>Enter Customer Mapping Details</h1>
        </Header>

        <Form error={error}>
          <Message
            error
            header="Action Forbidden"
            content="You can only sign up for an account once with a given e-mail address."
          />
          <Segment>
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Operator Short Code</label>
                <input
                  placeholder="Operator Short Code"
                  onChange={this.props.handleChange('operatorShortCode')}
                  defaultValue={values.operatorShortCode}
                />
              </Form.Field>

              <Form.Field required>
                <label>Customer Reference Number</label>
                <input
                  placeholder="Customer Reference Number"
                  onChange={this.props.handleChange('customerRefNo')}
                  defaultValue={values.customerRefNo}
                />
              </Form.Field>

              <Form.Field required>
                <label>Customer Name</label>
                <input
                  placeholder="Customer Name"
                  onChange={this.props.handleChange('customerName')}
                  defaultValue={values.customerName}
                />
              </Form.Field>

              <Form.Field required>
                <label>Customer Entity</label>
                <input
                  placeholder="Customer Entity"
                  onChange={this.props.handleChange('customerEntity')}
                  defaultValue={values.customerEntity}
                />
              </Form.Field>

              <Form.Field required>
                <label>Registration Number</label>
                <input
                  placeholder="Registration Number"
                  onChange={this.props.handleChange('regIdNumber')}
                  defaultValue={values.regIdNumber}
                />
              </Form.Field>

              <Form.Field required>
                <label>Customer Type</label>
                <input
                  placeholder="Customer Type"
                  onChange={this.props.handleChange('customerType')}
                  defaultValue={values.customerType}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Address Line 1</label>
                <input
                  placeholder="Address Line 1"
                  onChange={this.props.handleChange('address1')}
                  defaultValue={values.address1}
                />
              </Form.Field>

              <Form.Field required>
                <label>Address Line 2</label>
                <input
                  placeholder="Address Line 2"
                  onChange={this.props.handleChange('address2')}
                  defaultValue={values.address2}
                />
              </Form.Field>

              <Form.Field required>
                <label>Address Line 3</label>
                <input
                  placeholder="Address Line 3"
                  onChange={this.props.handleChange('address3')}
                  defaultValue={values.address3}
                />
              </Form.Field>

              <Form.Field required>
                <label>Address Line 4</label>
                <input
                  placeholder="Address Line 4"
                  onChange={this.props.handleChange('address4')}
                  defaultValue={values.address4}
                />
              </Form.Field>

              <Form.Field required>
                <label>Address Line 5</label>
                <input
                  placeholder="Address Line 5"
                  onChange={this.props.handleChange('address5')}
                  defaultValue={values.address5}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Client ID</label>
                <input
                  placeholder="Client ID"
                  onChange={this.props.handleChange('f_clientId')}
                  defaultValue={values.f_clientId}
                />
              </Form.Field>

              <Form.Field required>
                <label>Product Type</label>
                <input
                  defaultValue={values.productType}
                  onChange={this.props.handleChange('productType')}
                  placeholder="Product Type"
                />
              </Form.Field>
            </Form.Group>
          </Segment>

          <Segment>
            <Button onClick={this.saveAndContinue}>Save And Continue</Button>
          </Segment>
        </Form>
      </Grid.Column>
    );
  }
}

export default CustomerDetails;
