import { fetchWrapper } from '../../helpers';

export const clientService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return fetchWrapper.get('/clients');
}

function getById(id) {
  return fetchWrapper.get(`/clients/${id}`);
}

function create(params) {
  return fetchWrapper.post('/clients', params);
}

function update(id, params) {
  return fetchWrapper.put(`/clients/${id}`, params).then((client) => {
    return client;
  });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`/clients/${id}`).then((x) => {
    return x;
  });
}
