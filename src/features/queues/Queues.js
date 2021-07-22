import React, { useEffect, useState } from 'react';
import { Grid, Label, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { queueService } from './queue.service';
import { userService } from '../users/user.service';

export const Queues = () => {
  const user = userService.userValue;
  const [queues, setCollections] = useState(null);

  useEffect(() => {
    queueService.getAll().then((x) => setCollections(x));
  }, []);

  function PrepareQueues(queues) {
    const statusList = GetStatus(queues);
    const listWithCount = StatusCount(queues, statusList);

    // Must remember to convert to Links list/#types-link
    const item = listWithCount.map((item, idx) => (
      <List.Item
        key={idx}
        as={Link}
        to={{
          pathname: '/collections',
          state: {
            caseStatus: item.item,
          },
        }}
      >
        <List.Content floated="left" verticalAlign="middle">
          {item.item}
        </List.Content>
        <List.Content floated="right" verticalAlign="middle">
          <Label circular>{item.count}</Label>
        </List.Content>
      </List.Item>
    ));

    return item;
  }

  function PrepareUserQueues(queues, currentAssignment) {
    //currentAssignment = 'darryllrobinson@icloud.com';
    //console.log('currentAssignment: ', currentAssignment);
    const statusList = GetStatus(queues);
    const listWithCount = UserStatusCount(
      queues,
      statusList,
      currentAssignment.email
    );

    const item = listWithCount.map((item, idx) => (
      <List.Item key={idx} as={Link} to="/collections">
        <List.Content floated="left" verticalAlign="middle">
          {item.item}
        </List.Content>
        <List.Content floated="right" verticalAlign="middle">
          <Label circular>{item.count}</Label>
        </List.Content>
      </List.Item>
    ));

    return item;
  }

  function StatusCount(queues, statusList) {
    let items = [];

    statusList.forEach((status) => {
      let count = 0;
      queues.forEach((record) => {
        if (record.currentStatus === status) ++count;
      });

      items.push({ item: status, count: count });
    });
    return items;
  }

  function UserStatusCount(queues, statusList, currentAssignment) {
    let items = [];

    statusList.forEach((status) => {
      let count = 0;
      queues.forEach((record) => {
        if (
          record.currentStatus === status &&
          record.currentAssignment === currentAssignment
        )
          ++count;
      });

      items.push({ item: status, count: count });
    });
    return items;
  }

  function GetStatus(queues) {
    let allStatusList = [];
    queues.forEach((queue) => {
      allStatusList.push(queue.currentStatus);
    });

    const statusList = allStatusList.filter(OnlyUnique);

    return statusList;
  }

  function OnlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let mainQueues;
  let userQueues;

  if (!queues) {
    mainQueues = <div>Loading</div>;
    userQueues = <div>Loading</div>;
  } else if (queues.length === 0) {
    mainQueues = <div>None found</div>;
    userQueues = <div>None found</div>;
  } else {
    mainQueues = PrepareQueues(queues);
    userQueues = PrepareUserQueues(queues, user);
  }

  return (
    <Grid container>
      <Grid.Column textAlign="left">
        <Segment raised>
          <List animated divided link selection>
            <Label as="a" className="queue label" ribbon>
              Department Queues
            </Label>
            {mainQueues}
            <br />
            <Label as="a" className="queue label" ribbon>
              User Queues
            </Label>
            {userQueues}
          </List>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
