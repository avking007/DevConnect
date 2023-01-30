const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwtKey = process.env.JWT_KEY

// @route GET api/PROFILE
// @desc  TEST ROUTE
// @access PUBLIC
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/auth
// @desc  authenticate user and get token
// @access PUBLIC
router.post(
  '/',
  [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      //see if user exist
      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid credentials' }] });
      }
      const payld = {
        user: {
          id: user.id,
        },
      };
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid credentials' }] });
      }
      //return jwt
      jwt.sign(
        payld,
        jwtKey,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
