import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Loader,
} from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

export const Profile = ({ handleProfileClick, open, setOpen }) => {
  const [user, setUser] = useState(userService.userValue);
  useEffect(() => {
    setUser(userService.userValue);
  }, []);

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    fields: {
      ids: ['firstName', 'lastName', 'phone', 'password', 'confirmPassword'],
      entities: {
        firstName: { error: null, value: user.firstName },
        lastName: { error: null, value: user.lastName },
        phone: { error: null, value: user.phone },
        password: { error: null, isChanged: false, value: '' },
        confirmPassword: { error: null, value: '' },
      },
    },
  });
  const [passwordChanged, setPasswordChanged] = useState(false);

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

  const onPasswordChanged = (evt) => {
    setPasswordChanged(true);
    const name = evt.target.name;
    const value = evt.target.value;
    const password = state.fields.entities['password'];
    password.isChanged = true;
    password.value = value;
    setState({ ...state, password });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearState();
    handleProfileClick(false);
  };

  const clearState = () => {
    setState({
      fields: {
        ids: ['firstName', 'lastName', 'phone', 'password', 'confirmPassword'],
        entities: {
          firstName: { error: null, value: user.firstName },
          lastName: { error: null, value: user.lastName },
          phone: { error: null, value: user.phone },
          password: { error: null, value: '' },
          confirmPassword: { error: null, value: '' },
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

    const numberFilter = /^[0-9]+$/;

    if (!numberFilter.test(state.fields.entities['phone'].value)) {
      setErrorMsg('Please use numbers only', 'phone');
      cont = false;
    }
    if (state.fields.entities['phone'].value.length !== 10) {
      setErrorMsg('Please provide an 10 digit phone number', 'phone');
      cont = false;
    }

    // Only check password if it's been changed
    if (passwordChanged) {
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

      if (!state.fields.entities['confirmPassword'].value) {
        setErrorMsg('Please confirm your password', 'confirmPassword');
        cont = false;
      }
    }

    return cont;
  };

  const setErrorMsg = (msg, name) => {
    //console.log('msg, name', msg, name);
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

    let userUpdate;

    if (passwordChanged) {
      userUpdate = {
        firstName: state.fields.entities['firstName'].value,
        lastName: state.fields.entities['lastName'].value,
        phone: state.fields.entities['phone'].value,
        password: state.fields.entities['password'].value,
        confirmPassword: state.fields.entities['confirmPassword'].value,
        f_clientId: 1,
        active: true,
      };
    } else {
      userUpdate = {
        firstName: state.fields.entities['firstName'].value,
        lastName: state.fields.entities['lastName'].value,
        phone: state.fields.entities['phone'].value,
        f_clientId: 1,
        active: true,
      };
    }

    userService
      .update(user.id, userUpdate)
      .then((updatedUser) => {
        //console.log('Profile user updated to: ', updatedUser);
        setLoading(false);
        alertService.success('Success', 'User updated successfully', {
          keepAfterRouteChange: true,
        });
        handleProfileClick(false);
        setUser(updatedUser);
        getForm();
      })
      .catch((error) => {
        setLoading(false);
        alertService.error('Error', error);
      });
  };

  const getForm = () => {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{user.email}</Card.Header>
          <Card.Meta>{user.role}</Card.Meta>
          <br />
          <Card.Description>
            <Form>
              <Form.Input
                error={state.fields.entities['firstName'].error}
                fluid
                id="form-input-control-firstName"
                name="firstName"
                label="First Name"
                onChange={handleChange}
                type="text"
                value={state.fields.entities['firstName'].value}
              />
              <Form.Input
                error={state.fields.entities['lastName'].error}
                fluid
                id="form-input-control-lastName"
                name="lastName"
                label="Surname"
                onChange={handleChange}
                type="text"
                value={state.fields.entities['lastName'].value}
              />
              <Form.Input
                error={state.fields.entities['phone'].error}
                fluid
                id="form-input-control-phone"
                name="phone"
                label="Phone"
                onChange={handleChange}
                type="text"
                value={state.fields.entities['phone'].value}
              />
              <Form.Input
                error={state.fields.entities['password'].error}
                fluid
                id="form-input-control-password"
                name="password"
                label="Password"
                onChange={onPasswordChanged}
                placeholder="********"
                type="password"
                value={state.fields.entities['password'].value}
              />
              <Form.Input
                error={state.fields.entities['confirmPassword'].error}
                fluid
                id="form-input-control-confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                onChange={handleChange}
                placeholder="********"
                type="password"
                value={state.fields.entities['confirmPassword'].value}
              />
              <Container textAlign="center">
                <Button.Group size="medium">
                  <Button primary content="Update" onClick={handleSubmit} />
                  <Button.Or />
                  <Button content="Close" onClick={handleCancel} />
                </Button.Group>
              </Container>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };

  return (
    <>
      {loading && (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      )}
      {getForm()}
    </>
  );
};
