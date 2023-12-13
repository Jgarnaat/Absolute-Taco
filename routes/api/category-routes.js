const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll(
    {
      attributes:['id','category_name'],
      include: [
        {
          model:Product,
          attributes:['id','product_name','price']
        }
      ]
    }
  )
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
 
  // find all categories
  // be sure to include its associated Products

router.get('/:id', (req, res) => {
  Category.findOne(
    {
      where:{
        id:req.params.id
      },
      attributes:['id','category_name'],
      include: [
        {
          model:Product,
          attributes: ['id','product_name','price']
        }
      ]
    }
  )
  .then(categoryData => {
    if(!categoryData){
      res.status(404).json({ message: 'A Category with that ID was not found'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
    // create a new category
    Category.create({
      category_name: req.body.category_name,
    })
    .then(categoryData => res.json(categoryData))
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
    category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(categoryData => {
    if(!categoryData){
      res.status(404).json({message:'A category with that ID was found'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(categoryData => {
    if(!categoryData){
      res.status(404).json({message:'A category with that ID was found'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });
  // delete a category by its `id` value
});

module.exports = router;
