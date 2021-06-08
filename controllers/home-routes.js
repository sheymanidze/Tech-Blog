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

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }
  res.render("signup", {
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/api/users/login');
    return;
  }
  res.render('login')
})

module.exports = router;