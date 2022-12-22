import React, { useEffect } from 'react';
import { useMapEvents, Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';

const DEFAULT_POSITON = { lat: 25.2008491, lng: 55.264504 };

function LocationMarker({ position, onChange }) {
  const map = useMapEvents({
    click: (e) => (onChange ? onChange({ lat: e.latlng.lat, lng: e.latlng.lng }) : null),
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (position) map.flyTo(position);
  }, [map, position]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        lat: {position.lat} <br />
        lng: {position.lng}
      </Popup>
    </Marker>
  );
}

LocationMarker.propTypes = {
  position: PropTypes.object,
  onChange: PropTypes.func,
};

function Map(props) {
  return (
    <div style={{ height: '180px' }} id="react-leaflet-map">
      <MapContainer
        center={props.position || DEFAULT_POSITON}
        zoom={props.zoom || 13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onChange={props.onChange} position={props.position} />
      </MapContainer>
    </div>
  );
}

Map.propTypes = {
  position: PropTypes.object,
  onChange: PropTypes.func,
  zoom: PropTypes.number,
};

export default Map;
