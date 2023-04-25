const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData)
  } catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const singTag = await Tag.findbyPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!singTag){
      res.status(404).json({message: 'No tag with this id'});
      return
    }
    res.status(200).json(singTag);
  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try {
    const singTag = await Tag.create(req.body);
    res.status(200).json(singTag);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const singTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!singTag) {
      res.status(404).json ({message: 'No tag with this id'});
      return
    }
    res.status(200).json(singTag)
  } catch (err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const singTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!singTag) {
      res.status(404).json ({message: 'No tag with this id'});
      return
    }
    res.status(200).json(singTag)
  } catch (err){
    res.status(500).json(err)
  }
});

module.exports = router;
