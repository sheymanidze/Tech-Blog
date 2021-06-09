const router = require('express').Router();
const { Comments, Post, User } = require('../models');

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;

  }
  res.render("homepage", {
  });
});

//gets 6 random posts
router.get("/home", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
    const dbPostData = await Post.findAll({ order: Sequelize.literal('rand()'), limit: 6 }).then((encounters) => {
      const postRandomCards = []
      for (let i = 0; i < encounters.length; i++) {
        let thisPost = encounters[i].get({ plain: true })
        postRandomCards.push(thisPost)
      }
      console.log('thisPost', postRandomCards)
      res.render('post', {
        postArr: postRandomCards,
        user_id: req.session.username,
      });
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/home', (req, res) => {
//   Post.findAll({
//     attributes: [
//       'id',
//       'title',
//       'content'
//     ],
//     include: [
//       {
//         model: Comments,
//         attributes: ['id', 'user_id', 'post_id', 'comments_text'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attribute: ['username']
//       }
//     ]
//   }).then(postData => {
//     const postAll = postData.map(post => post.get({ plain: true }));
//     res.render('post', {
//       postAll,
//       loggedIn: req.session.loggedIn
//     });

//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

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