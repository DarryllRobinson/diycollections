import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';

import { userService } from './user.service';

export const UsersList = (props) => {
  const { handleSelect, user } = props;
  const [users, setUsers] = useState(null);
  const [userStatus, setUserStatus] = useState('idle');

  useEffect(() => {
    async function fetchUsers() {
      setUsers(await userService.getAll());
      setUserStatus('succeeded');
    }

    fetchUsers();
  }, [userStatus]);

  let content;
  let options = [];

  if (!users) {
    content = <div className="loader">Loading...</div>;
  } else if (userStatus === 'succeeded') {
    users.map((user) =>
      options.push({
        key: user.id,
        text: user.firstName + ' ' + user.lastName,
        value: user.email,
      })
    );
    const username = user.firstName + ' ' + user.lastName;
    content = (
      <Form.Select
        fluid
        id="form-input-control-userlist"
        label="Assignment"
        name="currentAssignment"
        onChange={handleSelect}
        options={options}
        placeholder={username}
        required
      />
    );
  } /*else if (userStatus === 'error') {
    content = <div>{error}</div>;
  }*/

  return <>{content}</>;
};
