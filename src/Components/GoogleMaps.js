import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import uuid from 'uuid'

const mapStyles = {
    width: '39vw',
    height: '95vh',
};

function GoogleMaps(props) {
    return (
        <div>
            <Map
                google={props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 37.3589431, lng: -121.9362006 }}
            >
                {props.propertyData.map(({ location }) => (
                    < Marker
                        key={uuid.v4()}
                        position={{
                            lat: location.y,
                            lng: location.x
                        }} />
                ))}
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCUVO7gg7Ebh1Gc48SL2zoZ7pGB_PXs91E"
})(GoogleMaps);
