const router = require("express").Router();
const { Comments } = require('../../models');

router.get('/home', (req, res) => {
  Comments.findAll({})
    .then(commentsData => res.json(commentsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router