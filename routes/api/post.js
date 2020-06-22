const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const { route } = require('./profile');

// @route POST api/post
// @desc  add post ROUTE
// @access private

router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ error: err.array() });

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newpost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar,
      });
      const new_post = await newpost.save();
      res.json(new_post);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

// @route GET api/post
// @desc  get all post ROUTE
// @access private
router.get('/getall', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route GET api/post
// @desc  get single post ROUTE
// @access private
router.get('/:pid', auth, async (req, res) => {
  try {
    const pid = req.params.pid;
    const post = await Post.findById(pid);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server error');
  }
});

// @route DELETE api/post
// @desc  delete single post ROUTE
// @access private
router.delete('/:pid', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);
    if (!post) return res.status(400).json({ msg: 'No post found' });
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.send('post removed');
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: 'No post found' });
    res.status(500).send('Server Error');
  }
});
// @route PUT api/post/like/:likeid
// @desc  add like to post ROUTE
// @access private
router.put('/like/:lid', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.lid);
    //check already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(400).json({ msg: 'Post already liked' });

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/post/unlike/:likeid
// @desc  add unlike to post ROUTE
// @access private
router.put('/unlike/:lid', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.lid);
    //check already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    )
      return res.status(400).json({ msg: 'Post has not yet been liked' });

    const remove_idx = post.likes.map(
      (like) => like.user.toString === req.user.id
    );
    post.likes.splice(remove_idx, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
