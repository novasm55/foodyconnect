const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const foodRoutes = require("./foodRoutes.js");

router.use("/users", userRoutes);
router.use("/food", foodRoutes);

module.exports = router;
