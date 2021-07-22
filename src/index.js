import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './helpers';
import { userService } from './features/users/user.service';

import 'semantic-ui-css/semantic.min.css';

import './styles.css';
import { App } from './App';

// attempt silent token refresh before startup
userService.refreshToken().finally(startApp);

function startApp() {
  render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('root')
  );
}
