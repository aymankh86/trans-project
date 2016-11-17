var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var userRouter = require('./app/routers/users');
var videoRouter = require('./app/routers/videos');

router = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/trans');

var User = require('./app/models/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;



router.get('/', function(req, res){
  res.json({ message: "Welcome to my api!" });
});

app.use('/api', router);
app.use('/api/users', userRouter);
app.use('/api/videos', videoRouter);

app.listen(port);
console.log("Magic happens on port " + port);
