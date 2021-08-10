import React from 'react';
import { Button, Container, Table } from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

import tick from '../../assets/img/green-tick.jpeg';
import cross from '../../assets/img/red-cross.png';

export const EditUsersForm = (props) => {
  const { loadUsers } = props;
  const { users } = props;
  const loggedInUser = userService.userValue;

  const deactivateUser = async (userId) => {
    userService.deactivateUser(userId).then((response) => {
      if (response.status === 'success') {
        alertService.success('Success', 'User was successfully deactivated');
        loadUsers();
      } else {
        alertService.error('Error', 'User was not deactivated');
      }
    });
  };

  const reactivateUser = async (userId) => {
    userService.reactivateUser(userId).then((response) => {
      if (response.status === 'success') {
        alertService.success('Success', 'User was successfully reactivated');
        loadUsers();
      } else {
        alertService.error('Error', 'User was not reactivated');
      }
    });
  };

  const renderButton = (user, idx) => {
    const userId = user.id;

    if (user.email === loggedInUser.email) {
      if (user.active === true) {
        return (
          <Table.Cell key={idx} textAlign="center">
            <Button negative disabled>
              Deactivate
            </Button>
          </Table.Cell>
        );
      } else if (user.active === false) {
        return (
          <Table.Cell key={idx} textAlign="center">
            <Button positive disabled>
              Reactivate
            </Button>
          </Table.Cell>
        );
      }
    } else {
      if (user.active === true) {
        return (
          <Table.Cell key={idx} textAlign="center">
            <Button negative onClick={() => deactivateUser(userId)}>
              Deactivate
            </Button>
          </Table.Cell>
        );
      } else if (user.active === false) {
        return (
          <Table.Cell key={idx} textAlign="center">
            <Button positive onClick={() => reactivateUser(userId)}>
              Reactivate
            </Button>
          </Table.Cell>
        );
      }
    }
  };

  const renderIsVerified = (isVerified) => {
    return isVerified ? (
      <img src={tick} alt="Green tick" width="55" height="45" />
    ) : (
      <img src={cross} alt="Red cross" width="40" height="30" />
    );
  };

  const content = users.map((user, idx) => {
    return (
      <Table.Row key={idx}>
        <Table.Cell key={idx + 1}>{user.email}</Table.Cell>
        <Table.Cell key={idx + 2}>{user.firstName}</Table.Cell>
        <Table.Cell key={idx + 3}>{user.lastName}</Table.Cell>
        <Table.Cell key={idx + 4}>{user.role}</Table.Cell>
        <Table.Cell key={idx + 5} textAlign="center">
          {renderIsVerified(user.isVerified)}
        </Table.Cell>

        {renderButton(user, idx + 6)}
      </Table.Row>
    );
  });

  return (
    <Container>
      <Table className="userAdmin" celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Surname</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Verified</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{content}</Table.Body>
      </Table>
    </Container>
  );
};
