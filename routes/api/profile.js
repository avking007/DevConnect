const express = require('express');
const router = express.Router();

// @route GET api/PROFILE
// @desc  TEST ROUTE
// @access PUBLIC
router.get('/', (req, res) => {
  res.send('Profile route');
});

module.exports = router;
