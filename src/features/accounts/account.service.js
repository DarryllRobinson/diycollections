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

function updateAccount(id) {
  return fetchWrapper.put(`/accounts/${id}`);
}
