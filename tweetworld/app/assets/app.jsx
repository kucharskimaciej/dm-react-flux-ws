const React = require('react');
require('./lib/tweet_stream');
const AppConstants = require('./lib/constants');
const TweetStore = require('./stores/tweet_store');

TweetStore.on(AppConstants.EVENTS.ADD, (data) => {
    "use strict";
    console.log(data);
});

const ApplicationComponent = require('./components/application.jsx');

React.render(
    <ApplicationComponent />,
    document.body
);