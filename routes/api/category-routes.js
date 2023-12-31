const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll();
    res.status(200).json({message: 'Categories retrieved successfully', data: categoriesData});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      
      include: [{ model: Product }]
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'No categories found with this id!' });
      return;
    }

    res.status(200).json({message: 'Categories Id retrieved successfully', data: categoriesData});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/',async (req, res) => {
  // create a new category
      try {
      const categoriesData = await Category.create(req.body);
      res.status(200).json({message: 'Categories created successfully', data: categoriesData});
    } catch (err) {
      res.status(400).json(err);
    }
  });


router.put('/:id',async (req, res) => {
  try {
        const categoriesToUpdate = await Category.findByPk(req.params.id);
        if(!categoriesToUpdate) {
        res.status(404).json({message: 'no categories found with this id!'});
        return;
  }
// Check if req.body is empty or null
if (!req.body || Object.keys(req.body).length === 0) {
  res.status(400).json({ message: 'Request body is empty or null' });
  return;
}

// Update the category only if req.body is not null
await categoriesToUpdate.update(req.body);

// Set the products if they are provided in req.body
if (req.body.products) {
  await categoriesToUpdate.setProducts(req.body.products);
}

  res.status(200).json({message: 'category updated successfully'});
} catch (err) {
  res.status(500).json(err);
}
  // update a category by its `id` value
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'No categories found with this id!' });
      return;
    }

    res.status(200).json({message: 'Category deleted successfully', data: categoriesData});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
