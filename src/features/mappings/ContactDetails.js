import React, { Component } from 'react';
import {
  Divider,
  Grid,
  Header,
  Message,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react';

class ContactDetails extends Component {
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
          <h1>Enter Contact Mapping Details</h1>
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
                <label>Primary Contact Name</label>
                <input
                  placeholder="Primary Contact Name"
                  onChange={this.props.handleChange('primaryContactName')}
                  defaultValue={values.primaryContactName}
                />
              </Form.Field>

              <Form.Field required>
                <label>Primary Contact Number</label>
                <input
                  placeholder="Primary Contact Number"
                  onChange={this.props.handleChange('primaryContactNumber')}
                  defaultValue={values.primaryContactNumber}
                />
              </Form.Field>

              <Form.Field required>
                <label>Primary Contact Email</label>
                <input
                  placeholder="Primary Contact Email"
                  onChange={this.props.handleChange('primaryContactEmail')}
                  defaultValue={values.primaryContactEmail}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Representative Name</label>
                <input
                  placeholder="Representative Name"
                  onChange={this.props.handleChange('representativeName')}
                  defaultValue={values.representativeName}
                />
              </Form.Field>

              <Form.Field required>
                <label>Representative Number</label>
                <input
                  placeholder="Representative Number"
                  onChange={this.props.handleChange('representativeNumber')}
                  defaultValue={values.representativeNumber}
                />
              </Form.Field>

              <Form.Field required>
                <label>Representative Email</label>
                <input
                  placeholder="Representative Email"
                  onChange={this.props.handleChange('representativeEmail')}
                  defaultValue={values.representativeNumber}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Alternative Representative Name</label>
                <input
                  placeholder="Alternative Representative Name"
                  onChange={this.props.handleChange('alternativeRepName')}
                  defaultValue={values.alternativeRepName}
                />
              </Form.Field>

              <Form.Field required>
                <label>Alternative Representative Number</label>
                <input
                  placeholder="Alternative Representative Number"
                  onChange={this.props.handleChange('alternativeRepNumber')}
                  defaultValue={values.alternativeRepNumber}
                />
              </Form.Field>

              <Form.Field required>
                <label>Alternative Representative Email</label>
                <input
                  placeholder="Alternative Representative Email"
                  onChange={this.props.handleChange('alternativeRepEmail')}
                  defaultValue={values.alternativeRepEmail}
                />
              </Form.Field>
            </Form.Group>

            <br />
            <Divider />
            <br />

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Do Not Contact 1</label>
                <input
                  placeholder="Do Not Contact 1"
                  onChange={this.props.handleChange('dnc1')}
                  defaultValue={values.dnc1}
                />
              </Form.Field>

              <Form.Field required>
                <label>Do Not Contact 2</label>
                <input
                  placeholder="Do Not Contact 2"
                  onChange={this.props.handleChange('dnc2')}
                  defaultValue={values.dnc2}
                />
              </Form.Field>

              <Form.Field required>
                <label>Do Not Contact 3</label>
                <input
                  placeholder="Do Not Contact 3"
                  onChange={this.props.handleChange('dnc3')}
                  defaultValue={values.dnc3}
                />
              </Form.Field>

              <Form.Field required>
                <label>Do Not Contact 4</label>
                <input
                  placeholder="Do Not Contact 4"
                  onChange={this.props.handleChange('dnc4')}
                  defaultValue={values.dnc4}
                />
              </Form.Field>

              <Form.Field required>
                <label>Do Not Contact 5</label>
                <input
                  placeholder="Do Not Contact 5"
                  onChange={this.props.handleChange('dnc5')}
                  defaultValue={values.dnc5}
                />
              </Form.Field>
            </Form.Group>

            <br />
            <Divider />
            <br />

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Other Number 1</label>
                <input
                  placeholder="Other Number 1"
                  onChange={this.props.handleChange('otherNumber1')}
                  defaultValue={values.otherNumber1}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Number 2</label>
                <input
                  placeholder="Other Number 2"
                  onChange={this.props.handleChange('otherNumber2')}
                  defaultValue={values.otherNumber2}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Number 3</label>
                <input
                  placeholder="Other Number 3"
                  onChange={this.props.handleChange('otherNumber3')}
                  defaultValue={values.otherNumber3}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Number 4</label>
                <input
                  placeholder="Other Number 4"
                  onChange={this.props.handleChange('otherNumber4')}
                  defaultValue={values.otherNumber4}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Number 5</label>
                <input
                  placeholder="Other Number 5"
                  onChange={this.props.handleChange('otherNumber5')}
                  defaultValue={values.otherNumber5}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Other Number 6</label>
                <input
                  placeholder="Other Number 6"
                  onChange={this.props.handleChange('otherNumber6')}
                  defaultValue={values.otherNumber6}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Number 7</label>
                <input
                  placeholder="Other Number 7"
                  onChange={this.props.handleChange('otherNumber7')}
                  defaultValue={values.otherNumber7}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Number 8</label>
                <input
                  placeholder="Other Number 8"
                  onChange={this.props.handleChange('otherNumber8')}
                  defaultValue={values.otherNumber8}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Number 9</label>
                <input
                  placeholder="Other Number 9"
                  onChange={this.props.handleChange('otherNumber9')}
                  defaultValue={values.otherNumber9}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Number 10</label>
                <input
                  placeholder="Other Number 10"
                  onChange={this.props.handleChange('otherNumber10')}
                  defaultValue={values.otherNumber10}
                />
              </Form.Field>
            </Form.Group>

            <br />
            <Divider />
            <br />

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Other Email 1</label>
                <input
                  placeholder="Other Email 1"
                  onChange={this.props.handleChange('otherEmail1')}
                  defaultValue={values.otherEmail1}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Email 2</label>
                <input
                  placeholder="Other Email 2"
                  onChange={this.props.handleChange('otherEmail2')}
                  defaultValue={values.otherEmail2}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Email 3</label>
                <input
                  placeholder="Other Email 3"
                  onChange={this.props.handleChange('otherEmail3')}
                  defaultValue={values.otherEmail3}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Email 4</label>
                <input
                  placeholder="Other Email 4"
                  onChange={this.props.handleChange('otherEmail4')}
                  defaultValue={values.otherEmail4}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Email 5</label>
                <input
                  placeholder="Other Email 5"
                  onChange={this.props.handleChange('otherEmail5')}
                  defaultValue={values.otherEmail5}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label>Other Email 6</label>
                <input
                  placeholder="Other Email 6"
                  onChange={this.props.handleChange('otherEmail6')}
                  defaultValue={values.otherEmail6}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Email 7</label>
                <input
                  placeholder="Other Email 7"
                  onChange={this.props.handleChange('otherEmail7')}
                  defaultValue={values.otherEmail7}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Email 8</label>
                <input
                  placeholder="Other Email 8"
                  onChange={this.props.handleChange('otherEmail8')}
                  defaultValue={values.otherEmail8}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Email 9</label>
                <input
                  placeholder="Other Email 9"
                  onChange={this.props.handleChange('otherEmail9')}
                  defaultValue={values.otherEmail9}
                />
              </Form.Field>

              <Form.Field required>
                <label>Other Email 10</label>
                <input
                  placeholder="Other Email 10"
                  onChange={this.props.handleChange('otherEmail10')}
                  defaultValue={values.otherEmail10}
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

export default ContactDetails;
