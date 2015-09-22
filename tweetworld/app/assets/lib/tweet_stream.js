const io = require('socket.io-client');
const events = require('events');
const _ = require('lodash');
const socket = io("http://localhost:9002");
const AppConstants = require('./constants');
const TweetActions = require('../actions/tweet_actions');

var TweetStream = new class extends events.EventEmitter {
    addTweet (sourceTweet) {
        "use strict";
        let tweet = this.parse(sourceTweet);
        TweetActions.add(tweet);
    }
    parse (tweet) {
        "use strict";
        return _.pick(tweet, 'place', 'id', 'user', 'text');
    }
};

socket.on(AppConstants.SOCKET_EVENTS.NEW_TWEET, (tweet) => {
    "use strict";
    TweetStream.addTweet(tweet);
});