import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * worker Saga: will be fired on "LOGIN" actions
 * @param {object} action
 * @param {string} action.type - should equal "LOGIN"
 * @param {object} action.payload
 * @param {string} action.payload.username
 * @param {string} action.payload.password
 */
function* loginUser(action) {
  try {
    // clear any existing error on the login page
    yield put({ type: 'CLEAR_LOGIN_ERROR' });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.post('api/admin/login', action.payload, config);
    // after the user has logged in
    // get the user information from the server
    yield put({type: 'FETCH_USER'});
  } catch (error) {
    console.log('Error with user login:', error);
    if (error.response.status === 401) {
      // The 401 is the error status sent from passport
      // if user isn't in the database or
      // if the username and password don't match in the database
      yield put({ type: 'LOGIN_FAILED' });
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({ type: 'LOGIN_FAILED_NO_CODE' });
    }
  }
}

/**
 * worker Saga: will be fired on "LOGOUT" actions
 * @param {object} action
 * @param {string} action.type - should equal "LOGOUT"
 */
function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post('api/admin/logout', config);

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield put({ type: 'UNSET_USER' });

  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

/**
 * WHY takeLatest
 *
 * 'takeLatest', does not allow concurrent fetches of user. If the same dispatch
 * 'GET_ID' gets dispatched while a fetch is already pending, that pending fetch
 * is cancelled and only the latest one will be run.
 * 
 * 'takeLatest' - DO NOT use on other Sagas unless you explicitly want the above behavior.
 */
function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
}

export default loginSaga;
