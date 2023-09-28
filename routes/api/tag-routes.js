const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {model: Product},
          ]
    });
    res.status(200).json({ message: 'Tags retrieved successfully', data: tagData });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,

      }
    });
    res.status(200).json({ message: 'Tag retrieved successfully', data: tagData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const TagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json({ message: 'Tag created successfully', data: TagData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const rowsUpdated = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  
    if (rowsUpdated[0] === 0) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
  
    // Assuming rowsUpdated[0] is the number of updated rows
    // Fetch the updated record separately
    const updatedTag = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    });
  
    res.status(200).json({ message: 'Tag updated successfully', data: updatedTag });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const rowsDeleted = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!rowsDeleted) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted successfully', data: rowsDeleted });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
