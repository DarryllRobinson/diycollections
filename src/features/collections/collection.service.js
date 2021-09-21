import { fetchWrapper } from '../../helpers';

export const collectionService = {
  getAll,
  getCollection,
};

function getAll() {
  return fetchWrapper.get('/collections');
  //const coll = await fetchWrapper.get('/collections');
  //console.log(coll);
  //return coll;
}

async function getCollection(id) {
  /*const coll = await fetchWrapper.get(`/collections/${id}`);
  console.log(coll);
  return coll;*/
  return fetchWrapper.get(`/collections/${id}`);
}
