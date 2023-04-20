const router = require('express').Router();
const { Food } = require('../../models');
const withAuth = require('../../utils/auth')

router.post('/',withAuth, async (req, res) => {
  try {
    const newFood = await Food.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newFood);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id',withAuth, async (req, res) => {
  try {
    const newFood = await Food.destroy({
      where: {
        id: req.params.id,
        //user_id: req.session.user_id,
      },
    });

    if (!newFood) {
      res.status(404).json({ message: 'No food posts!' });
      return;
    }

    res.status(200).json(newFood);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
