import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { PrivateRoute, RouteDetermination } from './components';
//import { Role } from './helpers';
import Home from './components/Home';
import { Nav } from './features/nav/Nav';
import { Alert } from './features/alerts/Alert';
import Login from './features/users/Login';
import { Register } from './features/users/Register';
import { ForgotPassword } from './features/users/ForgotPassword';
import { ResetPassword } from './features/users/ResetPassword';
import { VerifyEmail } from './features/users/VerifyEmail';
import { ViewInvoice } from './features/invoices/ViewInvoice';

function App() {
  const { pathname } = useLocation();

  return (
    <Container fluid>
      <Nav />
      <Alert />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/users/verify-email" exact component={VerifyEmail} />
        <Route path="/users/forgot-password" exact component={ForgotPassword} />
        <Route path="/users/reset-password" exact component={ResetPassword} />
        <Route path="/invoices/view-invoice" exact component={ViewInvoice} />
        <PrivateRoute component={RouteDetermination} />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
  );
}

export { App };
