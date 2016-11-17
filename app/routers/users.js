var express = require('express');

var User = require('../models/users');

var router = express.Router();

router.route('/')
  .post(function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;

    user.save(function(err){
      if (err) res.send(err);
      res.json({message: 'user created!'});
    });
  })
  .get(function(req, res){
    User.find(function(err, users){
      if (err) res.send(err);
      res.json(users);
    });
  });

router.route('/:user_id')
  .get(function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if(err) res.send(err);
      res.json(user);
    });
  })
  .put(function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if(err) res.send(err);
      user.name = req.body.name || user.name;
      user.password = req.body.password || user.password;

      user.save(function(err){
        if(err) res.send(err);
        res.json({ message: 'user updated!' });
      });
    });
  })
  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user){
      if (err) res.send(err);
      res.json({ message: 'Successfuly deleted' });
    });
  });

module.exports = router;
