import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

function VerifyEmail({ history }) {
  const EmailStatus = {
    Verifying: 'Verifying',
    Failed: 'Failed',
    Setting: 'Setting',
  };

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);
    setToken(token);

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    userService
      .verifyEmail(token)
      .then(() => {
        setEmailStatus(EmailStatus.Setting);
        alertService.success(
          'Success',
          'Verification successful, please set a password'
        );
      })
      .catch(() => {
        setEmailStatus(EmailStatus.Failed);
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
    setPasswordError(null);
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
    e.preventDefault();
    clearErrorMessages();

    if (checkFields()) {
      alertService.clear();
      userService
        .setNewPassword({ token, password, confirmPassword })
        .then(() => {
          alertService.success('Success', 'Welcome to The System', {
            keepAfterRouteChange: true,
          });
          history.push('/login');
        })
        .catch((error) => {
          alertService.error('Error', error);
        });
    }
  };

  function getBody() {
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return (
          <>
            <Header as="h2" textAlign="center">
              Verify Email
            </Header>
            <Segment>Verifying...</Segment>
          </>
        );
      case EmailStatus.Failed:
        return (
          <div>
            Verification failed, you can also verify your user using the{' '}
            <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
      case EmailStatus.Setting:
        return (
          <>
            <Header as="h2" textAlign="center">
              Set Password
            </Header>
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
                  Set Password
                </Button>
              </Segment>
            </Form>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>{getBody()}</Grid.Column>
    </Grid>
  );
}

export { VerifyEmail };
