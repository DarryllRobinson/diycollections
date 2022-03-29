import { fetchWrapper } from '../../helpers';

export const mappingService = {
  getAll,
  getMapping,
  createMapping,
  updateMapping,
};

function getAll() {
  return fetchWrapper.get('/mappings');
}

function getMapping(id) {
  return fetchWrapper.get(`/mappings/${id}`);
}

function createMapping(params) {
  console.log('createMapping params: ', params);
  return fetchWrapper.post(`/mappings/`, params);
}

function updateMapping(id, params) {
  console.log('updateMapping params: ', params);
  return fetchWrapper.put(`/mappings/${id}`, params);
}
