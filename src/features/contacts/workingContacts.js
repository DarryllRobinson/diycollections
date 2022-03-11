import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Form } from 'semantic-ui-react';

import { contactService } from './contact.service';

export const Contacts = (props) => {
  //console.log('Contacts props: ', props);
  const { id, user } = props;
  const [activeIndex, setActiveIndex] = useState(1);
  const [contacts, setContacts] = useState(null);
  const [contactStatus, setContactStatus] = useState('idle');
  const [state, setState] = useState(contacts);

  useEffect(() => {
    async function fetchContact() {
      setContactStatus('loading');
      setContacts(await contactService.getContact(id));
      setContactStatus('succeeded');
    }

    fetchContact();
  }, [id]);

  // Handlers
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const handleActiveIndex = activeIndex;
    const newIndex = handleActiveIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const saveContacts = () => {
    //console.log('Current state: ', state);

    // Run through all fields to update state before they are overwritten in error
    //contacts;
    const contact = state;
    contact.id = id;
    //contact.updatedDate = moment(new Date()).format('YYYY-MM-DD');
    contact.updatedBy = user;
    //console.log('dispatching: ', contact);
    contactService.updateContact(id, contact);

    // Display successful update
    //PopUp();
    //console.log('Updated contacts');
  };

  let content;

  if (!contacts) {
    content = <div className="loading">No contacts</div>;
  } else if (contactStatus === 'error') {
    content = <div>error</div>;
  } else if (contactStatus === 'succeeded' && contacts.length === 0) {
    content = (
      <div>
        success but no contacts
        <Card raised centered fluid>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                defaultValue={contacts.primaryContactName || ''}
                fluid
                id="form-input-control-primary-contact-name"
                name="primaryContactName"
                label="Primary Contact Name"
                onChange={handleChange}
                type="text"
              />
            </Form.Group>
          </Form>
        </Card>
      </div>
    );
  } else if (contactStatus === 'succeeded' && contacts) {
    let { primaryContactName } = contacts[0];
    content = (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Button>Click for more contact details</Button>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Card raised centered fluid>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].primaryContactName || ''}
                  fluid
                  id="form-input-control-primary-contact-name"
                  name="primaryContactName"
                  label="Primary Contact Name"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].primaryContactNumber || ''}
                  fluid
                  id="form-input-control-primary-contact-number"
                  name="primaryContactNumber"
                  label="Primary Contact Number"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].primaryContactEmail || ''}
                  fluid
                  id="form-input-control-primary-contact-email"
                  name="primaryContactEmail"
                  label="Primary Contact Email"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].representativeName || ''}
                  fluid
                  id="form-input-control-representative-name"
                  name="representativeName"
                  label="Representative Name"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].representativeNumber || ''}
                  fluid
                  id="form-input-control-representative-number"
                  name="representativeNumber"
                  label="Representative Number"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].representativeEmail || ''}
                  fluid
                  id="form-input-control-representative-email"
                  name="representativeEmail"
                  label="Representative Email"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].alternativeRepName || ''}
                  fluid
                  id="form-input-control-alternative-rep-name"
                  name="alternativeRepName"
                  label="Alternative Representative Name"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].alternativeRepNumber || ''}
                  fluid
                  id="form-input-control-alternative-rep-number"
                  name="alternativeRepNumber"
                  label="Alternative Representative Number"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].alternativeRepEmail || ''}
                  fluid
                  id="form-input-control-representative-email"
                  name="alternativeRepEmail"
                  label="Alternative Representative Email"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].otherNumber1 || ''}
                  fluid
                  id="form-input-control-other-number-1"
                  name="otherNumber1"
                  label="Other Number 1"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherNumber2 || ''}
                  fluid
                  id="form-input-control-other-number-2"
                  name="otherNumber2"
                  label="Other Number 2"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherNumber3 || ''}
                  fluid
                  id="form-input-control-other-number-3"
                  name="otherNumber3"
                  label="Other Number 3"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].otherNumber4 || ''}
                  fluid
                  id="form-input-control-other-number-4"
                  name="otherNumber4"
                  label="Other Number 4"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherNumber5 || ''}
                  fluid
                  id="form-input-control-other-number-5"
                  name="otherNumber5"
                  label="Other Number 5"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherNumber6 || ''}
                  fluid
                  id="form-input-control-other-number-6"
                  name="otherNumber6"
                  label="Other Number 6"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].otherNumber7 || ''}
                  fluid
                  id="form-input-control-other-number-7"
                  name="otherNumber7"
                  label="Other Number 7"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherNumber8 || ''}
                  fluid
                  id="form-input-control-other-number-8"
                  name="otherNumber8"
                  label="Other Number 8"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherNumber9 || ''}
                  fluid
                  id="form-input-control-other-number-9"
                  name="otherNumber9"
                  label="Other Number 9"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].otherNumber10 || ''}
                  fluid
                  id="form-input-control-other-number-10"
                  name="otherNumber10"
                  label="Other Number 10"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Field />
                <Form.Field />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].otherEmail1 || ''}
                  fluid
                  id="form-input-control-other-email-1"
                  name="otherEmail1"
                  label="Other Email 1"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherEmail2 || ''}
                  fluid
                  id="form-input-control-other-email-2"
                  name="otherEmail2"
                  label="Other Email 2"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherEmail3 || ''}
                  fluid
                  id="form-input-control-other-email-3"
                  name="otherEmail3"
                  label="Other Email 3"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].otherEmail4 || ''}
                  fluid
                  id="form-input-control-other-email-4"
                  name="otherEmail4"
                  label="Other Email 4"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherEmail5 || ''}
                  fluid
                  id="form-input-control-other-email-5"
                  name="otherEmail5"
                  label="Other Email 5"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherEmail6 || ''}
                  fluid
                  id="form-input-control-other-email-6"
                  name="otherEmail6"
                  label="Other Email 6"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].otherEmail7 || ''}
                  fluid
                  id="form-input-control-other-email-7"
                  name="otherEmail7"
                  label="Other Email 7"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherEmail8 || ''}
                  fluid
                  id="form-input-control-other-email-8"
                  name="otherEmail8"
                  label="Other Email 8"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].otherEmail9 || ''}
                  fluid
                  id="form-input-control-other-email-9"
                  name="otherEmail9"
                  label="Other Email 9"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].otherEmail10 || ''}
                  fluid
                  id="form-input-control-other-email-10"
                  name="otherEmail10"
                  label="Other Email 10"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Field />
                <Form.Field />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].dnc1 || ''}
                  fluid
                  id="form-input-control-dnc-1"
                  name="dnc1"
                  label="Do not contact 1"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].dnc2 || ''}
                  fluid
                  id="form-input-control-dnc-2"
                  name="dnc2"
                  label="Do not contact 2"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].dnc3 || ''}
                  fluid
                  id="form-input-control-dnc-3"
                  name="dnc3"
                  label="Do not contact 3"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={contacts[0].dnc4 || ''}
                  fluid
                  id="form-input-control-dnc-4"
                  name="dnc4"
                  label="Do not contact 4"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={contacts[0].dnc5 || ''}
                  fluid
                  id="form-input-control-dnc-5"
                  name="dnc5"
                  label="Do not contact 5"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Field />
              </Form.Group>
              <Button onClick={saveContacts}>Update Contacts</Button>
            </Form>
          </Card>
        </Accordion.Content>
      </Accordion>
    );
  }

  return <div>{content}</div>;
};
