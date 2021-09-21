import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';

import { ClientCreator } from './ClientCreator';
import { ClientEditor } from './ClientEditor';
import { clientService } from './client.service';

export const ClientManagement = () => {
  const [clients, setClients] = useState(null);
  const [clientsStatus, setClientsStatus] = useState('idle');

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchClients() {
      setClientsStatus('loading');
      setClients(await clientService.getAll());
      setClientsStatus('succeeded');
    }

    fetchClients();
  }, []);

  return <Container>Clients</Container>;
};
