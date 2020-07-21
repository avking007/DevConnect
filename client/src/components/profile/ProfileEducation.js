import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, description },
}) => {
  return (
    <Fragment>
      <div>
        <h3>{school}</h3>
        <p>
          <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
          {to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {fieldofstudy}
        </p>
        <p>
          {description && (
            <Fragment>
              <strong>Description: </strong>
              {description}
            </Fragment>
          )}
        </p>
      </div>
    </Fragment>
  );
};

ProfileEducation.propTypeE = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
