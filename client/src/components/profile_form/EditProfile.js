import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { create_profile, get_curr_profile } from '../../actions/profile';

const EditProfile = ({
  create_profile,
  history,
  get_curr_profile,
  profile: { profile, loading },
}) => {
  const [formData, setformData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    linkedIn: '',
    google: '',
    instagram: '',
  });

  const [displaysocial, toggledisplay] = useState(false);
  useEffect(() => {
    get_curr_profile();

    setformData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      linkedIn:
        loading || !profile.social.linkedIn ? '' : profile.social.linkedIn,
      google: loading || !profile.social.google ? '' : profile.social.google,
      instagram:
        loading || !profile.social.instagram ? '' : profile.social.instagram,
    });
  }, [loading]);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    linkedIn,
    google,
    instagram,
  } = formData;
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    create_profile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            value={company}
            name='company'
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            value={website}
            name='website'
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            onChange={(e) => onChange(e)}
            value={skills}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            onChange={(e) => onChange(e)}
            value={githubusername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            onChange={(e) => onChange(e)}
            value={bio}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => toggledisplay(!displaysocial)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaysocial && (
          <Fragment>
            <div class='form-group social-input'>
              <i class='fab fa-google fa-2x'></i>
              <input
                type='text'
                placeholder='Google URL'
                name='google'
                value={google}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div class='form-group social-input'>
              <i class='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='linkedIn URL'
                name='linkedIn'
                value={linkedIn}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div class='form-group social-input'>
              <i class='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' class='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  create_profile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  get_curr_profile: PropTypes.func.isRequired,
};

const mapper = (state) => ({
  profile: state.profile,
});

export default connect(mapper, { create_profile, get_curr_profile })(
  withRouter(EditProfile)
);
