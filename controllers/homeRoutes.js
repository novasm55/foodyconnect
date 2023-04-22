const router = require("express").Router();
const { User, Comment, Food } = require("../models");
const withAuth = require("../utils/auth");

// GET route for search
router.get("/search", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Please provide a search query" });
  }

  try {
    const searchResults = await User.findOne({
      where: {
        username: username,
      },

      include: [
        {
          model: Food,
        },
      ],
    });
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while searching users" });
  }
});

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
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Food,
        },
      ],
    });
    res.json(userData);
  } catch (err) {
    console.log(err);
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
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});
module.exports = router;
