import React, { useEffect, useState } from 'react';
import { Container, Dimmer, Loader, Message, Segment } from 'semantic-ui-react';
//import { Document, Page } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import queryString from 'query-string';

import { invoiceService } from './invoice.service';

export const ViewInvoice = ({ history }) => {
  /*const [token, setToken] = useState(
    '22d778db637f80166bc4da6b3dcba85e565149093d2b60639d138858e55da3536d41646576e9b702'
  );*/
  const [token, setToken] = useState(null);

  const [invoice, setInvoice] = useState(null);
  const [invoiceStatus, setInvoiceStatus] = useState('idle');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  /*
  http://localhost:3000/customer/view-invoice?token=00a6bae722afe89294659c36d1e7d541858d1a1fdc0e023a253ad47ccc8fa28feb02bebe0dbc861d
  */

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);
    setPageNumber(1);
    //console.log('token', token);

    if (token) {
      setToken(token);
      //setToken('112759fc12e39bd1cc00aa699d4bfb563714abe833cf3a92a949682a4cb6d7163877f57538d8eee8');

      // remove token from url to prevent http referer leakage
      //history.replace(window.location.pathname);

      function fetchInvoice() {
        setInvoiceStatus('loading');
        invoiceService.verifyInvoice(token).then(async (location) => {
          //console.log('getting invoice');
          setInvoice(await invoiceService.getDocByLocUnauth(location));
          //const inv = await invoiceService.getDocByLoc(location);
          //setInvoice(inv);
          //console.log('got invoice: ', inv);
        });
        setInvoiceStatus('succeeded');
      }

      fetchInvoice();
      //console.log('fetched invoice');
    } else {
      setInvoiceStatus('error');
    }
  }, [history]);

  let content;

  if (invoiceStatus === 'loading') {
    content = (
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    );
  } else if (invoiceStatus === 'error') {
    content = (
      <Message>
        <p>
          There was a problem retrieving your invoice. Please try again by
          clicking on the link in the email.
        </p>
        <p>
          Alternatively, you can contact us by clicking {` `}
          <a href={`mailto:robot@thesystem.co.za`}>here</a>.
        </p>
      </Message>
    );
  } else if (invoiceStatus === 'succeeded') {
    //console.log('invoices: ', invoices);
    content = (
      <Segment compact>
        <Document file={invoice} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </Segment>
    );
  }

  return <Container className="RouteDetermination">{content}</Container>;
};
