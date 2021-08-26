import { fetchWrapper } from '../../helpers';

export const customerService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return fetchWrapper.get('/customers');
}

function getById(id) {
  return fetchWrapper.get(`/customers/${id}`);
}

function create(params) {
  return fetchWrapper.post('/customers', params);
}

function update(id, params) {
  return fetchWrapper.put(`/customers/${id}`, params).then((customer) => {
    return customer;
  });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`/customers/${id}`).then((x) => {
    return x;
  });
}
