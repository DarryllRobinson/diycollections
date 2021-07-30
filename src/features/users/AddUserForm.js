import React, { useEffect, useState } from 'react';
import { Button, Container, Dimmer, Form, Loader } from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

export const AddUserForm = (props) => {
  const { loadUsers } = props;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    fields: {
      ids: [
        'firstName',
        'lastName',
        'email',
        'phone',
        'password',
        'confirmPassword',
        'role',
      ],
      entities: {
        firstName: { error: null, value: 'Thor' },
        lastName: { error: null, value: 'Odinson' },
        email: { error: null, value: 'darryll@stillproud.com' },
        phone: { error: null, value: '0123456789' },
        password: { error: null, value: 'newpassss' },
        confirmPassword: { error: null, value: 'newpassss' },
        role: { error: null, value: 'Agent' },
      },
    },
  });

  const roles = [
    { key: 1, text: 'Agent', value: 'agent' },
    { key: 2, text: 'KAM', value: 'kam' },
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

  const handleCancel = (e) => {
    e.preventDefault();
    clearState();
  };

  const clearState = () => {
    setState({
      fields: {
        ids: [
          'firstName',
          'lastName',
          'email',
          'phone',
          'password',
          'confirmPassword',
          'role',
        ],
        entities: {
          firstName: { error: null, value: '' },
          lastName: { error: null, value: '' },
          email: { error: null, value: '' },
          phone: { error: null, value: '' },
          password: { error: null, value: '' },
          confirmPassword: { error: null, value: '' },
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

    if (state.fields.entities['password'].value.length < 8) {
      setErrorMsg(
        'Please provide a password of at least 8 characters',
        'password'
      );
      cont = false;
    }

    if (
      state.fields.entities['confirmPassword'].value !==
      state.fields.entities['password'].value
    ) {
      setErrorMsg('Passwords do not match', 'confirmPassword');
      cont = false;
    }

    if (state.fields.entities['confirmPassword'].value.length === 0) {
      setErrorMsg('Please confirm your password', 'confirmPassword');
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
      password: state.fields.entities['password'].value,
      confirmPassword: state.fields.entities['confirmPassword'].value,
      phone: state.fields.entities['phone'].value,
      role: state.fields.entities['role'].value,
      f_clientId: 1,
      active: true,
      //createdDate: createdDate,
    };

    //console.log('user: ', user);

    userService
      .register(user)
      .then((response) => {
        console.log('response: ', response);
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
    <Container>
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
            error={state.fields.entities['password'].error}
            id="form-input-control-password"
            name="password"
            label="Password"
            onChange={handleChange}
            required
            type="password"
            value={state.fields.entities['password'].value}
          />
          <Form.Input
            error={state.fields.entities['confirmPassword'].error}
            id="form-input-control-confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            onChange={handleChange}
            required
            type="password"
            value={state.fields.entities['confirmPassword'].value}
          />
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
          <Button content="Submit" onClick={handleSubmit} />
          <Button.Or />
          <Button content="Cancel" onClick={handleCancel} />
        </Button.Group>
      </Form>
    </Container>
  );
};
