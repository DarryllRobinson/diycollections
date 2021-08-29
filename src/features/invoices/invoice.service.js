import { fetchWrapper } from '../../helpers';

export const invoiceService = {
  getDocByLoc,
  verifyInvoice,
};

function getDocByLoc(location) {
  console.log('getDocByLoc: ', location);
  return fetchWrapper.getDocument(`/invoices/document`, location);
  //console.log('invoice: ', invoice);
  //return invoice;
}

function verifyInvoice(token) {
  return fetchWrapper.post(`/invoices/verify-invoice`, { token });
}
