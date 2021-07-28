import { fetchWrapper } from '../../helpers';

export const outcomeService = {
  getAll,
  getOutcomesByCaseNumber,
  getOutcome,
  createOutcome,
  updateOutcome,
};

function getAll() {
  return fetchWrapper.get('/outcomes');
}

function getOutcomesByCaseNumber(caseNumber) {
  return fetchWrapper.get(`/outcomes/${caseNumber}`);
}

function createOutcome(params) {
  console.log('createOutcome', params);
  return fetchWrapper.post('/outcomes', params);
}

function getOutcome(id) {
  return fetchWrapper.get(`/outcomes/${id}`);
}

function updateOutcome(id, params) {
  return fetchWrapper.put(`/outcomes/${id}`, params);
}
