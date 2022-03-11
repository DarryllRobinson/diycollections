import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CustomerManagement } from './CustomerManagement';
import { CustomerEditor } from './CustomerEditor';
import CustomerCreator from './CustomerCreator';

function Customers({ history, match }) {
  const { path } = match;
  //console.log('Customers index: ', history, match);

  return (
    <Switch>
      <Route path={path} exact component={CustomerManagement} />
      <Route path={`${path}/create`} component={CustomerCreator} />
      <Route path={`${path}/:id`} component={CustomerEditor} />
    </Switch>
  );
}

export { Customers };
