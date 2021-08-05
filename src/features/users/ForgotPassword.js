import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

function ForgotPassword() {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(null);
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alertService.clear();
    if (!email) {
      setError('Please enter a valid email address');
    } else {
      userService
        .forgotPassword(email)
        .then(() =>
          alertService.success(
            'Success',
            'Please check your email for password reset instructions'
          )
        )
        .catch((error) => alertService.error('Error', error));
    }
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Forgot Password
        </Header>
        <Form size="large" onSubmit={onSubmit}>
          <Segment>
            <Form.Input
              error={error}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email address"
              type="email"
              onClick={handleChange}
            />
            <br />
            <Container fluid textAlign="center">
              <Button.Group>
                <Button color="teal" content="Reset Password" size="medium" />
                <Button.Or />
                <Button
                  as={Link}
                  to="/login"
                  color="teal"
                  content="Login"
                  size="medium"
                />
              </Button.Group>
            </Container>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export { ForgotPassword };
