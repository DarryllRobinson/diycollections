import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const MappingManagement = (props) => {
  //console.log('MappingManagement props: ', props);
  return (
    <Container>
      <Button as={Link} to="/mapping/create" primary size="small">
        Mapping Creator
      </Button>
      <Button as={Link} to="/mapping/1" primary size="small">
        Mapping Editor
      </Button>
    </Container>
  );
};
