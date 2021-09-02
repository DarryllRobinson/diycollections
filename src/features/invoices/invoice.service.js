import { fetchWrapper } from '../../helpers';

export const invoiceService = {
  getAll,
  getDocByLoc,
  getDocByLocUnauth,
  verifyInvoice,
};

function getAll() {
  return fetchWrapper.get('/invoices');
}

function getDocByLoc(location) {
  //console.log('getDocByLoc: ', location);
  return fetchWrapper.getDocument(`/invoices/document`, location);
  //console.log('invoice: ', invoice);
  //return invoice;
}

function getDocByLocUnauth(location) {
  console.log('getDocByLocUnauth: ', location);
  return fetchWrapper.getDocument(`/invoices/u-document`, location);
  //console.log('invoice: ', invoice);
  //return invoice;
}

function verifyInvoice(token) {
  return fetchWrapper.post(`/invoices/verify-invoice`, { token });
}
