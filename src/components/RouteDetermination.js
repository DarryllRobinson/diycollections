import React from 'react';
import { Container } from 'semantic-ui-react';

import { PrivateRoute } from './PrivateRoute';
import { Dashboard } from '../features/dashboard/Dashboard';

import { Collections } from '../features/collections/Collections';
import { Collection } from '../features/collections/Collection';

import Upload from '../features/upload/Upload';
import Reports from '../features/reports/Reports';
import { Role } from '../helpers';

import { Users } from '../features/users/Users';

export const RouteDetermination = () => {
  return (
    <Container fluid className="RouteDetermination">
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute
        path="/upload"
        roles={[Role.Admin, Role.Super]}
        exact
        component={Upload}
      />
      <PrivateRoute path="/collections" exact component={Collections} />
      <PrivateRoute path="/collection/:id" exact component={Collection} />
      <PrivateRoute path="/reports" exact component={Reports} />

      <PrivateRoute
        path="/users"
        exact
        roles={[Role.Admin, Role.Super]}
        component={Users}
      />
    </Container>
  );
};
