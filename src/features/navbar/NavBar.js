import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Dropdown,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { createMedia } from '@artsy/fresnel';

import { Role, history } from '../../helpers';
import { userService } from '../users';
import { Profile } from '../users/Profile';

export const NavBar = (props) => {
  const [activeItem, setActiveItem] = useState(null);
  const [user, setUser] = useState(null);
  // Controls the Profile dropdown menu component so it stays open when clicked
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const AppMedia = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 992,
      largeScreen: 1200,
      widescreen: 1920,
    },
  });
  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
    //setUser('Darryll');
  }, []);

  // Handlers
  // Handler for navbar option click
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    history.push(`/${name}`);
  };

  // handlers for dropdown menu open state
  const handleProfileClick = (update) => {
    console.log('handleProfileClick');
    setOpen(update);
  };

  // Handler for hiding the sidebar
  const handleSidebarHide = () => {
    setSidebarOpened(false);
  };
  const handleToggle = () => {
    setSidebarOpened(true);
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

  // Containers for different menu states according to display size
  const desktopNavbarHome = () => {
    return (
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 100, padding: '1em 0em' }}
        vertical
      >
        <Menu
          fixed={fixed ? 'top' : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item position="right">
              {!user && (
                <Button
                  as={Link}
                  to="/login"
                  inverted={!fixed}
                  primary={fixed}
                  style={{ marginLeft: '0.5em' }}
                >
                  Log in
                </Button>
              )}
              {user && (
                <Button
                  as={Link}
                  to="/dashboard"
                  inverted={!fixed}
                  primary={fixed}
                  style={{ marginLeft: '0.5em' }}
                >
                  Dashboard
                </Button>
              )}
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    );
  };

  const mobileNavbarHome = () => {
    return (
      <Container as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            {!user && <Menu.Item as="a">Log in</Menu.Item>}
            {user && <Menu.Item as="a">Dashboard</Menu.Item>}
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 50, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    {!user && (
                      <Button as={Link} to="/login" inverted>
                        Log in
                      </Button>
                    )}
                    {user && (
                      <Button as={Link} to="/dashboard" inverted>
                        Dashboard
                      </Button>
                    )}
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  };

  // Containers for different menu states according to display size
  const desktopNavbarLogin = () => {
    return (
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 100, padding: '1em 0em' }}
        vertical
      >
        <Menu
          fixed={fixed ? 'top' : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item position="right">
              <Button
                as={Link}
                to="/dashboard"
                inverted={!fixed}
                primary={fixed}
                style={{ marginLeft: '0.5em' }}
              >
                Dashboard
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    );
  };

  const mobileNavbarLogin = () => {
    return (
      <Container as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Dashboard</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 50, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as={Link} to="/dashboard" inverted>
                      Dashboard
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  };

  const desktopNavbar = () => {
    console.log('user: ', user);
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
                    //clickOutside={clickOutside}
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

  const mobileNavbar = () => {
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
                    //clickOutside={clickOutside}
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

  const menuToDisplay = () => {
    // Home page
    if (history.location.pathname === '/') {
      console.log('Home page');
      return (
        <div>
          <Media greaterThan="mobile">{desktopNavbarHome()}</Media>
          <Media at="mobile">{mobileNavbarHome()}</Media>
        </div>
      );
    }

    // Login page
    if (history.location.pathname === '/login') {
      console.log('history.location.pathname === /login');
      return (
        <div>
          <Media greaterThan="mobile">{desktopNavbarLogin()}</Media>
          <Media at="mobile">{mobileNavbarLogin()}</Media>
        </div>
      );
    }

    // Logged in and within workspace
    return (
      <div>
        <Media greaterThan="mobile">{desktopNavbar()}</Media>
        <Media at="mobile">{mobileNavbar()}</Media>
      </div>
    );
  };

  return (
    <MediaContextProvider>
      <style>{mediaStyles}</style>
      {menuToDisplay()}
    </MediaContextProvider>
  );
};
