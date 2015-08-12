var config = require("./config.js");
var io = require("socket.io");
var TwitterStream = require('./modules/tweet_stream');

var stream = TwitterStream.new(config.twitter);
stream.start();
stream.on('tweet:new', function(tweet) {
   console.log(tweet);
});