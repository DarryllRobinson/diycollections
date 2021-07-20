import { fetchWrapper } from '../../helpers';

export const reportService = {
  getReport,
};

function getReport(report) {
  return fetchWrapper.get(`/reports/${report}`);
}
