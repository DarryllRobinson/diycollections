import { fetchWrapper } from '../../helpers';

export const queueService = {
  getAll,
};

function getAll() {
  return fetchWrapper.get('/queues');
}
