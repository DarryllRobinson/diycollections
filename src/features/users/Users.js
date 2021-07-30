import React, { useEffect, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';

import { AddUserForm } from '../users/AddUserForm';
import { EditUsersForm } from '../users/EditUsersForm';
import { userService } from './user.service';

export const Users = (props) => {
  //console.log('Users props: ', props);
  const [users, setUsers] = useState(null);
  const [userStatus, setUserStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function loadUsers() {
    setUserStatus('loading');
    setUsers(await userService.getAll());
    setUserStatus('succeeded');
  }

  useEffect(() => {
    if (userStatus === 'idle') {
      loadUsers();
    }
  }, []);

  let userContent;

  if (userStatus === 'loading') {
    userContent = <Container className="loader">Loading...</Container>;
  } else if (userStatus === 'succeeded') {
    console.log('users: ', users);
    userContent = (
      <Container>
        <Header>User Admininistration</Header>
        <AddUserForm loadUsers={loadUsers} />
        <EditUsersForm users={users} loadUsers={loadUsers} />
      </Container>
    );
  } else if (userStatus === 'error') {
    userContent = <Container>userError</Container>;
  }
  return <Container>{userContent}</Container>;
};
