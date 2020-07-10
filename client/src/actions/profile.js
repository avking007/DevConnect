import axios from 'axios';
import { set_alert } from './alert';
import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE } from './types';

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
//ADD experience
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
