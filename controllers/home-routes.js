const router = require('express').Router();
//const { Commenst, Post, User } = require('../models');

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;

  }
  res.render("homepage", {
  });
});

module.exports = router;