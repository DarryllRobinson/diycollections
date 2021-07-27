import { fetchWrapper } from '../../helpers';

export const collectionService = {
  getAll,
  getCollection,
};

function getAll() {
  return fetchWrapper.get('/collections');
}

function getCollection(id) {
  return fetchWrapper.get(`/collections/${id}`);
}
