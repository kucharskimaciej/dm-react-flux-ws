const io = require('socket.io-client');
const events = require('events');
const _ = require('lodash');
const socket = io("http://localhost:9002");
const AppConstants = require('./constants');
const TweetActions = require('../actions/tweet_actions');
const StatusActions = require('../actions/status_actions');

var TweetStream = new class extends events.EventEmitter {
    addTweet (sourceTweet) {
        "use strict";
        let tweet = this.parse(sourceTweet);
        TweetActions.add(tweet);
    }
    parse (tweet) {
        "use strict";
        let centerCoords = tweet.place.bounding_box.coordinates[0].reduce(($, co) => {
            $.lng += co[0]/4;
            $.lat += co[1]/4;

            return $;
        }, { lng: 0, lat: 0 });

        let t = _.pick(tweet, 'id', 'user', 'text');
        t.place = centerCoords;

        return t;
    }
};

socket.on(AppConstants.SOCKET_EVENTS.NEW_TWEET, (tweet) => {
    "use strict";
    TweetStream.addTweet(tweet);
});

socket.on(AppConstants.SOCKET_EVENTS.CONNECTED, StatusActions.connected);
socket.on(AppConstants.SOCKET_EVENTS.DISCONNECTED, StatusActions.disconnected);