var express = require('express');
var Category = require('../models/category');

var router = express.Router();

router.route('/category')
  .post(function(req, res){
    var category = new Category();
    category.name = req.body.name;

    category.save(function(err){
      if(err) res.send(err);

      res.json({ message: 'category created' });
    });
  })
  .get(function(req, res){
    Category.find(function(err, categories){
      if(err) res.send(err);
      res.json(categories);
    });
  });

router.route('/category/:category_id')
  .get(function(req, res){
    Category.findById(req.params.category_id, function(err, category){
      if(err) res.send(err);
      res.json(category);
    });
  })
  .put(function(req, res){
    Category.findById(req.params.category_id, function(err, category){
      if(err) res.send(err);
      category.name = req.body.name || category.name;

      category.save(function(err){
        if(err) res.send(err);
        res.json({ message: 'categroy updated!' });
      });
    });
  })
  .delete(function(req, res){
    Category.remove({
      _id: req.params.category_id
    }, function(err, category){
      if(err) res.send(err);
      res.json({ message: 'successfuly deleted' });
    });
  });

module.exports = router;
