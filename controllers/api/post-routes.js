const router = require("express").Router();
const { Post, Comments, User } = require('../../models');


// gets all posts and all its database columns
router.get('/all', async (req, res) => {
  // If there is no session user id, redirects to the login page and blocks access
  if (!req.session.user_id) {
    res.redirect("/")
  }

  try {
    const dbPostData = await Post.findAll({});
    const postPlain = dbPostData.map((post) => post.get({ plain: true }))

    res.render('post', {
      postsArr: postPlain,
    })
  } catch (err) {
    console.log(err);
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
//   }).then(postData => res.json(postData))

//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


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

router.get('/:id', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }

  try {
    // Finds a post by 
    const dbPostData = await Post.findByPk(req.params.id);

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    //res.status(200).json(dbBirdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new post
router.post('/newpost', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {

    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post
router.put('/edit', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {

    const postData = await Post.update({
      title: req.body.title,
      content: req.body.content,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});


//delete post
router.delete('/delete/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// //post based on id
// router.get('/home/post/:id', (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'title',
//       'content'
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       },
//       {
//         model: Comments,
//         attributes: ['id', 'user_id', 'post_id', 'comments_text'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       }
//     ]
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with id provided' });
//         return;
//       }
//       const post = dbPostData.get({ plain: true });
//       res.render('singlepost', {
//         post,
//         loggedIn: req.session.loggedIn
//       });
//     }).catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// //create post
// router.get('/home/post/create/', (req, res) => {
//   Post.findAll({
//     where: {
//       user_id: req.session.user_id
//     },
//     attributes: [
//       'id',
//       'title',
//       'content'
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       },
//       {
//         model: Comments,
//         attributes: ['id', 'user_id', 'post_id', 'comment_text'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       }
//     ]
//   }).then(dbPostData => {
//     if (!dbPostData) {
//       res.status(404).json({ message: 'No post found with that id' });
//       return;
//     }
//     const post = dbPostData.get({ plain: true });
//     res.render('postedit', {
//       post,
//       loggedIn: true
//     });
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

// //edit post
// router.get('/home/post/edit/:id', (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'title',
//       'content'
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       },
//       {
//         model: Comments,
//         attributes: ['id', 'user_id', 'post_id', 'comments_text'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       }
//     ]
//   }).then(dbPostData => {
//     if (!dbPostData) {
//       res.status(404).json({ message: 'No post found with that id' });
//       return;
//     }
//     const post = dbPostData.get({ plain: true });
//     res.render('postedit', {
//       post,
//       loggedIn: true
//     });
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

module.exports = router