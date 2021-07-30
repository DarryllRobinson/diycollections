import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Message } from 'semantic-ui-react';

import { alertService, AlertType } from './alert.service';
import { history } from '../../helpers';

const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

const defaultProps = {
  id: 'default-alert',
  fade: true,
};

function Alert({ id, fade }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // subscribe to new alert notifications
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      // clear alerts when an empty alert is received
      if (!alert.message) {
        setAlerts((alerts) => {
          // filter out alerts without 'keepAfterRouteChange' flag
          const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          filteredAlerts.forEach((x) => delete x.keepAfterRouteChange);
          return filteredAlerts;
        });
      } else {
        // add alert to array
        setAlerts((alerts) => [...alerts, alert]);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => removeAlert(alert), 3000);
        }
      }
    });

    // clear alerts on location change
    const historyUnlisten = history.listen(({ pathname }) => {
      // don't clear if pathname has trailing slash because this will be auto redirected again
      if (pathname.endsWith('/')) return;

      alertService.clear(id);
    });

    // clean up function that runs when the component unmounts
    return () => {
      // unsubscribe & unlisten to avoid memory leaks
      subscription.unsubscribe();
      historyUnlisten();
    };
  }, []);

  function removeAlert(alert) {
    if (fade) {
      // fade out alert
      const alertWithFade = { ...alert, fade: true };
      setAlerts((alerts) =>
        alerts.map((x) => (x === alert ? alertWithFade : x))
      );

      // remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
      }, 250);
    } else {
      // remove alert
      setAlerts((alerts) => alerts.filter((x) => x !== alert));
    }
  }

  function cssClasses(alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'success',
      [AlertType.Error]: 'error',
      [AlertType.Info]: 'info',
      [AlertType.Warning]: 'warning',
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

  if (!alerts.length) return null;

  return (
    <Container style={{ marginTop: '80px' }}>
      {alerts.map((alert, index) => (
        <Message
          key={index}
          className={cssClasses(alert)}
          header={alert.header}
          content={alert.message}
        />
      ))}
    </Container>
  );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export { Alert };
