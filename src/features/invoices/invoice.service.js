import { fetchWrapper } from '../../helpers';

export const invoiceService = {
  getDocById,
};

async function getDocById(id) {
  //console.log('fetching invoice: ', id);
  return await fetchWrapper.getDocument(`/invoices/document/${id}`);
  //console.log('invoice: ', invoice);
  //return invoice;
}
