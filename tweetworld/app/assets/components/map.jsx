import React, {Component} from 'react';
import _ from 'lodash';

import TweetStore from "../stores/tweet_store";
import {EVENTS} from "../lib/constants";

class Map extends Component {
    constructor(props) {
        "use strict";
        super(props);

        this.state = {
            makers: [],
            map: {}
        };

        _.bindAll(this, '_onAdd');
    }
    componentWillMount() {
        "use strict";
        TweetStore.on(EVENTS.ADD, this._onAdd);
    }

    componentWillUnmount() {
        "use strict";
        TweetStore.removeListener(EVENTS.ADD, this._onAdd);
    }
    componentDidMount(){
        "use strict";
        let opts = _.extend({}, this.props.mapOptions);
        opts.center = opts.center || this.mapCenter;

        let map = new google.maps.Map(React.findDOMNode(this), opts);

        this.setState({
            map: map
        });
    }

    get mapCenter () {
        "use strict";
        return this.getLatLng({
            lat: this.props.mapOptions.mapCenterLat,
            lng: this.props.mapOptions.mapCenterLng
        });
    }

    getLatLng({lat, lng}) {
        "use strict";
        return new google.maps.LatLng(lat, lng);
    }

    _onAdd (tweet) {
        "use strict";
        let marker = new google.maps.Marker({
            position: this.getLatLng(tweet.place),
            map: this.state.map,
            title: tweet.text
        });
    }

    render () {
        "use strict";
        return <section style={styles}></section>
    }
}
Map.defaultProps = {
    mapOptions: {
        zoom: 2,
        mapCenterLat: 0,
        mapCenterLng: 0,
        scrollwheel: false,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        draggable: false
    }
};

var styles = {
    width: 1024,
    height: 600
};

export default Map;