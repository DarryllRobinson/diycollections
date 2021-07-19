import { fetchWrapper } from '../../helpers';

export const uploadService = {
  bulkCreate,
  create,
};

function create(table, params) {
  return fetchWrapper.post(`/${table}`, params);
}

function bulkCreate(table, params) {
  return fetchWrapper.post(`/${table}/bulk`, params);
}
