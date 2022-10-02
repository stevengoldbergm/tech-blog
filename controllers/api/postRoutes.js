const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const helpers = require('../../utils/helpers');

// Create Post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Single Post with associated User and Comments, AND associated comment's user.
router.get('/:id', withAuth, async (req, res) => {
  try {
    console.log("\n\nstarting\n\n")
    const postData = await Post.findOne({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: { exclude: ['password'] },
          }
        }
      ],
      where: {
        id: req.params.id,
      },   
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Post
router.put('/:id',  async (req, res) => {
  // Update should look like:
  // {
  //   "title": "Updated Title",
  //   "text": "Updated Text"
  // }
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        // user_id: req.session.user_id, // tested without it
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
