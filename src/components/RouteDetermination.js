import React from 'react';
import { Container } from 'semantic-ui-react';
import { Redirect, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { Dashboard } from '../features/dashboard/Dashboard';

import { Collections } from '../features/collections/Collections';
import { Collection } from '../features/collections/Collection';

import { CustomerManagement } from '../features/customers/CustomerManagement';
import { CustomerEditor } from '../features/customers/CustomerEditor';

import Upload from '../features/upload/Upload';
import Reports from '../features/reports/Reports';
import { Role } from '../helpers';

import { ReleaseNotes } from '../features/release/ReleaseNotes';

import { Users } from '../features/users/Users';

import { NotFound } from './NotFound';

export const RouteDetermination = () => {
  return (
    <Container fluid className="RouteDetermination">
      <Switch>
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
          path="/release"
          exact
          roles={[Role.Admin, Role.Super]}
          component={ReleaseNotes}
        />
        <PrivateRoute
          path="/users"
          exact
          roles={[Role.Admin, Role.Super]}
          component={Users}
        />
        <PrivateRoute
          path="/customers"
          exact
          roles={[Role.Super]}
          component={CustomerManagement}
        />
        <PrivateRoute
          path="/customers/:id"
          exact
          roles={[Role.Super]}
          component={CustomerEditor}
        />

        {/* Redirect all unauthorised */}
        <PrivateRoute exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Container>
  );
};
