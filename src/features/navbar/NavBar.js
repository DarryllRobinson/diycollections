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
import PropTypes from 'prop-types';

import { Role, history } from '../../helpers';
import { userService } from '../users';

export const NavBar = (props) => {
  const [activeItem, setActiveItem] = useState(null);
  const [user, setUser] = useState(null);
  // Controls the Profile dropdown menu component so it stays open when clicked
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
  });

  const HomepageHeading = ({ mobile }) => (
    <Container text>
      <Header
        as="h1"
        content="The System"
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as="h2"
        content="We are here to make your collections easier"
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button primary size="huge">
        Get Started
        <Icon name="right arrow" />
      </Button>
    </Container>
  );

  HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
  };

  useEffect(() => {
    //const subscription = userService.user.subscribe((x) => setUser(x));
    //return subscription.unsubscribe;
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

  // Containers for different menu states according to display size
  const DesktopNavbar = (props) => {
    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={setFixed(true)}
          onBottomPassedReverse={setFixed(false)}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: '1em 0em' }}
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
                    to="/login"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: '0.5em' }}
                  >
                    Log in
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
      </Media>
    );
  };

  DesktopNavbar.propTypes = {
    children: PropTypes.node,
  };

  const MobileNavbar = (props) => {
    const { children } = props;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
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
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as={Link} to="/login" inverted>
                      Log in
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      inverted
                      style={{ marginLeft: '0.5em' }}
                    >
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  };

  MobileNavbar.propTypes = {
    children: PropTypes.node,
  };

  const menuToDisplay = () => {
    // Home page and user not logged in
    if (history.location.pathname === '/' && !user) return <DesktopNavbar />;

    // Home page and user is logged in
    if (history.location.pathname === '/' && user)
      return <div>Home and is logged in</div>;

    // Login page
    if (history.location.pathname === '/login') return <div>Login navbar</div>;

    // Logged in and within workspace
    return <div>NavBar</div>;
  };
  return <Container>{menuToDisplay()}</Container>;
};
