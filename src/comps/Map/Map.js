import React, { useRef } from 'react';
import classNames from 'classnames';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.scss';

import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import useMap from '../../hooks/useMap';

const Map = ({ setDirections, user, directions }) => {
  const mapContainerRef = useRef(null);

  useMap(mapContainerRef, setDirections);

  const mapClass = classNames('map-container', {
    'full': !directions,
    'partial': directions
  });

	return (
    <>
    <NavBar />
    <div className={mapClass} ref={mapContainerRef} />
    { directions && <SideBar user={user} directions={directions} /> }
    </>
  )
}

export default Map;
