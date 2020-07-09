import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const initState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false, repos: [] };

    case CLEAR_PROFILE:
      return { ...state, profile: null, error: {}, loading: true };
    default:
      return state;
  }
}
