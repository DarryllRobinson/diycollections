import React from 'react';

import { Container, Icon, Message } from 'semantic-ui-react';

export const NotFound = (props) => {
  //console.log('Unauthorised props: ', props);
  return (
    <Container>
      <Message error icon size="massive">
        <Icon name="warning sign" />
        <Message.Content>
          <Message.Header>Page not found</Message.Header>
          Please try a different page
        </Message.Content>
      </Message>
    </Container>
  );
};
