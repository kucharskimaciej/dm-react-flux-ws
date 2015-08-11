var config = require("./config.js");
var io = require("socket.io");
var request = require("request");
var Promise = require('q');
var OAuth = require('oauth');
var events = require('events');

var tweets = new events.EventEmitter();

tweets.on('tweet:new', function(data) {
    console.log(data);
});

twitterAuth(config.twitter)
    .then(function(twitter) {
        return twitter.get("https://stream.twitter.com/1.1/statuses/sample.json?with=coordinates", config.twitter.token, config.twitter.token_secret);
    })
    .then(function(twitterStream) {

    twitterStream.addListener('response', function (response) {
        response.setEncoding('utf8');

        var tweet = "";
        response.addListener('data', function (chunk) {

            var current = chunk.split('\r\n');

            if(current.length > 1) {
                tweets.emit('tweet:new', JSON.parse(tweet + current[0]));
                tweet = current[1] || "";
            } else {
                tweet += chunk;
            }
        });
        response.addListener('end', function () {
            console.log('--- END ---');
        });
    });
    twitterStream.end();
});

function twitterAuth(cfg) {
    var oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        cfg.consumer_key,
        cfg.application_secret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

    var deferred = Promise.defer();
    deferred.resolve(oauth);

    return deferred.promise;
}