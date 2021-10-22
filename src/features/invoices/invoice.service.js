import { fetchWrapper } from '../../helpers';

export const invoiceService = {
  getAllByCustomer,
  getDocByLoc,
  getDocByLocUnauth,
  verifyInvoice,
};

function getAllByCustomer(customerRefNo) {
  //console.log('getAllByCustomer customerRefNo: ', customerRefNo);
  return fetchWrapper.get(`/invoices/${customerRefNo}`);
}

async function getDocByLoc(location) {
  //console.log('getDocByLoc: ', location);
  const invoice = await fetchWrapper.getDocument(
    `/invoices/document`,
    location
  );
  //console.log('invoice.service invoice: ', invoice);
  return invoice;
}

function getDocByLocUnauth(location) {
  //console.log('getDocByLocUnauth: ', location);
  return fetchWrapper.getDocument(`/invoices/u-document`, location);
  //console.log('invoice: ', invoice);
  //return invoice;
}

function verifyInvoice(token) {
  return fetchWrapper.post(`/invoices/verify-invoice`, { token });
}
