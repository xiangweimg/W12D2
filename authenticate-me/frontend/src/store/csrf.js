async function csrfFetch (url, options = {}) {
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there are no headers
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
  } //如果不是GET，则从sessionStorage 拿Xtoken

  const res = await fetch(url, options);

  if (res.status >= 400) throw res;

  return res;

}

export default csrfFetch;

// export function storeCSRFToken(responseObj) { //send Xtoken to session storage
//   const csrfToken = responseObj.headers.get('X-CSRF-Token');
//   if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
// }

// export async function restoreCSRF () { //get Xtoken when first render
//   const res = await csrfFetch('/api/session')
//   storeCSRFToken(res);
//   return res;
// }

