import axios from 'axios';
import { set_alert } from './alert';
import setAuthToken from '../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

export const loaduser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loaduser());
  } catch (error) {
    const err = error.response.data.error;
    if (err) {
      err.forEach((error) => dispatch(set_alert(error.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

//log in user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loaduser());
  } catch (error) {
    const err = error.response.data.error;
    if (err) {
      err.forEach((error) => dispatch(set_alert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

//logout //clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
