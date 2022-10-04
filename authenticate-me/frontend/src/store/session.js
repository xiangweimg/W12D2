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
    console.log(data)
    dispatch(loginUser(data.user));
  }
  
}

export default function sessionReducer (state = {'user': null}, action) {
  const newState = {...state}
  switch (action.type) {
    case LOGIN_USER:
      newState['user'] = action.payload;
      return newState;
    case LOGOUT_USER:
      newState['user'] = null;
      return newState;
    default:
      return state;
  }
} 