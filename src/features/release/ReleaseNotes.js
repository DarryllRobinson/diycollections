import React from 'react';
import { Container, Grid, Header, Icon, Table } from 'semantic-ui-react';

export const ReleaseNotes = () => {
  return (
    <Container>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Release</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Header>Resend email link to join</Header>
                    <Icon name="code" color="blue" />
                    Able to resend the invitation to join via email from the
                    User Admin section - Admin only
                  </Table.Cell>
                  <Table.Cell>2021/08/18</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header>Search function for Collections workspace</Header>
                    <Icon name="code" color="blue" />
                    Users can search for collection records based on customer
                    name (more fields to come later)
                  </Table.Cell>
                  <Table.Cell>2021/08/17</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>

          <Grid.Column>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Bug</Table.HeaderCell>
                  <Table.HeaderCell>Identified</Table.HeaderCell>
                  <Table.HeaderCell>Resolved</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row positive>
                  <Table.Cell>
                    <Header>Profile details blank</Header>
                    <Icon name="bug" color="red" />
                    Profile details blank when opening Profile tab from menu
                  </Table.Cell>
                  <Table.Cell>2021/08/17</Table.Cell>
                  <Table.Cell>2021/08/18</Table.Cell>
                </Table.Row>
                <Table.Row positive>
                  <Table.Cell>
                    <Header>Collections workspace table format</Header>
                    <Icon name="bug" color="red" />
                    The contents of the table in the Collections workspace do
                    not automatically resize to fit the screen width
                  </Table.Cell>
                  <Table.Cell>2021/08/17</Table.Cell>
                  <Table.Cell>2021/08/18</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
