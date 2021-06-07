const router = require('express').Router();

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;

  }
  res.render("main", {
  });
});

module.exports = router;