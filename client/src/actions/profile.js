import axios from 'axios';
import { set_alert } from './alert';
import {
  PROFILE_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';

//get current user profile
export const get_curr_profile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// create/update profile
export const create_profile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(
      set_alert(edit ? 'Profile Updated' : 'Profile Created', 'success')
    );
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    const err = error.response.data.error;
    if (err) {
      err.forEach((error) => dispatch(set_alert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//ADD experience
export const add_exp = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(set_alert('Experience added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const err = error.response.data.error;
    if (err) {
      err.forEach((error) => dispatch(set_alert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//add education
export const add_edc = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(set_alert('Education added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const err = error.response.data.error;
    if (err) {
      err.forEach((error) => dispatch(set_alert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//del experience
export const del_exp = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(set_alert('Experience removed', 'success'));
  } catch (error) {
    const err = error.response.data.error;
    if (err) {
      err.forEach((error) => dispatch(set_alert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//del education
export const del_edc = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(set_alert('Education removed', 'success'));
  } catch (error) {
    const err = error.response.data.error;

    if (err) {
      err.forEach((error) => dispatch(set_alert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//DEL ACC & PROFILE
export const del_acc = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can not be undone.'))
    try {
      const res = await axios.delete(`api/profile`);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(set_alert('Your account has been deleted permanently'));
    } catch (error) {
      const err = error.response.data.error;

      if (err) {
        err.forEach((error) => dispatch(set_alert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
};
