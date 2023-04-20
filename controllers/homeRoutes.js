const router = require("express").Router();
const { User, Comment, Food } = require("../models");

router.get("/", async (req, res) => {
  try {
    const foodData = await Food.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "username"],
        },
        {
          model: Comment,
          attributes: ["comment", "user_id"],
        },
      ],
    });

    const foods = foodData.map((f) => f.get({ plain: true }));

    res.json(foods);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const projectData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Food,
        },
      ],
    });

    const user = projectData.get({ plain: true });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });
module.exports = router;
