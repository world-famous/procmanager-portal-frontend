/* eslint-disable import/newline-after-import,no-use-before-define */
import axios from 'axios';
import Router from 'vue-router';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const USER_DATA = 'user_data';

var router = new Router({
  mode: 'history',
});

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function getUser() {
  return JSON.parse(localStorage.getItem(USER_DATA));
}

export function setUser( user ) {
  localStorage.setItem(USER_DATA, JSON.stringify(user));
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName() {
  let match = Math.random().toString(36);
  return match;
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken( idToken ) {
//  let idToken = getParameterByName();
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return idToken;
}

export function login(username, password) {
  return new Promise( (resolve, reject) => {
  axios.post('http://localhost:3130/user/login', {
    'email': username,
    'password': password,
  })
    .then( function(response){
      setIdToken( response.data.token );
      setUser( response.data.user );
      resolve("Ok");
//      router.push('/dashboard');
//      router.go('/dashboard')
    })
    .catch(function () {
      reject("Error");
// Show error message
//      router.go('/');
    });
  });
}

export function logout() {
  return new Promise( (resolve, reject) => {

  axios.get('http://localhost:3130/user/logout', { withCredentials: true })
    .then(function () {
  clearIdToken();
  clearAccessToken();
      resolve("Ok");
    })
    .catch(function () {
  clearIdToken();
  clearAccessToken();
      resolve("Ok");
    });
  });
}

export function verify( token ) {
  return new Promise( (resolve, reject) => {
  clearIdToken();
  clearAccessToken();
  axios.post('http://localhost:3130/user/verify', {
    'token': token
  })
    .then(function () {
      resolve("Ok");
    })
    .catch(function () {
      reject("Error");
    });
  });
}
