import io from 'socket.io-client';
import {EventEmitter} from 'events';
import _ from 'lodash';

import {SOCKET_EVENTS} from './constants';
import TweetActions from '../actions/tweet_actions';
import StatusActions from '../actions/status_actions';

const socket = io("http://localhost:9002");
const TweetStream = new class extends EventEmitter {
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

socket.on(SOCKET_EVENTS.NEW_TWEET, (tweet) => {
    "use strict";
    TweetStream.addTweet(tweet);
});

socket.on(SOCKET_EVENTS.CONNECTED, StatusActions.connected);
socket.on(SOCKET_EVENTS.DISCONNECTED, StatusActions.disconnected);

export default TweetStream;