import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { del_edc } from '../../actions/profile';

const Education = ({ education, del_edc }) => {
  const educations = education.map((edc) => (
    <tr key={edc._id}>
      <td>{edc.school}</td>
      <td className='hide-sm'>{edc.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edc.from}</Moment>-
        {edc.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{edc.to}</Moment>
        )}
      </td>
      <td>
        <button onClick={() => del_edc(edc._id)} className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School/Bootcamp</th>
            <th className='hide-sm'>Degree</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  del_edc: PropTypes.func.isRequired,
};

export default connect(null, { del_edc })(Education);
