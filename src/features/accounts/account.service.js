import { fetchWrapper } from '../../helpers';

export const accountService = {
  getAll,
  getAccount,
  updateAccount,
};

function getAll() {
  return fetchWrapper.get('/accounts');
}

function getAccount(id) {
  return fetchWrapper.get(`/accounts/${id}`);
}

function updateAccount(id, params) {
  //console.log('updateAccount', id, params);
  return fetchWrapper.put(`/accounts/${id}`, params);
}
