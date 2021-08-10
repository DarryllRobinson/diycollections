import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Card, Container } from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

function VerifyEmail({ history }) {
  const EmailStatus = {
    Verifying: 'Verifying',
    Failed: 'Failed',
  };

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    userService
      .verifyEmail(token)
      .then(() => {
        alertService.success(
          'Success',
          'Verification successful, you can now login',
          {
            keepAfterRouteChange: true,
          }
        );
        history.push('/login');
      })
      .catch(() => {
        setEmailStatus(EmailStatus.Failed);
      });
  }, []);

  function getBody() {
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return <div>Verifying...</div>;
      case EmailStatus.Failed:
        return (
          <div>
            Verification failed, you can also verify your user using the{' '}
            <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
    }
  }

  return (
    <Container>
      <Card>
        <Card.Header>Verify Email</Card.Header>
        <Card.Description>{getBody()}</Card.Description>
      </Card>
    </Container>
  );
}

export { VerifyEmail };
