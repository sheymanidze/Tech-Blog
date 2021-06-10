const router = require('express').Router();
const { Comments, Post, User } = require('../models');
const Sequelize = require('sequelize');


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
    const dbPostData = await Post.findAll({
      include: {
        model: User,
        attributes: ['username']
      }, order: Sequelize.literal('rand()'), limit: 3
    }).then((encounters) => {
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
    console.log(err)
    res.status(500).json(err);
  }
});


router.get("/home", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    console.log(userData)
    const userArr = userData.map((user) => user.get({ plain: true }));
    console.log(userArr)
    res.render('home', {
      user: userArr,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
  }
});


//view all posts
router.get('/all', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
    const dbPostData = await Post.findAll({
      include: {
        model: User,
        attributes: ['username']
      },
    });
    const postPlain = dbPostData.map((post) => post.get({ plain: true }))


    res.render('post', {
      postArr: postPlain,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

//new post
router.get('/newpost', (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  res.render('createpost');
});

//dasboard
router.get('/dashboard', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'content'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comments,
        attributes: ['id', 'user_id', 'post_id', 'comments_text'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      const post = dbPostData.map(post => post.get({ plain: true }));
      console.log(post)
      res.render('dashboard', {
        post,
        loggedIn: req.session.loggedIn
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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

router.get('/edit', (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  res.render('postedit');
});

//view one post
router.get("/singlepost/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
    const postData = await Post.findByPk(req.params.id);
    const singlePostData = postData.get({ plain: true });
    res.render('singlepost', {
      ...singlePostData,
    });
  } catch (err) {
    console.log(err)
  }
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
    res.redirect('/home');
    return;
  }
  res.render('login')
})

module.exports = router;