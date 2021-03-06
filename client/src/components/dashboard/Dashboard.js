import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_curr_profile, del_acc } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  get_curr_profile,
  auth: { user },
  profile: { profile, loading },
  del_acc,
}) => {
  useEffect(() => {
    get_curr_profile();
  }, [get_curr_profile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => del_acc()}>
              <i className='fas fa-user-minus'></i> Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not yet setup your profile.Click here to create profile.
          </p>
          <Link to='/create_profile' className='btn btn-primary my-1'>
            Setup Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  get_curr_profile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  del_acc: PropTypes.func.isRequired,
};

const mapper = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapper, { get_curr_profile, del_acc })(Dashboard);
