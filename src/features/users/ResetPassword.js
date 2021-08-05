import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Button, Card, Container, Form, Input } from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

function ResetPassword({ history }) {
  const TokenStatus = {
    Validating: 'Validating',
    Valid: 'Valid',
    Invalid: 'Invalid',
  };

  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    userService
      .validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
  }, []);

  function getForm() {
    const initialValues = {
      password: '',
      confirmPassword: '',
    };

    function onSubmit({ password, confirmPassword }) {
      alertService.clear();
      userService
        .resetPassword({ token, password, confirmPassword })
        .then(() => {
          alertService.success(
            'Success',
            'Password reset successful, you can now login',
            {
              keepAfterRouteChange: true,
            }
          );
          history.push('/login');
        })
        .catch((error) => {
          alertService.error('Error', error);
        });
    }

    return (
      <Form>
        <Input label="Password" name="password" type="password" />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />
        <Button type="submit">Reset Password</Button>
        <Button as={Link} to="/login">
          Login
        </Button>
      </Form>
    );
  }

  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm();
      case TokenStatus.Invalid:
        return (
          <Container>
            Token validation failed, if the token has expired you can get a new
            one at the <Link to="forgot-password">forgot password</Link> page.
          </Container>
        );
      case TokenStatus.Validating:
        return <Container>Validating token...</Container>;
    }
  }

  return (
    <Container>
      <Card>
        <Card.Header>Reset Password</Card.Header>
        <Card.Description>{getBody()}</Card.Description>
      </Card>
    </Container>
  );
}

export { ResetPassword };
