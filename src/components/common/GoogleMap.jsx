import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// API Key
import config from '../../common/config';

const GOOGLE_MAPS_API_KEY = config.credentials.googleMaps;

const GoogleMap = ({
  google, geo, zoom,
}) => (
  <Map
    // style={{ width: '100%' }}
    google={google}
    zoom={zoom}
    initialCenter={geo}
  >
    <Marker
      position={geo}
    />
  </Map>
);

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(GoogleMap);
