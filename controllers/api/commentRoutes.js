const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const helpers = require('../../utils/helpers');

// Post a new comment
router.post('/', withAuth, async (req, res) => {
  console.log('\n\n',req.body,'\n\n');
  try {
    const newComment = await Comment.create({
      user_id: req.session.user_id,
      ...req.body,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete an existing comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
