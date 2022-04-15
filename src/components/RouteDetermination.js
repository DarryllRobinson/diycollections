import React from 'react';
import { Container } from 'semantic-ui-react';
import { Redirect, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { Dashboard } from '../features/dashboard/Dashboard';

import { Collections } from '../features/collections/Collections';
import { Collection } from '../features/collections/Collection';

import { Customers } from '../features/customers';

import { Customer } from '../features/customer';
import { Invoices } from '../features/invoices/Invoices';

import { ClientManagement } from '../features/clients/ClientManagement';
import { ClientCreator } from '../features/clients/ClientCreator';
import { ClientEditor } from '../features/clients/ClientEditor';

import Upload from '../features/upload/Upload';
import Reports from '../features/reports/Reports';
import { Mappings } from '../features/mappings';
import { Role } from '../helpers';

import { ReleaseNotes } from '../features/release/ReleaseNotes';

import { Users } from '../features/users/Users';
import Register from '../features/users/Register';

import { NotFound } from './NotFound';

export const RouteDetermination = () => {
  // Leave out [roles] if you want all users to have access
  // roles={[Role.Agent, Role.Lead, Role.KAM, Role.Admin, Role.Super]}
  return (
    <Container fluid className="RouteDetermination">
      <Switch>
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute
          path="/upload"
          roles={[Role.Agent, Role.Lead, Role.KAM, Role.Admin, Role.Super]}
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
          path="/mapping"
          roles={[Role.Super]}
          component={Mappings}
        />

        <PrivateRoute
          path="/users"
          exact
          roles={[Role.Admin, Role.Super]}
          component={Users}
        />
        <PrivateRoute
          path="/customers"
          roles={[Role.Super]}
          component={Customers}
        />

        <PrivateRoute
          path="/customer"
          roles={[Role.Customer, Role.Super]}
          component={Customer}
        />
        <PrivateRoute
          path="/customer/invoices"
          exact
          roles={[Role.Super]}
          component={Invoices}
        />

        <PrivateRoute
          path="/clients"
          exact
          roles={[Role.Super]}
          component={ClientManagement}
        />
        <PrivateRoute
          path="/clients/create"
          exact
          roles={[Role.Super]}
          component={ClientCreator}
        />
        <PrivateRoute
          path="/clients/:id"
          exact
          roles={[Role.Super]}
          component={ClientEditor}
        />

        {/* Redirect all unauthorised */}
        <PrivateRoute exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Container>
  );
};
