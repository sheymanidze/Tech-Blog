const router = require("express").Router();
const { Post, Comments, User } = require('../../models');


// gets all posts and all its database columns
// for api/post/
router.get('/', async (req, res) => {
  // If there is no session user id, redirects to the login page and blocks access
  if (!req.session.user_id) {
    res.redirect("/")
  }

  // gathers all posts data and returns as JSON
  try {
    const dbPostData = await Post.findAll();
    res.status(200).json(dbPostData);
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

    res.status(200).json(dbBirdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new post
router.post('/', async (req, res) => {
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
router.put('/', async (req, res) => {
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

module.exports = router