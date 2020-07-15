import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { get_all_profile } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ get_all_profile, profile: { profiles, loading } }) => {
  useEffect(() => {
    get_all_profile();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((pf) => <ProfileItem key={pf._id} profile={pf} />)
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  get_all_profile: PropTypes.func.isRequired,
};

const mapper = (state) => ({
  profile: state.profile,
});
export default connect(mapper, { get_all_profile })(Profiles);
