import { fetchWrapper } from '../../helpers';

export const caseService = {
  getAll,
  getCase,
  updateCase,
};

function getAll() {
  return fetchWrapper.get('/cases');
}

function getCase(id) {
  return fetchWrapper.get(`/cases/${id}`);
}

function updateCase(id, params) {
  //console.log('updateCase id: ', id, params);
  return fetchWrapper.put(`/cases/${id}`, params);
}
