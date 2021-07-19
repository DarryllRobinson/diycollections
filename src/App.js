import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { userService } from './features/users';
import { PrivateRoute } from './components';
import Home from './components/Home';
import { Alert } from './features/alerts/Alert';
import Login from './features/users/Login';
import { Dashboard } from './features/dashboard/Dashboard';
import Upload from './features/upload/Upload';

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <Container fluid>
      <Alert />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/upload" exact component={Upload} />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
  );
}

export { App };
