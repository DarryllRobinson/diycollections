import { fetchWrapper } from '../../helpers';

export const checkoutService = {
  checkout,
};

function checkout(checkoutDetails) {
  //console.log('checkoutDetails: ', checkoutDetails);
  return fetchWrapper.post('/stripe/charge', checkoutDetails);
}
