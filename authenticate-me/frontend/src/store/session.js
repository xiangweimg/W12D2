import csrfFetch from "./csrf";

const LOGIN_USER = "session/LOGIN_USER";
const loginUser = (user) => { // an action creator
  return {
    type: LOGIN_USER,
    payload: user
  }
}

const LOGOUT_USER = "session/LOGOUT_USER";
const logoutUser = () => { // an action creator
  return {
    type: LOGOUT_USER
  }
}

export const login = (user) => async dispatch => { // { username: 'ford', password: '123456', email: 'ford@ford.com' }
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(user)
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(loginUser(JSON.stringify(data.user)));
  }
  
}

export const restoreSession = () => async dispatch => {
  const res = await csrfFetch('/api/session') //did what restoreCSRF did, provide Xtoken
  storeCSRFToken(res)
  const data = await res.json() //return a promise
  storeCurrentUser(data.user)
  dispatch(loginUser(JSON.stringify(data.user)));
}

const storeCurrentUser = (user) => {
  sessionStorage.setItem("currentUser", JSON.stringify(user))
}

export function storeCSRFToken(responseObj) { //send Xtoken to session storage
  const csrfToken = responseObj.headers.get('X-CSRF-Token');
  if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}

export default function sessionReducer (state = {'user': JSON.parse(sessionStorage.getItem("currentUser"))}, action) {
  const newState = {...state}
  switch (action.type) {
    case LOGIN_USER:
      newState['user'] = action.payload;
      return newState;
    case LOGOUT_USER:
      console.log('logging out')
      newState['user'] = null;
      return newState;
    default:
      return state;
  }
} 