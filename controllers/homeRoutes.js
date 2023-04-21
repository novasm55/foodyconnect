const router = require("express").Router();
const { User, Comment, Food } = require("../models");
const withAuth = require("../utils/auth");

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

    res.render("homepage", {
      foods,
      logged_in: req.session.logged_in,
    });
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
    res.render("user", user);
    // res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Food }],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});
module.exports = router;
