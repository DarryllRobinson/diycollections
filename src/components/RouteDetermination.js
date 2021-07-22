import React from 'react';
import { Container } from 'semantic-ui-react';

import { PrivateRoute } from './PrivateRoute';
import { Dashboard } from '../features/dashboard/Dashboard';

import { Collections } from '../features/collections/Collections';

import Upload from '../features/upload/Upload';
import Reports from '../features/reports/Reports';
import { Role } from '../helpers';

export const RouteDetermination = () => {
  return (
    <Container fluid className="RouteDetermination">
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute
        path="/upload"
        roles={[Role.Admin]}
        exact
        component={Upload}
      />
      <PrivateRoute path="/collections" exact component={Collections} />
      <PrivateRoute path="/reports" exact component={Reports} />
    </Container>
  );
};
