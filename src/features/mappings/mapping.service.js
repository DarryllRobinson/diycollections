import { fetchWrapper } from '../../helpers';

export const mappingService = {
  getAll,
  getMapping,
  updateMapping,
};

function getAll() {
  return fetchWrapper.get('/mappings');
}

function getMapping(id) {
  return fetchWrapper.get(`/mappings/${id}`);
}

function updateMapping(params) {
  return fetchWrapper.put(`/mappings/`, params);
}
