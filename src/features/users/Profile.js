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
      ids: ['firstName', 'lastName', 'email', 'phone'],
      entities: {
        firstName: { error: null, value: user.firstName },
        lastName: { error: null, value: user.lastName },
        email: { error: null, value: user.email },
        phone: { error: null, value: user.phone },
      },
    },
  });

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

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearState();
    handleProfileClick(false);
  };

  const clearState = () => {
    setState({
      fields: {
        ids: ['firstName', 'lastName', 'email', 'phone'],
        entities: {
          firstName: { error: null, value: user.firstName },
          lastName: { error: null, value: user.lastName },
          email: { error: null, value: user.email },
          phone: { error: null, value: user.phone },
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

    const userUpdate = {
      firstName: state.fields.entities['firstName'].value,
      lastName: state.fields.entities['lastName'].value,
      email: state.fields.entities['email'].value,
      phone: state.fields.entities['phone'].value,
      f_clientId: 1,
      active: true,
    };

    userService
      .update(user.id, userUpdate)
      .then((updatedUser) => {
        console.log('Profile user updated to: ', updatedUser);
        setLoading(false);
        alertService.success('Success', 'User updated successfully', {
          keepAfterRouteChange: true,
        });
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
          <Card.Header>Profile</Card.Header>
          <Card.Description>
            <Form>
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
                disabled
                error={state.fields.entities['email'].error}
                id="form-input-control-email"
                name="email"
                label="Email"
                onChange={handleChange}
                required
                type="email"
                value={state.fields.entities['email'].value}
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
