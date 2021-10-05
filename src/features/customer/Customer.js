import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const cardContent = [
  {
    href: '/customer/edit',
    header: 'Edit',
    icon: 'edit',
  },
  {
    href: '/customer/invoices',
    header: 'Invoices',
    icon: 'money bill alternate outline',
  },
  {
    href: '/customer/payment',
    header: 'Payment',
    icon: 'payment',
  },
  {
    href: '/customer/theme',
    header: 'Theme',
    icon: 'theme',
  },
];

const cardBuild = () => {
  return cardContent.map((card, idx) => {
    const { href, header, icon } = card;
    return (
      <Grid.Column key={idx}>
        <Card href={href}>
          <Card.Content>
            <Card.Header textAlign="center">{header}</Card.Header>
            <Card.Meta>
              <Icon bordered color="teal" name={icon} size="massive" />
            </Card.Meta>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  });
};

export const Customer = () => {
  return (
    <Container className="RouteDetermination">
      <Header
        as="h1"
        color="grey"
        content="Customer Portal"
        textAlign="center"
        style={{ fontSize: '4em', marginBottom: '60px' }}
      />
      <Grid relaxed stackable columns={4}>
        {cardBuild()}
      </Grid>
    </Container>
  );
};
