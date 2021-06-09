const router = require("express").Router();
const { User, Post, Comments } = require('../../models');

//dasboard
router.get('/home/dashboard', (req, res) => {
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
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with id provided' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('singlepost', {
        post,
        loggedIn: req.session.loggedIn
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

//post based on id
router.get('/home/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
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
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with id provided' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('singlepost', {
        post,
        loggedIn: req.session.loggedIn
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create post
router.get('/home/post/create/', (req, res) => {
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
        attributes: ['id', 'user_id', 'post_id', 'comment_text'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with that id' });
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render('postedit', {
      post,
      loggedIn: true
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//edit post
router.get('/home/post/edit/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
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
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with that id' });
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render('postedit', {
      post,
      loggedIn: true
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//register
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
        username: req.body.username,
      }
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = dbUserData.username;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


//logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;