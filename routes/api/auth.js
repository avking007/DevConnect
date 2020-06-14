const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// @route GET api/PROFILE
// @desc  TEST ROUTE
// @access PUBLIC
router.get('/', auth, (req, res) => {
  res.send('auth route');
});

module.exports = router;
