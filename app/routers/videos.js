var express = require('express');
var Category = require('../models/category');
var Video = require('../models/video');
var Youtube = require('youtube-node');

var router = express.Router();

router.route('/test-video/:video_id')
  .get(function(req, res) {
    
  });

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

router.route('/video')
  .post(function(req, res){
    var video = new Video();
    video_id = req.body.id;
    video.video_id = video_id;
    var youtube = new Youtube();
    youtube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');
    youtube.getById(video_id, function(err, results){
      if (err) res.send(err);

      video.title = results.items[0].snippet.localized.title;
      video.image = results.items[0].snippet.thumbnails.default.url;
      video.provider = 'youtube';
      video.length = results.items[0].contentDetails.duration;
      video.save(function(err){
        if (err) res.send(err);
        res.json({ message: 'video added' });
      });
    });
  })
  .get(function(req, res){
    Video.find(function(err, videos){
      if(err) res.send(err);
      res.json(videos);
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

router.route('/video/:video_id')
  .delete(function(req, res){
    Video.remove({
      _id: req.params.video_id
    }, function(err, video){
      if (err) res.send(err);
      res.json({ message: 'successfuly deleted'})
    })
  })

module.exports = router;
