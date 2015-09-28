import React, {Component} from 'react';
import _ from 'lodash';

import TweetList from './list/tweet_list.jsx';
import TweetStore from "../stores/tweet_store";
import Status from "../stores/status_store";
import {EVENTS} from "../lib/constants";


class App extends Component {
    constructor(props) {
        "use strict";
        super(props);
        this.state = {
            latestTweets: TweetStore.latest(10),
            connected: Status.isConnected
        };

        _.bindAll(this, '_onChange');
    }

    componentDidMount() {
        "use strict";
        TweetStore.on(EVENTS.CHANGE, this._onChange);
        Status.on(EVENTS.CHANGE, this._onChange);
    }

    componentWillUnmount() {
        "use strict";
        TweetStore.removeListener(EVENTS.CHANGE, this._onChange);
        Status.removeListener(EVENTS.CHANGE, this._onChange);
    }

    _onChange() {
        "use strict";
        this.setState({
            latestTweets: TweetStore.latest(10),
            connected: Status.isConnected
        });
    }

    render() {
        "use strict";
        let { latestTweets, connected } = this.state;

        return (
            <section>
                <h1> Application: { connected ? "connected" : "not connected" } to server </h1>
                <TweetList tweets={latestTweets}/>
            </section>
        );
    }

}

export default App;