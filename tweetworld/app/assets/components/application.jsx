const React = require('react');

const TweetList = require('./list/tweet_list.jsx');
const TweetStore = require("../stores/tweet_store");
const Status = require("../stores/status_store");
const AppConstants = require("../lib/constants");

const App = React.createClass({
    getInitialState: function() {
        "use strict";
        return {
            latestTweets: TweetStore.latest(10),
            connected: Status.isConnected
        };
    },
    componentDidMount: function () {
        "use strict";
        TweetStore.on(AppConstants.EVENTS.CHANGE, this._onChange);
        Status.on(AppConstants.EVENTS.CHANGE, this._onChange);
    },
    componentWillUnmount: function () {
        "use strict";
        TweetStore.removeListener(AppConstants.EVENTS.CHANGE, this._onChange);
        Status.removeListener(AppConstants.EVENTS.CHANGE, this._onChange);
    },
    _onChange: function () {
        "use strict";
        this.setState({
            latestTweets: TweetStore.latest(10),
            connected: Status.isConnected
        });
    },
    render: function() {
        "use strict";
        let { latestTweets, connected } = this.state;

        return (
            <section>
                <h1> Application: { connected ? "connected" : "not connected" } to server </h1>
                <TweetList tweets={latestTweets} />
            </section>
        );
    }
});

module.exports = App;