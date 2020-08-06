import React, { useRef } from 'react';
import classNames from 'classnames';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.scss';
import useMap from '../../hooks/useMap';

const Map = ({ setDirections, directions }) => {
  const mapContainerRef = useRef(null);

  useMap(mapContainerRef, setDirections);

  const mapClass = classNames('map-container', {
    'full': !directions,
    'partial': directions
  });

	return <div className={mapClass} ref={mapContainerRef} />
}

export default Map;
