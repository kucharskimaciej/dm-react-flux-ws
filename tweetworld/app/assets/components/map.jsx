import React, {Component} from 'react';
import _ from 'lodash';

import TweetStore from "../stores/tweet_store";
import {EVENTS} from "../lib/constants";

class Map extends Component {
    constructor(props) {
        "use strict";
        super(props);

        this.state = {
            makers: []
        };
    }

    componentDidMount(){
        "use strict";
        let opts = _.extend({}, this.props.mapOptions);
        opts.center = opts.center || this.mapCenter;

        this.map = new google.maps.Map(React.findDOMNode(this), opts);
    }

    get mapCenter () {
        "use strict";
        return new google.maps.LatLng(this.props.mapOptions.mapCenterLat, this.props.mapOptions.mapCenterLng);
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