const React = require('react');
const AppConstants = require('./lib/constants');
const TweetStore = require('./stores/tweet_store');

const ApplicationComponent = require('./components/application.jsx');

React.render(
    <ApplicationComponent />,
    document.body
);

require('./lib/tweet_stream');
