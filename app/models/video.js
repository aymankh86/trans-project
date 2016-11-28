var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  active: {type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now },
  title: String,
  video_id: String,
  provider: String,
  length: String,
  image: String,
  translations: {
    language: String,
    active: Boolean,
    translations: {
      createdAt: Date,
      time: String,
      text: String
    }
  }
});

module.exports = mongoose.model('Video', VideoSchema);
