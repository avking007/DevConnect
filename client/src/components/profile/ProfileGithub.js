import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_github_repo } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { useEffect } from 'react';

const ProfileGithub = ({ username, get_github_repo, repos }) => {
  useEffect(() => {
    get_github_repo(username);
  }, [get_github_repo]);
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((rep) => (
          <div key={rep._id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href={rep.html_url} target='_blank' rel='noopener noreferer'>
                  {rep.name}
                </a>
              </h4>
              <p>{rep.description}</p>
              <h4>
                <a
                  href={rep.homepage}
                  target='_blank'
                  rel='noopener noreferer'
                ></a>
              </h4>
            </div>
            <div>
              <ul>
                <li class='badge badge-primary'>
                  Stars: {rep.stargazers_count}
                </li>
                <li class='badge badge-dark'>Watchers: {rep.watchers_count}</li>
                <li class='badge badge-light'>Forks: {rep.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  get_github_repo: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};
const mapper = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapper, { get_github_repo })(ProfileGithub);
