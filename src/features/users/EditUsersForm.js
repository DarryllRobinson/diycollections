import React from 'react';
import { Button, Container, Table } from 'semantic-ui-react';

import { alertService } from '../alerts/alert.service';
import { userService } from './user.service';

export const EditUsersForm = (props) => {
  const { loadUsers } = props;
  const { users } = props;

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

  const content = users.map((user, idx) => {
    const userId = user.id;
    return (
      <Table.Row key={idx}>
        <Table.Cell key={idx + 1}>{user.email}</Table.Cell>
        <Table.Cell key={idx + 2}>{user.firstName}</Table.Cell>
        <Table.Cell key={idx + 3}>{user.lastName}</Table.Cell>
        <Table.Cell key={idx + 4}>{user.role}</Table.Cell>

        {user.active === true && (
          <Table.Cell key={idx + 5} textAlign="center">
            <Button negative onClick={() => deactivateUser(userId)}>
              Deactivate
            </Button>
          </Table.Cell>
        )}
        {user.active === false && (
          <Table.Cell key={idx + 5} textAlign="center">
            <Button positive onClick={() => reactivateUser(userId)}>
              Reactivate
            </Button>
          </Table.Cell>
        )}
      </Table.Row>
    );
  });

  return (
    <Container>
      <Table className="userAdmin" celled fixed selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Surname</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{content}</Table.Body>
      </Table>
    </Container>
  );
};
