import axios from 'axios';
// import { set_alert } from './alert';
import { PROFILE_ERROR, GET_PROFILE } from './types';

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
