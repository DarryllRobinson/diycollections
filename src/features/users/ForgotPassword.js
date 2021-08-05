import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Dimmer,
  Form,
  Grid,
  Header,
  Loader,
  Segment,
} from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      userService
        .forgotPassword(email)
        .then((response) => {
          console.log('response: ', response);
          setLoading(false);
          if (response.status === 'ok') {
            setEmail('');
            alertService.success('Success', response.message);
          } else if (response.status === 'failed') {
            alertService.warn('Warning', response.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          alertService.error('Error', error);
        });
    }
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Forgot Password
        </Header>
        {loading && (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        )}
        <Form size="large" onSubmit={onSubmit}>
          <Segment>
            <Form.Input
              error={error}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email address"
              type="email"
              onChange={handleChange}
              value={email}
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
