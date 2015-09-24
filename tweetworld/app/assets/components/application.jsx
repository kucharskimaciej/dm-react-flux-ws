const React = require('react');

const TweetList = require('./list/tweet_list.jsx');
const TweetStore = require("../stores/tweet_store");
const AppConstants = require("../lib/constants");

const App = React.createClass({
    getInitialState: function() {
        "use strict";
        return {
            tweets: TweetStore.items
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
    _onChange: function (tweets) {
        "use strict";
        this.setState({
            tweets: tweets.slice(0, 10)
        });
    },
    render: function() {
        "use strict";
        console.log(this);
        let { tweets } = this.state;

        return (
            <section>
                <h1> Application </h1>
                <TweetList tweets={tweets} />
            </section>
        );
    }
});

module.exports = App;