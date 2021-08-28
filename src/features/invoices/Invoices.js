import React, { useEffect, useState } from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import { invoiceService } from './invoice.service';

export const Invoices = () => {
  const [invoices, setInvoices] = useState(null);
  const [invoiceStatus, setInvoiceStatus] = useState('idle');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    async function fetchInvoices() {
      setInvoiceStatus('loading');
      setInvoices(await invoiceService.getDocById(1));
      setInvoiceStatus('succeeded');
    }

    fetchInvoices();
  }, []);

  let content;

  if (!invoices) {
    content = (
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    );
  } else if (invoiceStatus === 'error') {
    content = <div>error</div>;
  } else if (invoiceStatus === 'succeeded' && invoices) {
    //console.log('invoices: ', invoices);
    content = (
      <div>
        <Document file={invoices} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }

  return <Container>{content}</Container>;
};
