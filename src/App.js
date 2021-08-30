import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { createMedia } from '@artsy/fresnel';

import { PrivateRoute, RouteDetermination } from './components';
//import { Role } from './helpers';
import Home from './components/Home';
import { NavBar } from './features/navbar/NavBar';
import { Alert } from './features/alerts/Alert';
import Login from './features/users/Login';
import { Register } from './features/users/Register';
import { ForgotPassword } from './features/users/ForgotPassword';
import { ResetPassword } from './features/users/ResetPassword';
import { VerifyEmail } from './features/users/VerifyEmail';
import { ViewInvoice } from './features/invoices/ViewInvoice';

function App() {
  const { pathname } = useLocation();

  const AppMedia = createMedia({
    breakpoints: {
      mobile: 320,
      tablet: 768,
      computer: 992,
      largeScreen: 1200,
      widescreen: 1920,
    },
  });
  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;

  const leftItems = [
    { as: 'a', content: 'Home', key: 'home' },
    { as: 'a', content: 'Users', key: 'users' },
  ];
  const rightItems = [
    { as: 'a', content: 'Login', key: 'login' },
    { as: 'a', content: 'Register', key: 'register' },
  ];

  return (
    <Container fluid>
      <MediaContextProvider>
        <style>{mediaStyles}</style>
        <NavBar Media={Media} leftItems={leftItems} rightItems={rightItems} />
        <Alert />
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/users/verify-email" exact component={VerifyEmail} />
          <Route
            path="/users/forgot-password"
            exact
            component={ForgotPassword}
          />
          <Route path="/users/reset-password" exact component={ResetPassword} />
          <Route path="/invoices/view-invoice" exact component={ViewInvoice} />
          <PrivateRoute component={RouteDetermination} />
          <Redirect from="*" to="/" />
        </Switch>
      </MediaContextProvider>
    </Container>
  );
}

export { App };
