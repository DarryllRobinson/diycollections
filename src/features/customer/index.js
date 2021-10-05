import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CustomerEditor } from './CustomerEditor';

function Customer({ history, match }) {
  const { path } = match;

  return (
    <Switch>
      <Route path={`${path}/:id`} component={CustomerEditor} />
    </Switch>
  );
}

export { Customer };
