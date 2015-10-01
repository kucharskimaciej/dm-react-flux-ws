import React, {Component, PropTypes} from 'react';


class Map extends Component {
    constructor(props) {
        "use strict";
        super(props);
    }

    componentDidMount() {
        "use strict";
        let map = new google.maps.Map(this.refs.map.getDOMNode(), this.props.mapOptions);
        this.props.exposeProps({map});
    }

    render() {
        "use strict";
        return (
            <div className="map">
                <div className="map__root" ref="map"></div>
            </div>);
    }
}

Map.propTypes = {
    mapOptions: PropTypes.shape({
        zoom: PropTypes.number.isRequired,
        center: PropTypes.instanceOf(google.maps.LatLng).isRequired
    }).isRequired,
    exposeProps: PropTypes.func.isRequired
};

export default Map;