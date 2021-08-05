import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
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

function ResetPassword({ history }) {
  const TokenStatus = {
    Validating: 'Validating',
    Valid: 'Valid',
    Invalid: 'Invalid',
  };

  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);
  const [password, setPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const clearErrorMessages = () => {
    console.log('2');
    setPasswordError(null);
    console.log('3');
    setConfirmPasswordError(null);
  };

  const checkFields = () => {
    let cont = true;

    if (password.length < 8) {
      setPasswordError('Please provide a password of at least 8 characters');
      cont = false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      cont = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      cont = false;
    }

    return cont;
  };

  const onSubmit = (e) => {
    console.log('1');
    e.preventDefault();
    clearErrorMessages();

    if (checkFields()) {
      setLoading(true);
      alertService.clear();
      //console.log('sending with: ', password, confirmPassword, token);
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
    setLoading(false);
  };

  function getForm() {
    return (
      <Container>
        {/*loading && (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          )*/}
        <Form size="large">
          <Segment>
            <Form.Input
              error={passwordError}
              name="password"
              onChange={handlePassword}
              placeholder="New password"
              type="password"
            />
            <Form.Input
              error={confirmPasswordError}
              name="confirmPassword"
              onChange={handleConfirmPassword}
              placeholder="Confirm password"
              type="password"
            />
            <Button color="teal" onClick={onSubmit} type="submit">
              Reset Password
            </Button>
          </Segment>
        </Form>
      </Container>
    );
  }

  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        try {
          return getForm();
        } catch (e) {
          console.log('onSubmit e: ', e);
        }
      case TokenStatus.Invalid:
        return (
          <Segment>
            Token validation failed, if the token has expired you can get a new
            one at the <Link to="forgot-password">forgot password</Link> page.
          </Segment>
        );
      case TokenStatus.Validating:
        return <Segment>Validating token...</Segment>;
      default:
        return (
          <Segment>
            Token validation failed, if the token has expired you can get a new
            one at the <Link to="forgot-password">forgot password</Link> page.
          </Segment>
        );
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Reset Password
        </Header>
        {getBody()}
      </Grid.Column>
    </Grid>
  );
}

export { ResetPassword };
