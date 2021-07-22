import { fetchWrapper } from '../../helpers';

export const collectionService = {
  getAll,
};

function getAll() {
  return fetchWrapper.get('/collections');
}
