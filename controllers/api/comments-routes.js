const router = require("express").Router();
const { Comments } = require('../../models');

router.get('/', (req, res) => {
  Comments.findAll({
    user_id: req.session.user_id,
    attributes: [
      'id',
      'user_id',
      'post_id',
      'comments_text'
    ],

    include: [
      {
        model: User,
        attributes: ['username']
      },

    ],
  })
    .then(commentsData => res.json(commentsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Creates a new comment
router.post('/', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {

    const commentsData = await Comments.create({
      post_id: req.body.post_id,
      comments_text: req.body.comments,
      user_id: req.session.user_id
    });
    res.status(200).json(commentsData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});



module.exports = router