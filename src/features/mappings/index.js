import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { MappingManagement } from './MappingManagement';
import { MappingEditor } from './MappingEditor';
import MappingCreator from './MappingCreator';

function Mappings({ history, match }) {
  const { path } = match;
  //console.log('Mapping index: ', history, match);

  return (
    <Switch>
      <Route path={path} exact component={MappingManagement} />
      <Route path={`${path}/create`} component={MappingCreator} />
      <Route path={`${path}/:id`} component={MappingEditor} />
    </Switch>
  );
}

export { Mappings };
