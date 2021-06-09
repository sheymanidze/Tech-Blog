const router = require("express").Router();
const { Post, Comments, User } = require('../../models');

router.get('/home', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content'
    ],
    include: [
      {
        model: Comments,
        attributes: ['id', 'user_id', 'post_id', 'comments_text'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attribute: ['username']
      }
    ]
  }).then(postData => res.json(postData))

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router