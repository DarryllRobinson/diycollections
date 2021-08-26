import React, { useEffect, useState } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Role, history } from '../../helpers';
import { userService } from '../users';
import { Profile } from '../users/Profile';

export const Nav = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [user, setUser] = useState({});
  // Controls the Profile dropdown menu component so it stays open when clicked
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    history.push(`/${name}`);
  };

  // handlers for dropdown menu open state
  const handleProfileClick = (update) => {
    console.log('handleProfileClick');
    setOpen(update);
  };

  const clickOutside = () => {
    console.log('click outside');
    setOpen(false);
  };

  const logButton = user ? (
    <Menu.Item
      name="logout"
      active={activeItem === 'logout'}
      onClick={userService.logout}
    >
      Logout
    </Menu.Item>
  ) : (
    <Menu.Item
      name="login"
      active={activeItem === 'login'}
      onClick={handleItemClick}
    >
      Login
    </Menu.Item>
  );

  if (
    !user ||
    history.location.pathname === '/' ||
    history.location.pathname === '/login'
  )
    return null;

  return (
    <Menu stackable fixed="top" inverted>
      <Link to="/">
        <Menu.Item>
          <img src="https://react.semantic-ui.com/logo.png" alt="menu logo" />
        </Menu.Item>
      </Link>

      <Menu.Item
        name="dashboard"
        active={activeItem === 'dashboard'}
        onClick={handleItemClick}
      >
        Dashboard
      </Menu.Item>

      <Menu.Item
        name="collections"
        active={activeItem === 'collections'}
        onClick={handleItemClick}
      >
        Collections
      </Menu.Item>

      {[Role.Super].includes(user.role) && (
        <Menu.Item
          name="customers"
          active={activeItem === 'customers'}
          onClick={handleItemClick}
        >
          Customers
        </Menu.Item>
      )}

      <Menu.Item
        name="reports"
        active={activeItem === 'reports'}
        onClick={handleItemClick}
      >
        Reports
      </Menu.Item>

      <Menu.Item
        name="upload"
        active={activeItem === 'upload'}
        onClick={handleItemClick}
      >
        Upload
      </Menu.Item>

      {[Role.Admin, Role.Super].includes(user.role) && (
        <Menu.Item
          name="users"
          active={activeItem === 'users'}
          onClick={handleItemClick}
        >
          User Admin
        </Menu.Item>
      )}

      {user.role === Role.Super && (
        <Dropdown item text="Client Admin">
          <Dropdown.Menu>
            <Dropdown.Item
              name="addclient"
              active={activeItem === 'clients'}
              onClick={handleItemClick}
            >
              Add Client
            </Dropdown.Item>
            <Dropdown.Item
              name="editclient"
              active={activeItem === 'clients'}
              onClick={handleItemClick}
            >
              Edit Client
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      <Menu.Menu position="right">
        {[Role.Admin, Role.Super].includes(user.role) && (
          <Menu.Item
            name="release"
            active={activeItem === 'release'}
            onClick={handleItemClick}
          >
            Release Notes & Bugs
          </Menu.Item>
        )}
        <Menu.Item>
          <Dropdown
            className="icon"
            icon="user"
            labeled
            onClick={() => handleProfileClick(true)}
            open={open}
            text={user.firstName}
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <Profile
                  handleProfileClick={handleProfileClick}
                  clickOutside={clickOutside}
                  open={open}
                  setOpen={setOpen}
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        {logButton}
      </Menu.Menu>
    </Menu>
  );
};
