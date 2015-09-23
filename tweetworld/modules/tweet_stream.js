var request = require("request");
var Promise = require('q');
var OAuth = require('oauth');
var events = require('events');

var TwitterStream = function(config) {
    var self = new events.EventEmitter();

    function twitterAuth() {
        var oauth = new OAuth.OAuth(
            'https://api.twitter.com/oauth/request_token',
            'https://api.twitter.com/oauth/access_token',
            config.consumer_key,
            config.application_secret,
            '1.0A',
            null,
            'HMAC-SHA1'
        );

        var deferred = Promise.defer();
        deferred.resolve(oauth);

        return deferred.promise;
    }

    function getSampleStream(twitter) {
        return twitter.get("https://stream.twitter.com/1.1/statuses/sample.json?with=coordinates", config.token, config.token_secret);
    }

    var handleChunk = (function() {
        var buffer = "";

        return function(stream, chunk) {
            var current = chunk.split('\r\n');

            if (current.length > 1) {
                try {
                    self.emit('tweet:new', JSON.parse(buffer + current[0]));
                } catch (e) {
                    // something is wrong with the JSON; skip this tweet.
                }

                buffer = current[1] || "";
            } else {
                buffer += chunk;
            }
        };
    }());

    var handleEnd = function(stream) {
        console.log('--- END ---');
        self.start(); // restart stream after it ended
    };

    self.start = function() {
        twitterAuth().then(getSampleStream).then(function(streamHandler) {
            streamHandler.addListener('response', function(stream) {
                stream.setEncoding('utf8');
                stream.on('data', handleChunk.bind(null, stream));
                stream.on('end', handleEnd.bind(null, stream));
            });
            streamHandler.end(); // start streamig data
        });

        return self;
    };

    return self;
};

module.exports = {
    new: TwitterStream
};