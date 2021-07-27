import { fetchWrapper } from '../../helpers';

export const contactService = {
  getAll,
  getContact,
  updateContact,
};

function getAll() {
  return fetchWrapper.get('/contacts');
}

function getContact(id) {
  return fetchWrapper.get(`/contacts/${id}`);
}

function updateContact(id, params) {
  //console.log('updateContact id: ' + id);
  return fetchWrapper.put(`/contacts/${id}`, params);
}
