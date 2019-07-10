import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('api/admin/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: {
      username: action.payload.email,
      password: action.payload.password
    }});
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: 'SET_TO_LOGIN_MODE'});
  } catch (error) {
      console.log('Error with user registration:', error);
      yield put({type: 'REGISTRATION_FAILED'});
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
function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
