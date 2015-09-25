const React = require('react');
const Tweet = require('./tweet.jsx');

const TweetList = React.createClass({
    get propTypes () {
        return {
            tweets: React.PropTypes.object.isRequired
        };
    },
    render: function () {
        "use strict";
        return (
            <div>{ this.renderItems() }</div>
        );
    },
    renderItems: function () {
        "use strict";
        let { tweets } = this.props;

        return tweets.map((tweet) => {
           return <Tweet key={ tweet.id } text={ tweet.text } user={ tweet.user } />;
        });
    }
});

module.exports = TweetList;