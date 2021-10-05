import { fetchWrapper } from '../../helpers';

export const accountService = {
  getAll,
  getAccount,
  createAccount,
  updateAccount,
};

function getAll() {
  return fetchWrapper.get('/accounts');
}

function getAccount(id) {
  return fetchWrapper.get(`/accounts/${id}`);
}

function createAccount(params) {
  return fetchWrapper.post(`/accounts`, params);
}

function updateAccount(id, params) {
  //console.log('updateAccount', id, params);
  return fetchWrapper.put(`/accounts/${id}`, params);
}
