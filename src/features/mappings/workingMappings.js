import React, { useEffect, useState } from 'react';
import {
  Accordion,
  Button,
  Card,
  Dimmer,
  Field,
  Form,
  Input,
  Loader,
} from 'semantic-ui-react';

import { userService } from '../users/user.service';
import { mappingService } from './mapping.service';

export const Mappings = (props) => {
  //console.log('Mappings props: ', props);
  const user = userService.userValue;
  const [activeIndex, setActiveIndex] = useState(1);
  const [mappings, setMappings] = useState(null);
  const [mappingStatus, setMappingStatus] = useState('idle');
  const [state, setState] = useState(mappings);

  useEffect(() => {
    async function fetchMapping() {
      setMappingStatus('loading');
      setMappings(await mappingService.getAll());
      setMappingStatus('succeeded');
    }

    fetchMapping();
  }, []);

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

  const saveMappings = () => {
    //console.log('Current state: ', state);

    // Run through all fields to update state before they are overwritten in error
    //mappings;
    const mapping = state;
    //mapping.updatedDate = moment(new Date()).format('YYYY-MM-DD');
    mapping.updatedBy = user;
    //console.log('dispatching: ', mapping);
    mappingService.updateMapping(mapping);

    // Display successful update
    //PopUp();
    //console.log('Updated mappings');
  };

  function createContent(mappings) {
    //console.log('createContent: ', mappings);

    let mapping = mappings.length > 0 ? mappings[0] : mappings;

    let content = (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Button>Accounts</Button>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <Card raised centered fluid>
            <Form>
              <Form.Group widths="equal">{createFields(mappings)}</Form.Group>
              <Button onClick={saveMappings}>Update Mappings</Button>
            </Form>
          </Card>
        </Accordion.Content>
      </Accordion>
    );
    return content;
  }

  function createFields(mappings) {
    let fields = [];

    // map across fields in mappings to create fields to display
    mappings.forEach((mapping) => {
      console.log('mapping: ', mapping);
      let field = (
        <Form.Field inline key={mapping.id} required>
          <label>{mapping.db_field}</label>
          <Input defaultValue={mapping.web_field} />
        </Form.Field>
      );
      fields.push(field);
    });
    return fields;
  }

  function ccccreateContent(mappings) {
    //console.log('createContent: ', mappings);

    let mapping = mappings.length > 0 ? mappings[0] : mappings;

    let content = (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Button>Accounts</Button>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Card raised centered fluid>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  defaultValue={mapping.db_field || ''}
                  fluid
                  id="form-input-control-db_field"
                  name="db_field"
                  label="Client field name"
                  onChange={handleChange}
                  type="text"
                />
                <Form.Input
                  defaultValue={mapping.web_field || ''}
                  fluid
                  id="form-input-control-web_field"
                  name="web_field"
                  label="Database field name"
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>
              <Button onClick={saveMappings}>Update Mappings</Button>
            </Form>
          </Card>
        </Accordion.Content>
      </Accordion>
    );
    return content;
  }

  let content;

  if (!mappings) {
    content = (
      <div className="loading">
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      </div>
    );
  } else if (mappingStatus === 'error') {
    content = <div>error</div>;
  } else if (mappingStatus === 'succeeded' && mappings) {
    console.log('mappings: ', mappings);
    content = createContent(mappings);
  }

  return <div>{content}</div>;
};
