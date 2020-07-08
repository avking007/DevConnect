import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_curr_profile } from '../../actions/profile';

const Dashboard = ({ get_curr_profile, auth, profile }) => {
  useEffect(() => {
    get_curr_profile();
  }, []);
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  get_curr_profile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapper = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapper, { get_curr_profile })(Dashboard);
