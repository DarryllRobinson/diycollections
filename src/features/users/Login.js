import React, { useState } from 'react';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

const LoginForm = ({ history, location }) => {
  //console.log('location: ', location.state.from);
  // Email methods
  const [email, setEmail] = useState('');
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Password methods
  const [password, setPassword] = useState('');
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Form methods
  const handleSubmit = (e) => {
    e.preventDefault();
    alertService.clear();

    userService
      .login(email, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: '/dashboard' } };
        history.push(from);
      })
      .catch((error) => {
        alertService.error(error);
      });
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Icon name="user" />
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              onChange={(e) => handleEmail(e)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => handlePassword(e)}
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
