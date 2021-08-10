import { BehaviorSubject } from 'rxjs';

import { fetchWrapper, history } from '../../helpers';

const userSubject = new BehaviorSubject(null);

export const userService = {
  login,
  logout,
  refreshToken,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  setNewPassword,
  getAll,
  getById,
  create,
  update,
  deactivateUser,
  reactivateUser,
  delete: _delete,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

function login(email, password) {
  return fetchWrapper
    .post(`/users/authenticate`, { email, password })
    .then((user) => {
      console.log(user);
      if (user.status === 'Error') {
        return user;
      }
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      startRefreshTokenTimer();
      return user;
    });
}

function logout() {
  // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
  fetchWrapper.post(`/users/revoke-token`, {});
  stopRefreshTokenTimer();
  userSubject.next(null);
  history.push('/login');
}

function refreshToken() {
  return fetchWrapper.post(`/users/refresh-token`, {}).then((user) => {
    // publish user to subscribers and start timer to refresh token
    userSubject.next(user);
    startRefreshTokenTimer();
    return user;
  });
}

function register(params) {
  return fetchWrapper.post(`/users/register`, params);
}

function verifyEmail(token) {
  return fetchWrapper.post(`/users/verify-email`, { token });
}

function forgotPassword(email) {
  return fetchWrapper.post(`/users/forgot-password`, { email });
}

function validateResetToken(token) {
  return fetchWrapper.post(`/users/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
  return fetchWrapper.post(`/users/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}

function setNewPassword({ token, password, confirmPassword }) {
  return fetchWrapper.post(`/users/set-password`, {
    token,
    password,
    confirmPassword,
  });
}

function getAll() {
  return fetchWrapper.get('/users');
}

function getById(id) {
  return fetchWrapper.get(`/users/${id}`);
}

function create(params) {
  return fetchWrapper.post('/users', params);
}

function update(id, params) {
  return fetchWrapper.put(`/users/${id}`, params).then((user) => {
    // update stored user if the logged in user updated their own record
    if (user.id === userSubject.value.id) {
      // publish updated user to subscribers
      user = { ...userSubject.value, ...user };
      userSubject.next(user);
    }
    return user;
  });
}

function deactivateUser(id) {
  return fetchWrapper.put(`/users/deactivate/${id}`);
}

function reactivateUser(id) {
  return fetchWrapper.put(`/users/reactivate/${id}`);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`/users/${id}`).then((x) => {
    // auto logout if the logged in user deleted their own record
    if (id === userSubject.value.id) {
      logout();
    }
    return x;
  });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
  // parse json object from base64 encoded jwt token
  const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

  // set a timeout to refresh the token a minute before it expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
