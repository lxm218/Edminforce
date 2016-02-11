const MapboxLocation = React.createClass({
    showLocationOnMap() {
        if (!this.map) return;

        var showMarker = true;
        var newLatLng;
        try {
            // LatLng
            newLatLng = L.latLng(parseFloat(this.props.lat), parseFloat(this.props.lng));
        }
        catch (err) {
            newLatLng = L.latLng(40.713061, -73.999792);
            showMarker = false;
        }

        if (!this.latLng ||
            this.latLng.lat != newLatLng.lat || this.latLng.lng != newLatLng.lng) {

            this.latLng = newLatLng;

            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
                this.locationMarker = null;
            }

            this.map.setView(this.latLng, showMarker ? 14 : 12);
            if (showMarker) {
                this.locationMarker = L.mapbox.featureLayer({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [this.latLng.lng, this.latLng.lat]
                    },
                    properties: {
                        title: this.props.name,
                        description: this.props.address,
                        'marker-size': 'large',
                        'marker-color': '#BE9A6B',
                        'marker-symbol': 'shop'
                    }
                });
                this.locationMarker.addTo(this.map);
            }
        }
    },

    componentDidMount() {
        var mapId = "mapbox.streets";
        var options = _.omit(this.props, 'mapId', 'onMapCreated');
        options.zoomControl = false;
        L.mapbox.accessToken = 'pk.eyJ1IjoiaWFtbGlqaW4iLCJhIjoiY2lqZ2x2emhoMDJyZHR5bHR1YjZiOTZ3aiJ9.btJ8giWI6IMIrURWZut2PQ';
        this.map = L.mapbox.map('map', mapId, options);

        this.showLocationOnMap();
    },

    componentDidUpdate() {
        this.showLocationOnMap();
    },

    render() {
        return (
            <div id="map" style={{width:'800',height:'600',margin:'0 auto'}}>
            </div>
        )
    }
})

AppTabMap = React.createClass({
    render() {
        return (
            <RC.Div>
                <MapboxLocation name="Victoria" address="Victoria,BC,Canada" lat="48.430366" lng="-123.365283"/>
            </RC.Div>
        )
    }
})


