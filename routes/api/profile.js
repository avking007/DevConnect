const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { response } = require('express');

// @route GET api/profile/me
// @desc  get user profile
// @access private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(500).json({ msg: 'No profile found' });
    }
  } catch (err) {
    console.error(err.msg);
    res.status(500).send('server error');
  }
  res.send('Profile route');
});

// @route Post api/profile/me
// @desc  Create/update user profile
// @access private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Required status').not().isEmpty(),
      check('skills', 'skills required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(500).json({ error: err.array() });
    }
    const {
      company,
      website,
      bio,
      location,
      githubusername,
      instagram,
      google,
      linkedIn,
      skills,
    } = req.body;

    //build profile obj
    const profilefields = {};
    profilefields.user = req.user.id;
    if (company) profilefields.company = company;
    if (website) profilefields.website = website;
    if (location) profilefields.location = location;
    if (bio) profilefields.bio = bio;
    if (githubusername) profilefields.githubusername = githubusername;
    if (skills) profilefields.skills = skills.split(',').map((el) => el.trim());

    profilefields.social = {};
    if (google) profilefields.social.google = google;
    if (instagram) profilefields.social.instagram = instagram;
    if (linkedIn) profilefields.social.linkedIn = linkedIn;

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true }
        );
        return res.json(profile);
      }

      //else create profile
      profile = new Profile(profilefields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

// @route GET api/profile
// @desc  get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/profile/user:id
// @desc  get profile by uid
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'no profile' });
    }
    res.json(profile);
  } catch (error) {
    if (error.kind == 'ObjectId')
      return res.status(400).json({ msg: 'no profile' });

    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route DELETE api/profile
// @desc delete profile,user and post
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/profile/experience
// @desc add experience to user profile
// @access Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ error: err.array() });

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newexp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newexp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route DELETE api/profile/experience
// @desc delete experience
// @access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    //get profile
    const profile = await Profile.findOne({ user: req.user.id });
    const removeidx = profile.experience
      .map((el) => el.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeidx, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/profile/education
// @desc add education to user profile
// @access Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('fieldofstudy', 'Company is required').not().isEmpty(),
      check('degree', 'From date is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ error: err.array() });

    const {
      school,
      fieldofstudy,
      degree,
      from,
      to,
      current,
      description,
    } = req.body;

    const newedc = {
      school,
      fieldofstudy,
      degree,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newedc);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route DELETE api/profile/education
// @desc delete education
// @access Private

router.delete('/education/:edc_id', auth, async (req, res) => {
  try {
    //get profile
    const profile = await Profile.findOne({ user: req.user.id });
    const removeidx = profile.education
      .map((el) => el.id)
      .indexOf(req.params.edc_id);
    profile.education.splice(removeidx, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route Get api/profile/github/:username
// @desc get user gthub repos
// @access Public

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:ascending&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode != 200)
        return res.status(404).json({ msg: 'No github profile found' });

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
