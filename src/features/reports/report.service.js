import { fetchWrapper } from '../../helpers';

export const reportService = {
  getAging,
};

function getAging() {
  return fetchWrapper.get('/reports/aging');
}
