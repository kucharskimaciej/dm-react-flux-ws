import React, {Component} from 'react';
import _ from 'lodash';

import TweetStore from "../../stores/tweet_store";
import {EVENTS} from "../../lib/constants";

import Map from "./view.jsx";

class MapController extends Component {
    constructor(props) {
        "use strict";
        super(props);

        this.state = {
            makers: [],
            child: {}
        };

        _.bindAll(this, '_onAdd', '_expose');
    }

    componentWillMount() {
        "use strict";
        TweetStore.on(EVENTS.ADD, this._onAdd);
    }

    componentWillUnmount() {
        "use strict";
        TweetStore.removeListener(EVENTS.ADD, this._onAdd);
    }

    get mapCenter() {
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

    _onAdd(tweet) {
        "use strict";
        let marker = new google.maps.Marker({
            position: this.getLatLng(tweet.place),
            map: this.state.child.map,
            title: tweet.text
        });

        console.log(marker);
    }

    _expose(props) {
        "use strict";
        console.log("expose", props);
        this.setState({
            child: _.extend({}, this.state.child, props)
        });
    }

    render() {
        "use strict";
        let opts = _.extend({}, {
            center: this.mapCenter
        }, this.props.mapOptions);

        return (
            <section>
                <Map ref="map" exposeProps={this._expose} mapOptions={opts} />
            </section>);
    }
}
MapController.defaultProps = {
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

export default MapController;