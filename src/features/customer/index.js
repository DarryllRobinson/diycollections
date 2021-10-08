import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CustomerManagement } from './CustomerManagement';
import { CustomerEditor } from './CustomerEditor';
import { Invoices } from '../invoices/Invoices';

function Customer({ history, match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={CustomerManagement} />
      <Route path={`${path}/invoices`} component={Invoices} />
      <Route path={`${path}/:id`} component={CustomerEditor} />
    </Switch>
  );
}

export { Customer };
