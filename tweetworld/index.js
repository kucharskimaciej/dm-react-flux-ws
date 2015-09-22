"use strict";
var config = require("./config.js");
var Server = require("socket.io");
var TwitterStream = require('./modules/tweet_stream');

var stream = TwitterStream.new(config.twitter);
stream.start();

const io = new Server(config.server.port);
const  users = new Set();
io.on('connection', function(socket) {
   if(users.size === 0) {
      stream.on('tweet:new', function(tweet) {
         if(tweet.id && tweet.place) {
            socket.broadcast.emit("tweet:new", tweet);
            socket.emit("tweet:new", tweet);
         }
      });
   }
   users.add(socket.id);

   socket.on('disconnect', function() {

      users.delete(socket.id);
      if (users.size === 0) {
         stream.removeAllListeners("tweet:new");
      }
   });
});

