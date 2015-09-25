const React = require('react');

const TweetList = require('./list/tweet_list.jsx');
const TweetStore = require("../stores/tweet_store");
const AppConstants = require("../lib/constants");

const App = React.createClass({
    getInitialState: function() {
        "use strict";
        return {
            latestTweets: TweetStore.latest(10)
        };
    },
    componentDidMount: function () {
        "use strict";
        TweetStore.on(AppConstants.EVENTS.CHANGE, this._onChange);
    },
    componentWillUnmount: function () {
        "use strict";
        TweetStore.removeListener(AppConstants.EVENTS.CHANGE, this._onChange);
    },
    _onChange: function () {
        "use strict";
        this.setState({
            latestTweets: TweetStore.latest(10)
        });
    },
    render: function() {
        "use strict";
        let { latestTweets } = this.state;

        return (
            <section>
                <h1> Application </h1>
                <TweetList tweets={latestTweets} />
            </section>
        );
    }
});

module.exports = App;