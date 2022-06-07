import React, { useState } from 'react';
import { Button, Container, Dimmer, Form, Loader } from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

export const AddUserForm = (props) => {
  const { loadUsers } = props;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    fields: {
      ids: ['firstName', 'lastName', 'email', 'phone', 'role'],
      entities: {
        firstName: { error: null, value: '' },
        lastName: { error: null, value: '' },
        email: { error: null, value: '' },
        phone: { error: null, value: '' },
        role: { error: null, value: '' },
      },
      /*entities: {
        firstName: { error: null, value: 'Test' },
        lastName: { error: null, value: 'Agent' },
        email: { error: null, value: 'darryllrobinson@icloud.com' },
        phone: { error: null, value: '0123456789' },
        role: { error: null, value: 'Agent' },
      },*/
    },
  });

  const roles = [
    { key: 1, text: 'Admin', value: 'Admin' },
    { key: 2, text: 'Agent', value: 'Agent' },
    { key: 3, text: 'KAM', value: 'Kam' },
    { key: 4, text: 'Customer', value: 'Customer' },
  ];

  // Handlers
  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        entities: {
          ...prevState.fields.entities,
          [name]: {
            ...prevState.fields.entities[name],
            value: value,
          },
        },
      },
    }));
  };

  const handleSelect = (evt, data) => {
    const { name, value } = data;
    //console.log('name, value', name, value);
    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        entities: {
          ...prevState.fields.entities,
          [name]: {
            ...prevState.fields.entities[name],
            value: value,
          },
        },
      },
    }));
  };

  const handleClear = (e) => {
    e.preventDefault();
    clearState();
  };

  const clearState = () => {
    setState({
      fields: {
        ids: ['firstName', 'lastName', 'email', 'phone', 'role'],
        entities: {
          firstName: { error: null, value: '' },
          lastName: { error: null, value: '' },
          email: { error: null, value: '' },
          phone: { error: null, value: '' },
          role: { error: null, value: '' },
        },
      },
    });
  };

  const clearErrorMessages = () => {
    const fields = state.fields.ids;

    fields.forEach((field) => {
      setState((prevState) => ({
        fields: {
          ...prevState.fields,
          entities: {
            ...prevState.fields.entities,
            [field]: {
              ...prevState.fields.entities[field],
              error: null,
            },
          },
        },
      }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrorMessages();
    if (checkFields()) updateDatabase();
  };

  const checkFields = () => {
    let cont = true;

    if (!state.fields.entities['firstName'].value) {
      setErrorMsg('Please provide a first name', 'firstName');
      cont = false;
    }

    if (!state.fields.entities['lastName'].value) {
      setErrorMsg('Please provide a lastName', 'lastName');
      cont = false;
    }

    const filter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,20}$/;

    if (!filter.test(state.fields.entities['email'].value)) {
      setErrorMsg('Please provide a valid email address', 'email');
      cont = false;
    }

    const numberFilter = /^[0-9]+$/;

    if (!numberFilter.test(state.fields.entities['phone'].value)) {
      setErrorMsg('Please use numbers only', 'phone');
      cont = false;
    }
    if (state.fields.entities['phone'].value.length !== 10) {
      setErrorMsg('Please provide an 10 digit phone number', 'phone');
      cont = false;
    }

    if (!state.fields.entities['role'].value) {
      setErrorMsg('Please provide a role', 'role');
      cont = false;
    }

    return cont;
  };

  const setErrorMsg = (msg, name) => {
    //console.log('msg', msg);
    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        entities: {
          ...prevState.fields.entities,
          [name]: {
            ...prevState.fields.entities[name],
            error: msg,
          },
        },
      },
    }));
  };

  const updateDatabase = async () => {
    setLoading(true);
    //const createdDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const user = {
      firstName: state.fields.entities['firstName'].value,
      lastName: state.fields.entities['lastName'].value,
      email: state.fields.entities['email'].value,
      phone: state.fields.entities['phone'].value,
      role: state.fields.entities['role'].value,
      f_clientId: 1,
      active: true,
      //createdDate: createdDate,
    };

    console.log('user: ', user);

    userService
      .register(user)
      .then((response) => {
        console.log('response: ', response);
        //console.log('response.status: ', response.status);
        if (response.status === 'success') {
          setLoading(false);
          clearState();
          alertService.success('Success', 'User registered successfully');
          loadUsers();
        } else if (response.status === 'duplicate') {
          setLoading(false);
          alertService.error(
            'Error',
            'User already exists. Please use a different username (email).'
          );
        } else {
          setLoading(false);
          alertService.warning('Warning', 'Something went wrong');
        }
      })
      .catch((error) => {
        setLoading(false);
        alertService.error('Warning', 'Something went majorly wrong');
      });
  };

  return (
    <Container className="user">
      {loading && (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      )}
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            error={state.fields.entities['firstName'].error}
            id="form-input-control-firstName"
            name="firstName"
            label="First Name"
            onChange={handleChange}
            required
            type="text"
            value={state.fields.entities['firstName'].value}
          />
          <Form.Input
            error={state.fields.entities['lastName'].error}
            id="form-input-control-lastName"
            name="lastName"
            label="Surname"
            onChange={handleChange}
            required
            type="text"
            value={state.fields.entities['lastName'].value}
          />
          <Form.Input
            error={state.fields.entities['email'].error}
            id="form-input-control-email"
            name="email"
            label="Email"
            onChange={handleChange}
            required
            type="email"
            value={state.fields.entities['email'].value}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            error={state.fields.entities['phone'].error}
            id="form-input-control-phone"
            name="phone"
            label="Phone"
            onChange={handleChange}
            required
            type="text"
            value={state.fields.entities['phone'].value}
          />
          <Form.Select
            error={state.fields.entities['role'].error}
            id="form-select-control-role"
            name="role"
            label="Role"
            onChange={handleSelect}
            options={roles}
            required
            value={state.fields.entities['role'].value}
          />
        </Form.Group>
        <Button.Group size="large">
          <Button color="teal" content="Submit" onClick={handleSubmit} />
          <Button.Or />
          <Button content="Clear" onClick={handleClear} />
        </Button.Group>
      </Form>
    </Container>
  );
};
